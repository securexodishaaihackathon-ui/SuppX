import React, { useRef, useEffect, useState } from 'react';
import { NODES, ROUTES } from '../services/supplyChainData';
import { interpolateRoute } from '../services/simulationEngine';
import { playClick } from '../services/soundEffects';
import { Anchor, Cpu, Factory, Warehouse, AlertTriangle, Ship, Compass } from 'lucide-react';

export default function GlobalDigitalTwinMap({
  scenario,
  vessels,
  onSelectNode,
  selectedNode
}) {
  const canvasRef = useRef(null);
  const [hoveredEntity, setHoveredEntity] = useState(null);
  const [filterLayer, setFilterLayer] = useState('all'); // 'all', 'suppliers', 'ports', 'plants', 'vessels'

  // Map geographic coords (lat: -90..90, lon: -180..180) to canvas (x, y)
  const project = (lat, lon, width, height) => {
    // Equirectangular projection with margin padding
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    return { x, y };
  };

  const unproject = (x, y, width, height) => {
    const lon = (x / width) * 360 - 180;
    const lat = 90 - (y / height) * 180;
    return { lat, lon };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background
      ctx.fillStyle = '#060910';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw oceanic subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;

      // Latitudinal lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const { y } = project(lat, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Longitudinal lines
      for (let lon = -150; lon <= 180; lon += 30) {
        const { x } = project(0, lon, width, height);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 3. Draw Stylized World Continent Outlines
      drawContinents(ctx, width, height);

      // 4. Draw Maritime and Intermodal Shipping Corridors
      ROUTES.forEach(route => {
        const isCapeContingency = route.id === 'r-cape-contingency';
        const isSuezRoute = route.id === 'r-suez-eur';
        const isSuezBlocked = scenario.effects.activeReroute;

        if (isCapeContingency && !isSuezBlocked) {
          // Inactive standby lane
          return;
        }

        ctx.beginPath();
        route.waypoints.forEach(([lat, lon], idx) => {
          const pt = project(lat, lon, width, height);
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });

        if (isSuezRoute && isSuezBlocked) {
          // Blocked route - red dashed
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (isCapeContingency && isSuezBlocked) {
          // Active Evolved Bypass Route - glowing cyan/gold
          ctx.strokeStyle = '#00f2fe';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // Standard lane
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // 5. Draw Disruption Hotspot Indicators
      if (scenario.effects.activeReroute) {
        // Suez / Bab-el-Mandeb Blockade Warning Zone
        const suezPt = project(12.58, 43.33, width, height);
        ctx.save();
        ctx.beginPath();
        ctx.arc(suezPt.x, suezPt.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.restore();

        // Label
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.fillText('⚠ BAB-EL-MANDEB CHOKEPOINT [RISK 0.96]', suezPt.x - 90, suezPt.y - 28);
      }

      if (scenario.id === 'scenario-taiwan-strait') {
        const tsmcPt = project(24.78, 120.99, width, height);
        ctx.save();
        ctx.beginPath();
        ctx.arc(tsmcPt.x, tsmcPt.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.fillText('⚠ TAIWAN STRAIT EMBARGO ZONE', tsmcPt.x - 70, tsmcPt.y - 24);
      }

      // 6. Draw Supply Chain Nodes
      NODES.forEach(node => {
        if (filterLayer === 'suppliers' && !node.type.startsWith('supplier')) return;
        if (filterLayer === 'ports' && node.type !== 'port' && node.type !== 'chokepoint') return;
        if (filterLayer === 'plants' && node.type !== 'plant' && node.type !== 'rdc') return;

        const { x, y } = project(node.lat, node.lon, width, height);
        const isSelected = selectedNode && selectedNode.id === node.id;
        const isHovered = hoveredEntity && hoveredEntity.id === node.id;

        // Determine node color based on type and scenario
        let color = '#38bdf8'; // cyan default
        if (node.type === 'supplier-tier2') color = '#a855f7'; // purple
        if (node.type === 'supplier-tier1') color = '#3b82f6'; // blue
        if (node.type === 'port' || node.type === 'chokepoint') color = '#06b6d4'; // teal
        if (node.type === 'plant') color = '#10b981'; // green
        if (node.type === 'rdc') color = '#f59e0b'; // amber

        // Scenario alterations
        if (node.id === 'p-suez' && scenario.effects.activeReroute) color = '#ef4444';
        if (node.id === 's-tsmc' && scenario.id === 'scenario-taiwan-strait') color = '#f59e0b';

        // Outer glow
        ctx.save();
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.fillStyle = color + '44';
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Inner marker
        ctx.beginPath();
        if (node.type.startsWith('supplier')) {
          // Diamond for suppliers
          ctx.moveTo(x, y - 6);
          ctx.lineTo(x + 6, y);
          ctx.lineTo(x, y + 6);
          ctx.lineTo(x - 6, y);
          ctx.closePath();
        } else if (node.type === 'plant') {
          // Square for factories
          ctx.rect(x - 5, y - 5, 10, 10);
        } else {
          // Circle for ports and RDCs
          ctx.arc(x, y, 5, 0, Math.PI * 2);
        }
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();

        // Node Label
        ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.75)';
        ctx.font = isSelected ? 'bold 11px Inter' : '10px Inter';
        ctx.fillText(node.name, x + 8, y + 3);
      });

      // 7. Draw Live In-Transit Vessels
      if (filterLayer === 'all' || filterLayer === 'vessels') {
        vessels.forEach(vessel => {
          // Calculate interpolated position
          let activeRouteId = vessel.routeId;
          if (vessel.id === 'v-everapex' && scenario.effects.activeReroute) {
            activeRouteId = 'r-cape-contingency';
          }

          const targetRoute = ROUTES.find(r => r.id === activeRouteId);
          const pos = targetRoute ? interpolateRoute(targetRoute.waypoints, vessel.progress) : vessel.currentPos;
          const { x, y } = project(pos[0], pos[1], width, height);

          ctx.save();
          // Vessel beacon
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00f2fe';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pulse ring
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Vessel Label
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 10px JetBrains Mono';
          ctx.fillText(`🚢 ${vessel.name.split(' ')[0]}`, x + 9, y - 2);

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scenario, vessels, selectedNode, hoveredEntity, filterLayer]);

  // Handle canvas clicks to inspect nodes
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Find closest node within 14px
    let hit = null;
    NODES.forEach(node => {
      const { x, y } = project(node.lat, node.lon, canvas.width, canvas.height);
      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist <= 14) hit = node;
    });

    if (hit) {
      playClick();
      onSelectNode(hit);
    }
  };

  // Handle mouse move for hover inspection
  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    let hit = null;
    NODES.forEach(node => {
      const { x, y } = project(node.lat, node.lon, canvas.width, canvas.height);
      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist <= 14) hit = node;
    });

    setHoveredEntity(hit);
  };

  return (
    <div className="glass-panel" style={{
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-card)'
    }}>
      {/* Top Map HUD Bar: Title, Layer Filters, Status */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '14px',
        right: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        {/* Title */}
        <div style={{
          background: 'rgba(6, 9, 16, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Compass size={16} color="var(--cyan-primary)" />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
            GLOBAL DIGITAL TWIN CORRIDOR MAP
          </span>
          <span className="badge badge-emerald font-mono" style={{ fontSize: '9px' }}>
            TELEMETRY: AIS STREAMING
          </span>
        </div>

        {/* Filter Layers */}
        <div style={{
          background: 'rgba(6, 9, 16, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          pointerEvents: 'auto',
          display: 'flex',
          gap: '4px'
        }}>
          {[
            { id: 'all', label: 'All Layers' },
            { id: 'suppliers', label: 'Tier-1/2 Suppliers' },
            { id: 'ports', label: 'Ports & Straits' },
            { id: 'plants', label: 'Factories & RDCs' },
            { id: 'vessels', label: 'Live Vessels' }
          ].map(layer => (
            <button
              key={layer.id}
              onClick={() => {
                playClick();
                setFilterLayer(layer.id);
              }}
              style={{
                background: filterLayer === layer.id ? 'rgba(0, 242, 254, 0.18)' : 'transparent',
                color: filterLayer === layer.id ? 'var(--cyan-primary)' : 'var(--text-muted)',
                border: filterLayer === layer.id ? '1px solid var(--border-active)' : '1px solid transparent',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        width={1400}
        height={700}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => setHoveredEntity(null)}
        style={{
          width: '100%',
          height: '560px',
          display: 'block',
          cursor: hoveredEntity ? 'pointer' : 'crosshair'
        }}
      />

      {/* Floating Hover Card HUD */}
      {hoveredEntity && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(10, 14, 23, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-active)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          width: '320px',
          zIndex: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          pointerEvents: 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                {hoveredEntity.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {hoveredEntity.location} • {hoveredEntity.category}
              </div>
            </div>
            <span className={`badge ${hoveredEntity.health === 'nominal' ? 'badge-emerald' : 'badge-crimson'}`} style={{ fontSize: '9px' }}>
              {hoveredEntity.health}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '10px 0 6px' }}>
            {hoveredEntity.inventory && (
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Inventory Buffer</div>
                <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cyan-primary)' }}>
                  {hoveredEntity.inventory.toLocaleString()} units
                </div>
              </div>
            )}
            {hoveredEntity.congestionDwellDays && (
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Port Dwell Time</div>
                <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#f59e0b' }}>
                  {hoveredEntity.congestionDwellDays} days
                </div>
              </div>
            )}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Managing Agent</div>
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: '#a855f7' }}>
                {hoveredEntity.managingAgent}
              </div>
            </div>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--cyan-primary)', textAlign: 'right', marginTop: '4px' }}>
            Click node to open Full Telemetry Inspector →
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '14px',
        background: 'rgba(6, 9, 16, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '8px 12px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '14px',
        fontSize: '11px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#a855f7' }}></span>
          <span>Tier-2 Supplier</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#3b82f6' }}></span>
          <span>Tier-1 Supplier</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }}></span>
          <span>Port / Chokepoint</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', background: '#10b981' }}></span>
          <span>Assembly Plant</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span>
          <span>Regional RDC</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ width: '10px', height: '2px', background: '#00f2fe' }}></span>
          <span>Active Vessel / Lane</span>
        </div>
      </div>
    </div>
  );
}

