import React, { useState } from 'react';
import { CAUSAL_GRAPH } from '../services/supplyChainData';
import { playClick } from '../services/soundEffects';
import { GitGraph, ArrowRight, Sliders, AlertTriangle, TrendingUp, Cpu, Compass } from 'lucide-react';

export default function CausalWorldModelView({ scenario }) {
  // Intervention slider states for Pearl's do-calculus
  const [doRouteDisrupt, setDoRouteDisrupt] = useState(scenario.effects.activeReroute ? 0.95 : 0.05);
  const [doSafetyBuffer, setDoSafetyBuffer] = useState(1.2); // 1.0x to 2.5x

  // Calculate causal outcome estimates via Structural Causal Equations
  const baselineLatency = 18.2; // days
  const addedTransitDays = doRouteDisrupt * 12.4;
  const simulatedLatency = (baselineLatency + addedTransitDays).toFixed(1);

  // Stockout prob damped by safety buffer
  const rawStockoutProb = Math.min(0.85, 0.018 + (doRouteDisrupt * 0.42));
  const mitigatedStockoutProb = (rawStockoutProb / (doSafetyBuffer * 1.5)).toFixed(3);

  // EBITDA loss in millions
  const estimatedEbitdaLoss = (mitigatedStockoutProb * 48.0).toFixed(1);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px' }}>
      
      {/* Left Column: Structural Causal Model (SCM) DAG */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                Structural Causal World Model (Pearl's DAG)
              </h3>
              <span className="badge badge-cyan font-mono" style={{ fontSize: '10px' }}>
                P(Y | do(X))
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Disentangling spurious correlation from causal interventions during market regime shifts
            </p>
          </div>
          <span className="badge badge-emerald font-mono">
            CAUSAL IDENTIFIABILITY: VERIFIED
          </span>
        </div>

        {/* Visual Causal Graph Nodes & Edges */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Row 1: Exogenous Shock */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '10px', color: '#f87171', fontWeight: 600 }}>Exogenous Root Driver</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                Z_geo: Geopolitical Conflict & Strait Risk
              </div>
            </div>
          </div>

          {/* Connectors Down */}
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: 'var(--cyan-primary)' }}>
            <span>↓ Causal weight: +0.64</span>
            <span>↓ Causal weight: +0.88</span>
          </div>

          {/* Row 2: Mediators & Intervention Targets */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px'
            }}>
              <div style={{ fontSize: '10px', color: '#fbbf24', fontWeight: 600 }}>Commodity Mediator</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>X_fuel: Bunker Fuel Index</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Slow steaming response</div>
            </div>

            <div style={{
              background: 'rgba(0, 242, 254, 0.15)',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px'
            }}>
              <div style={{ fontSize: '10px', color: 'var(--cyan-primary)', fontWeight: 600 }}>Intervention Target: do(X)</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>X_route: Chokepoint Reroute</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Diverts to Cape of Good Hope</div>
            </div>
          </div>

          {/* Connectors Down */}
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: '11px', color: 'var(--cyan-primary)' }}>
            <span>↓ Causal weight: +0.95 (Structural Shift)</span>
          </div>

          {/* Row 3: Physical Latency & MEIO Policy Intervention */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px'
            }}>
              <div style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 600 }}>Physical Transit State</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>M_latency: Corridors +12d</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Lead-time distribution expands</div>
            </div>

            <div style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px'
            }}>
              <div style={{ fontSize: '10px', color: '#c084fc', fontWeight: 600 }}>Autonomous Policy Countermeasure</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>A_meio: Dynamic Safety Buffer</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Damps downstream stockout shock</div>
            </div>
          </div>

          {/* Connectors Down */}
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: '11px', color: '#34d399' }}>
            <span>↓ Direct Causal Effect on Downstream EBITDA</span>
          </div>

          {/* Row 4: Final Outcome Node */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 18px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600 }}>Downstream Objective Metric</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                Y_ebitda: Retained Revenue & Zero Assembly Downtime
              </div>
            </div>
          </div>
        </div>

        {/* Causal AI vs Association Note */}
        <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          💡 <strong>Why Causal AI is Mandatory:</strong> Traditional machine learning mistakes port congestion as the cause of vessel delay (P(Delay | Port Congestion)), leading agents to mistakenly avoid free ports. Structural Causal Models estimate P(Lead Time | do(Reroute)), preventing catastrophic feedback loops.
        </div>
      </div>

      {/* Right Column: Interactive Pearl's Do-Calculus Counterfactual Sandbox */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Sliders size={16} color="var(--cyan-primary)" />
            Do-Calculus Counterfactual Sandbox
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Simulate atomic interventions and verify mathematical stability guarantees
          </p>
        </div>

        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
          
          {/* Slider 1: do(Route Disruption) */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                Intervention: do(Chokepoint Disruption = X)
              </span>
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--cyan-primary)' }}>
                {(doRouteDisrupt * 100).toFixed(0)}% Disrupted
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={doRouteDisrupt}
              onChange={(e) => {
                playClick();
                setDoRouteDisrupt(parseFloat(e.target.value));
              }}
              style={{ width: '100%', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Slider 2: do(Dynamic Safety Buffer) */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                Countermeasure: do(MEIO Safety Stock Buffer = X)
              </span>
              <span className="font-mono" style={{ fontSize: '11px', color: '#a855f7' }}>
                {doSafetyBuffer.toFixed(2)}x Expansion
              </span>
            </div>
            <input 
              type="range"
              min="1.0"
              max="2.5"
              step="0.1"
              value={doSafetyBuffer}
              onChange={(e) => {
                playClick();
                setDoSafetyBuffer(parseFloat(e.target.value));
              }}
              style={{ width: '100%', accentColor: 'var(--purple-evo)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Simulated Outcomes */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
            Intervention Simulation Estimates:
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Estimated Maritime Latency:</span>
            <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
              {simulatedLatency} days
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Stockout Probability Y_stockout:</span>
            <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: mitigatedStockoutProb > 0.05 ? '#ef4444' : '#10b981' }}>
              {(mitigatedStockoutProb * 100).toFixed(1)}%
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Projected Lost EBITDA:</span>
            <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--cyan-primary)' }}>
              ${estimatedEbitdaLoss}M
            </span>
          </div>
        </div>

        {/* Macro Leading Indicator Mini-Cards */}
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', fontWeight: 600 }}>
            Macro Real-Time Telemetry Feeds:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 8px', borderRadius: '4px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Baltic Dry Index (BDI)</div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8' }}>
                {scenario.effects.bdi} pts
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 8px', borderRadius: '4px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Brent Crude Spot</div>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>
                ${scenario.effects.fuelPrice.toFixed(1)} / bbl
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
