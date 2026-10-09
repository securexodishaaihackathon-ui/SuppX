import React, { useState } from 'react';
import { AGENTS_STATE } from '../services/evolutionEngine';
import { playClick } from '../services/soundEffects';
import { 
  Bot, Radio, ShieldAlert, TrendingUp, Layers, Sliders, Scale, 
  Navigation, CheckCircle2, Cpu, Sparkles, Send, Filter, CheckCheck
} from 'lucide-react';

const ICON_MAP = {
  Radio, ShieldAlert, TrendingUp, Layers, Sliders, Scale, 
  Navigation, CheckCircle2, Cpu, Sparkles
};

export default function AgentNetworkView({ agentMessages, onSelectAgent }) {
  const [selectedTier, setSelectedTier] = useState('all');
  const [activeAgentId, setActiveAgentId] = useState(null);

  const tiers = [
    { id: 'all', label: 'All 10 Agents' },
    { id: 'Tier 3 (Strategic)', label: 'Tier 3: Strategic' },
    { id: 'Tier 2 (Tactical)', label: 'Tier 2: Tactical' },
    { id: 'Tier 1 (Operational)', label: 'Tier 1: Operational' },
    { id: 'Tier 0 (Meta-Evolution)', label: 'Tier 0: Meta-Evolution' }
  ];

  const filteredAgents = AGENTS_STATE.filter(a => {
    if (selectedTier === 'all') return true;
    return a.tier.startsWith(selectedTier.split(':')[0]);
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
      
      {/* Left Column: Hierarchical Agent Topology */}
      <div className="glass-panel" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
              Hierarchical Holonic Multi-Agent Swarm (H-HMAS)
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Decentralized autonomous holons coordinating via Contract Net Protocol & VCG Clearinghouse
            </p>
          </div>
          <span className="badge badge-emerald font-mono">
            10/10 SWARM HEALTHY
          </span>
        </div>

        {/* Tier Filters */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {tiers.map(t => (
            <button
              key={t.id}
              onClick={() => {
                playClick();
                setSelectedTier(t.id);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                border: selectedTier === t.id ? '1px solid var(--border-active)' : '1px solid var(--border-subtle)',
                background: selectedTier === t.id ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedTier === t.id ? 'var(--cyan-primary)' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {filteredAgents.map(agent => {
            const IconComponent = ICON_MAP[agent.icon] || Bot;
            const isSelected = activeAgentId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => {
                  playClick();
                  setActiveAgentId(isSelected ? null : agent.id);
                }}
                className={`glass-panel ${isSelected ? 'glass-panel-glow' : ''}`}
                style={{
                  padding: '12px 14px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--cyan-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'rgba(14, 20, 32, 0.65)'
                }}
              >
                {/* Agent Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      padding: '6px',
                      borderRadius: '6px',
                      background: 'rgba(0, 242, 254, 0.1)',
                      border: '1px solid rgba(0, 242, 254, 0.2)'
                    }}>
                      <IconComponent size={14} color="var(--cyan-primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                        {agent.name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {agent.tier}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-emerald font-mono" style={{ fontSize: '9px' }}>
                    {agent.health}%
                  </span>
                </div>

                {/* Role Description */}
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {agent.role}
                </div>

                {/* Action status */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  borderLeft: '2px solid var(--cyan-primary)',
                  marginBottom: '8px'
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Last Action: </span>
                  {agent.lastAction}
                </div>

                {/* Bottom stats: Confidence & Active Tasks */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <span>Confidence: <strong className="font-mono" style={{ color: '#fff' }}>{(agent.confidenceScore * 100).toFixed(0)}%</strong></span>
                  <span>Active Queue: <strong className="font-mono" style={{ color: 'var(--cyan-primary)' }}>{agent.activeTasks} tasks</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Inter-Agent Communication Bus & Consensus */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Send size={15} color="var(--cyan-primary)" />
              Inter-Agent Telemetry & Event Bus
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Verifiable event log: Contract Net Protocol & Lyapunov feedback
            </p>
          </div>
          <span className="badge badge-cyan font-mono" style={{ fontSize: '9px' }}>
            SUBSCRIBE: 2.4k MSG/S
          </span>
        </div>

        {/* Real-time Message Stream */}
        <div style={{
          flex: 1,
          maxHeight: '480px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingRight: '4px'
        }}>
          {agentMessages.slice(0, 24).map(msg => (
            <div key={msg.id} style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 10px',
              fontSize: '11px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span className="font-mono" style={{ color: 'var(--cyan-primary)', fontWeight: 600 }}>
                  {msg.agentId}
                </span>
                <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                  {msg.time}
                </span>
              </div>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Bus Footnote */}
        <div style={{
          marginTop: '12px',
          padding: '8px 10px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: '#34d399'
        }}>
          <CheckCheck size={14} />
          <span>Zero Deadlocks Detected • Bounded Latency SLA: &lt;12ms</span>
        </div>
      </div>
    </div>
  );
}
