import React from 'react';
import { Zap, TrendingDown, CheckCircle, Percent, DollarSign, ShieldAlert } from 'lucide-react';

export default function MetricCards({ metrics, scenario }) {
  const cards = [
    {
      title: 'System Agility Index (SAI)',
      value: `${metrics.sai.toFixed(1)} min`,
      sub: 'Mean Shock Recovery Time',
      badge: metrics.sai <= 15 ? 'Target Met (<15m)' : 'Elevated Stress',
      badgeClass: metrics.sai <= 15 ? 'badge-emerald' : 'badge-amber',
      icon: Zap,
      iconColor: '#38bdf8'
    },
    {
      title: 'Bullwhip Dampening Ratio (η)',
      value: metrics.bullwhipEta.toFixed(2),
      sub: 'Order Variance / Demand Variance',
      badge: metrics.bullwhipEta <= 1.05 ? 'Lyapunov Stable (η ≤ 1.05)' : 'Oscillatory Risk',
      badgeClass: metrics.bullwhipEta <= 1.05 ? 'badge-emerald' : 'badge-crimson',
      icon: TrendingDown,
      iconColor: '#10b981'
    },
    {
      title: 'Autonomous Touchless Rate',
      value: `${metrics.touchlessRate.toFixed(1)}%`,
      sub: 'Zero-Human Intervention Ops',
      badge: 'Level 4 Autonomic',
      badgeClass: 'badge-cyan',
      icon: CheckCircle,
      iconColor: '#00f2fe'
    },
    {
      title: 'Global OTIF Fulfillment',
      value: `${metrics.otif.toFixed(1)}%`,
      sub: 'On-Time In-Full Service Level',
      badge: 'SLA: 98.0%',
      badgeClass: metrics.otif >= 98.0 ? 'badge-emerald' : 'badge-amber',
      icon: Percent,
      iconColor: '#a855f7'
    },
    {
      title: 'Active Working Capital',
      value: `$${metrics.workingCapitalM.toFixed(1)}M`,
      sub: 'Float Cap: $15.0M Maximum',
      badge: 'Gate 1 Invariant: PASS',
      badgeClass: 'badge-emerald',
      icon: DollarSign,
      iconColor: '#34d399'
    },
    {
      title: 'CVaR₉₉ Black-Swan Tail Risk',
      value: `${metrics.cvarRisk.toFixed(1)}%`,
      sub: '5,000-Trial Digital Twin Sim',
      badge: 'Safe Envelope (<3.2%)',
      badgeClass: metrics.cvarRisk <= 3.2 ? 'badge-emerald' : 'badge-crimson',
      icon: ShieldAlert,
      iconColor: '#f59e0b'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '12px',
      margin: '16px 0'
    }}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="glass-panel" style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top Row: Title & Icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                {card.title}
              </span>
              <div style={{
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)'
              }}>
                <Icon size={14} color={card.iconColor} />
              </div>
            </div>

            {/* Middle: Big Stat */}
            <div style={{ margin: '8px 0 6px' }}>
              <div className="font-mono" style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.02em'
              }}>
                {card.value}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                {card.sub}
              </div>
            </div>

            {/* Bottom: Badge */}
            <div style={{ marginTop: '4px' }}>
              <span className={`badge ${card.badgeClass}`} style={{ fontSize: '10px' }}>
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