// Procedural Stylized Continent Geometry
function drawContinents(ctx, width, height) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;

  const projectLocal = (lat, lon) => ({
    x: ((lon + 180) / 360) * width,
    y: ((90 - lat) / 180) * height
  });

  // North America
  drawPolygon(ctx, [
    [70, -165], [72, -130], [60, -95], [62, -75], [45, -60],
    [30, -80], [25, -80], [15, -90], [8, -77], [18, -105],
    [32, -117], [48, -125], [60, -145], [65, -168]
  ], projectLocal);

  // South America
  drawPolygon(ctx, [
    [10, -75], [5, -50], [-10, -35], [-25, -45], [-55, -68],
    [-52, -75], [-20, -70], [-5, -80], [8, -78]
  ], projectLocal);

  // Europe & Asia (Eurasia)
  drawPolygon(ctx, [
    [70, 25], [75, 100], [70, 170], [60, 160], [40, 130],
    [30, 122], [22, 115], [10, 105], [5, 100], [22, 70],
    [25, 55], [12, 44], [30, 32], [38, 25], [36, -5],
    [48, -5], [58, 5], [62, 10], [65, 25]
  ], projectLocal);

  // Africa
  drawPolygon(ctx, [
    [35, -5], [32, 32], [12, 44], [-5, 40], [-15, 40],
    [-35, 20], [-34, 18], [-10, 12], [5, 2], [15, -17],
    [28, -12], [36, -5]
  ], projectLocal);

  // Australia
  drawPolygon(ctx, [
    [-12, 132], [-15, 145], [-28, 153], [-38, 145], [-35, 115],
    [-22, 114], [-15, 125]
  ], projectLocal);

  ctx.restore();
}

function drawPolygon(ctx, points, projectFn) {
  ctx.beginPath();
  points.forEach(([lat, lon], idx) => {
    const pt = projectFn(lat, lon);
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
