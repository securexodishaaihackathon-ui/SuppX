import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_MAP_ELITES } from '../services/evolutionEngine';
import { playClick, playMutation, playSuccess } from '../services/soundEffects';
import { 
  Dna, Sparkles, Code2, ShieldCheck, CheckCircle2, 
  Flame, Activity, BarChart3, AlertOctagon, RefreshCw 
} from 'lucide-react';

export default function SelfEvolutionView({ 
  generation, 
  onTriggerMutation, 
  isMutating 
}) {
  const [selectedPolicy, setSelectedPolicy] = useState(INITIAL_MAP_ELITES[2]); // Default to Champion
  const [mutationPhase, setMutationPhase] = useState(null); // 'synthesis' | 'simulating' | 'verifying' | 'deployed'

  // 5x5 MAP-Elites Grid matrix setup
  const gridSize = 5;
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

  // Populate grid with existing elites
  INITIAL_MAP_ELITES.forEach(p => {
    if (p.x < gridSize && p.y < gridSize) {
      grid[p.y][p.x] = p;
    }
  });

  const handleStartMutation = () => {
    if (isMutating) return;
    playMutation();
    setMutationPhase('synthesis');

    setTimeout(() => {
      setMutationPhase('simulating');
    }, 1200);

    setTimeout(() => {
      setMutationPhase('verifying');
    }, 2600);

    setTimeout(() => {
      setMutationPhase('deployed');
      playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#8b5cf6', '#10b981']
      });
      onTriggerMutation();
      setTimeout(() => setMutationPhase(null), 3000);
    }, 4000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
      
      {/* Left Column: MAP-Elites 2D Behavioral Heatmap */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                MAP-Elites Behavioral Archive (Gen {generation})
              </h3>
              <span className="badge badge-purple font-mono" style={{ fontSize: '10px' }}>
                QD ALGORITHM
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Quality-Diversity repertoire mapping policies across Working Capital Lean vs Disruption Shock Immunity
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleStartMutation}
            disabled={mutationPhase !== null}
            style={{ padding: '7px 14px' }}
          >
            <Sparkles size={14} className={mutationPhase ? 'pulse-circle' : ''} />
            <span>{mutationPhase ? 'Evolving...' : 'Synthesize Mutation'}</span>
          </button>
        </div>

        {/* Live Mutation Stepper HUD if Active */}
        {mutationPhase && (
          <div className="glass-panel-glow" style={{
            background: 'rgba(139, 92, 246, 0.1)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px',
            border: '1px solid var(--purple-evo)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="font-mono" style={{ fontSize: '12px', color: '#fff', fontWeight: 700 }}>
                🔬 Autonomous Evolutionary Pipeline Active
              </span>
              <span className="badge badge-cyan font-mono" style={{ fontSize: '10px' }}>
                {mutationPhase.toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'synthesis', label: '1. Heuristic Code Mutation' },
                { id: 'simulating', label: '2. 5,000 Monte Carlo Counterfactuals' },
                { id: 'verifying', label: '3. Gate 1 & 2 Invariant Checks' },
                { id: 'deployed', label: '4. Canary Hot-Swap Deploy' }
              ].map(step => {
                const isCurrent = mutationPhase === step.id;
                const isPassed = ['synthesis', 'simulating', 'verifying', 'deployed'].indexOf(mutationPhase) >= 
                                 ['synthesis', 'simulating', 'verifying', 'deployed'].indexOf(step.id);
                return (
                  <div key={step.id} style={{
                    flex: 1,
                    background: isCurrent ? 'rgba(0, 242, 254, 0.2)' : isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: isCurrent ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '6px',
                    fontSize: '10px',
                    color: isCurrent ? 'var(--cyan-primary)' : isPassed ? '#34d399' : 'var(--text-muted)',
                    textAlign: 'center',
                    fontWeight: 600
                  }}>
                    {step.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Y-Axis Label: Shock Resilience */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            ▲ Y-Axis: Shock Resilience & Lead-Time Variance Immunity (High = Robust)
          </span>
        </div>

        {/* 5x5 Interactive Grid */}
        <div style={{
          display: 'grid',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          {[4, 3, 2, 1, 0].map(y => (
            <div key={y} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {[0, 1, 2, 3, 4].map(x => {
                const policy = grid[y][x];
                const isSelected = selectedPolicy && selectedPolicy.x === x && selectedPolicy.y === y;

                return (
                  <div
                    key={`${x}-${y}`}
                    onClick={() => {
                      if (policy) {
                        playClick();
                        setSelectedPolicy(policy);
                      }
                    }}
                    style={{
                      aspectRatio: '1.4',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: policy ? 'pointer' : 'default',
                      border: isSelected ? '2px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                      background: policy 
                        ? isSelected 
                          ? 'rgba(0, 242, 254, 0.22)'
                          : policy.status === 'production-champion'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : policy.status === 'canary-active'
                              ? 'rgba(0, 242, 254, 0.12)'
                              : 'rgba(139, 92, 246, 0.12)'
                        : 'rgba(255, 255, 255, 0.015)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {policy ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="font-mono" style={{ fontSize: '10px', color: '#fff', fontWeight: 700 }}>
                            G{policy.generation}
                          </span>
                          <span className="badge font-mono" style={{
                            fontSize: '8px',
                            padding: '1px 4px',
                            background: policy.status === 'production-champion' ? '#10b981' : '#38bdf8',
                            color: '#000'
                          }}>
                            {policy.fitness.toFixed(0)}
                          </span>
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {policy.name.split(' ')[0]}
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.1)', textAlign: 'center', marginTop: '12px' }}>
                        Unexplored Cell ({x},{y})
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* X-Axis Label */}
        <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
          ► X-Axis: Working Capital Efficiency (0 = Buffer-Heavy ➔ 4 = Ultra Lean JIT)
        </div>
      </div>

      {/* Right Column: Elite Policy Inspector & Executable Heuristic Code */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
        {selectedPolicy ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-cyan font-mono" style={{ fontSize: '9px', marginBottom: '4px' }}>
                  GEN {selectedPolicy.generation} • {selectedPolicy.status.toUpperCase()}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                  {selectedPolicy.name}
                </h3>
              </div>
              <div className="font-mono" style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fitness Score</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--cyan-primary)' }}>
                  {selectedPolicy.fitness.toFixed(1)} / 100
                </div>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
              {selectedPolicy.description}
            </p>

            {/* Policy Multi-Objective Scores */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>OTIF Fulfillment Rate</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#34d399' }}>
                  {selectedPolicy.otif.toFixed(1)}%
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Working Capital Exposure</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8' }}>
                  ${selectedPolicy.capitalExposureM.toFixed(1)}M
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Bullwhip Amplification (η)</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24' }}>
                  {selectedPolicy.bullwhipEta.toFixed(2)}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>CVaR Tail Risk</div>
                <div className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#f87171' }}>
                  {selectedPolicy.cvarTailRisk.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Synthesized Executable Heuristic Code */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Code2 size={14} color="var(--cyan-primary)" />
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Synthesized Python Heuristic (Sandboxed gVisor Runtime):
              </span>
            </div>

            <pre className="font-mono" style={{
              flex: 1,
              background: '#04060a',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              fontSize: '11px',
              color: '#38bdf8',
              lineHeight: 1.5,
              overflowX: 'auto',
              maxHeight: '230px'
            }}>
              {selectedPolicy.code}
            </pre>

            <div style={{
              marginTop: '12px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Verified against 28 deterministic hard invariants before canary promotion.</span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text-muted)' }}>
            Select an elite policy cell on the archive grid to inspect heuristic code.
          </div>
        )}
      </div>
    </div>
  );
}
