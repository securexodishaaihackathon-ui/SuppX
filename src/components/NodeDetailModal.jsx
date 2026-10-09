import React from 'react';
import { playClick, playSuccess } from '../services/soundEffects';
import { 
  X, Compass, Anchor, Factory, Warehouse, Cpu, 
  ShieldCheck, AlertTriangle, Activity, Send 
} from 'lucide-react';

export default function NodeDetailModal({ node, onClose, onInjectNodeAction }) {
  if (!node) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        padding: '22px 24px',
        position: 'relative',
        border: '1px solid var(--border-active)',
        boxShadow: '0 0 40px rgba(0, 242, 254, 0.25)'
      }}>
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="btn-icon"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-cyan font-mono" style={{ fontSize: '10px' }}>
            NODE ID: {node.id.toUpperCase()}
          </span>
          <span className={`badge ${node.health === 'nominal' ? 'badge-emerald' : 'badge-crimson'}`} style={{ fontSize: '10px' }}>
            STATUS: {node.health.toUpperCase()}
          </span>
        </div>

        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
          {node.name}
        </h2>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          {node.location} • <span style={{ color: 'var(--cyan-primary)' }}>{node.category}</span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
          {node.description}
        </p>

        {/* Telemetry Metric Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '18px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Coordinates (GPS)</div>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>
              {node.lat.toFixed(2)}°N, {node.lon.toFixed(2)}°E
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Capacity Utilization</div>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: node.capacity > 90 ? '#f59e0b' : '#34d399' }}>
              {node.capacity}%
            </div>
          </div>

          {node.inventory && (
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Inventory Buffer</div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cyan-primary)' }}>
                {node.inventory.toLocaleString()} units
              </div>
            </div>
          )}

          {node.congestionDwellDays && (
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Terminal Dwell Time</div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: node.congestionDwellDays > 2.5 ? '#ef4444' : '#10b981' }}>
                {node.congestionDwellDays} days
              </div>
            </div>
          )}

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Assigned Managing Holon</div>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: '#a855f7' }}>
              {node.managingAgent}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Spatial Risk Score</div>
            <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: node.riskScore > 0.3 ? '#ef4444' : '#34d399' }}>
              {(node.riskScore * 100).toFixed(0)} / 100
            </div>
          </div>
        </div>

        {/* Autonomous Intervention Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              playClick();
              onInjectNodeAction(node, 'expand_buffer');
              onClose();
            }}
          >
            Force Buffer +25%
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              playSuccess();
              onInjectNodeAction(node, 'reroute');
              onClose();
            }}
          >
            Trigger Autonomic Reroute
          </button>
        </div>
      </div>
    </div>
  );
}
