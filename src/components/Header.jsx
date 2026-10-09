import React from 'react';
import { 
  Play, Pause, FastForward, RotateCcw, Volume2, VolumeX, 
  Sparkles, ShieldCheck, Activity, Globe, Bot, Dna, GitGraph, FileText 
} from 'lucide-react';
import { SCENARIOS } from '../services/supplyChainData';
import { playClick, toggleSound, isSoundEnabled } from '../services/soundEffects';

export default function Header({
  activeTab,
  setActiveTab,
  selectedScenario,
  onSelectScenario,
  simSpeed,
  setSimSpeed,
  isPaused,
  setIsPaused,
  onTriggerMutation,
  isMutating,
  generation,
  virtualDate
}) {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const navItems = [
    { id: 'map', label: 'Digital Twin Map', icon: Globe },
    { id: 'agents', label: 'Multi-Agent Network', icon: Bot },
    { id: 'evolution', label: 'Self-Evolution & MAP-Elites', icon: Dna },
    { id: 'causal', label: 'Causal World Model', icon: GitGraph },
    { id: 'safety', label: 'Safety & ERP Ledger', icon: ShieldCheck }
  ];

  return (
    <header className="glass-panel" style={{
      margin: '16px 24px 0',
      padding: '12px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      borderBottom: '1px solid var(--border-card)'
    }}>
      {/* Top Bar: Brand, Simulation Controls, Scenario Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Live Generation Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0, 242, 254, 0.4)'
          }}>
            <Activity size={22} color="#06080d" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                NEXUS-SC
              </span>
              <span className="badge badge-cyan font-mono" style={{ fontSize: '10px' }}>
                AUTONOMIC AGENT MESH
              </span>
              <span className="badge badge-purple font-mono" style={{ fontSize: '10px' }}>
                GEN {generation} ACTIVE
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Self-Evolving Multi-Agent Orchestration • Virtual Epoch: <span className="font-mono" style={{ color: 'var(--text-primary)' }}>{virtualDate}</span>
            </div>
          </div>
        </div>

        {/* Center: Disruption Shock Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.03)', padding: '4px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Shock Lab:
          </span>
          <select 
            value={selectedScenario.id}
            onChange={(e) => {
              playClick();
              const found = SCENARIOS.find(s => s.id === e.target.value);
              if (found) onSelectScenario(found);
            }}
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              border: 'none',
              outline: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)'
            }}
          >
            {SCENARIOS.map((sc) => (
              <option key={sc.id} value={sc.id} style={{ background: '#0a0e17', color: '#fff' }}>
                {sc.name} ({sc.badge})
              </option>
            ))}
          </select>
        </div>

        {/* Right: Simulation Controls & Evolutionary Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Play / Pause */}
          <button 
            className="btn btn-secondary"
            onClick={() => {
              playClick();
              setIsPaused(!isPaused);
            }}
            title={isPaused ? "Resume Simulation" : "Pause Simulation"}
            style={{ padding: '6px 10px' }}
          >
            {isPaused ? <Play size={14} color="#10b981" /> : <Pause size={14} color="#f59e0b" />}
            <span style={{ fontSize: '12px' }}>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Speed Buttons */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', padding: '2px', border: '1px solid var(--border-subtle)' }}>
            {[1, 5, 20].map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  playClick();
                  setSimSpeed(speed);
                }}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: simSpeed === speed ? 'var(--cyan-primary)' : 'transparent',
                  color: simSpeed === speed ? '#050b14' : 'var(--text-muted)',
                  transition: 'all 0.15s ease'
                }}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Trigger Mutation Button */}
          <button
            className="btn btn-primary"
            onClick={() => {
              onTriggerMutation();
            }}
            disabled={isMutating}
            style={{ padding: '6px 12px' }}
          >
            <Sparkles size={14} className={isMutating ? 'pulse-circle' : ''} />
            <span>{isMutating ? 'Synthesizing Heuristic...' : 'Mutate & Evolve Policy'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            className="btn-icon"
            onClick={handleSoundToggle}
            title={soundOn ? 'Mute Audio HUD' : 'Enable Audio HUD'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                setActiveTab(item.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                color: isActive ? 'var(--cyan-primary)' : 'var(--text-secondary)',
                borderBottom: isActive ? '2px solid var(--cyan-primary)' : '2px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--cyan-primary)' : 'var(--text-muted)'} />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
