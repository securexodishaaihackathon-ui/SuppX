import React, { useState } from 'react';
import { INITIAL_LEDGER_TRANSACTIONS } from '../services/evolutionEngine';
import { playClick, playSuccess, playAlert } from '../services/soundEffects';
import { 
  ShieldCheck, CheckCircle2, AlertOctagon, FileCheck, 
  Database, Lock, ExternalLink, RefreshCw 
} from 'lucide-react';

export default function SafetyExecutionLedger({ transactions }) {
  const [ledger, setLedger] = useState(transactions || INITIAL_LEDGER_TRANSACTIONS);
  const [quarantineItems, setQuarantineItems] = useState([
    {
      id: 'quar-1092',
      time: '3 mins ago',
      agent: 'Agent-FreightRouter',
      action: 'Air-Freight Emergency Bridge: 120,000 3nm Logic Chips (Taipei -> Austin)',
      costUsd: 1420000,
      reason: 'Exceeds autonomous micro-spending limit ($1,000,000 threshold)',
      cvarScore: '2.8%',
      status: 'pending'
    }
  ]);

  const handleApproveQuarantine = (id) => {
    playSuccess();
    setQuarantineItems(prev => prev.filter(q => q.id !== id));
    // Add to committed ledger
    const newTx = {
      txId: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      timestamp: 'Just now',
      type: 'MANUAL_OVERRIDE_COMMIT',
      sourceAgent: 'Human-in-the-Loop (Executive)',
      system: 'Atlas Air & SAP S/4HANA',
      payload: 'Approved emergency air-freight bridge ($1.42M). Invariant waiver recorded.',
      status: 'COMMITTED',
      invariantsPassed: ['Executive Override Token', 'Single-Source Exception Approved'],
      cvarRiskScore: '2.8%'
    };
    setLedger(prev => [newTx, ...prev]);
  };

  const handleRejectQuarantine = (id) => {
    playAlert();
    setQuarantineItems(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
      
      {/* Left Column: Real-Time Verified Execution Ledger */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                Idempotent ERP Execution Ledger (2PC)
              </h3>
              <span className="badge badge-emerald font-mono" style={{ fontSize: '10px' }}>
                GATE 3 VERIFIED
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Cryptographically verified two-phase commit transactions into SAP, Manhattan WMS, and Flexport
            </p>
          </div>
          <span className="badge badge-cyan font-mono">
            IMMUTABLE EVENT LOG
          </span>
        </div>

        {/* Transaction Stream */}
        <div style={{
          flex: 1,
          maxHeight: '520px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingRight: '4px'
        }}>
          {ledger.map(tx => (
            <div key={tx.txId} style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '11px'
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span className="font-mono" style={{ color: 'var(--cyan-primary)', fontWeight: 700 }}>
                  TX: {tx.txId}
                </span>
                <span className="badge badge-emerald font-mono" style={{ fontSize: '9px' }}>
                  {tx.status}
                </span>
              </div>

              {/* Sub-header */}
              <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '10px', marginBottom: '6px' }}>
                <span>Agent: <strong style={{ color: '#fff' }}>{tx.sourceAgent}</strong></span>
                <span>System: <strong style={{ color: 'var(--text-secondary)' }}>{tx.system}</strong></span>
                <span>Time: {tx.timestamp}</span>
              </div>

              {/* Payload */}
              <div style={{ color: '#fff', fontSize: '12px', lineHeight: 1.4, marginBottom: '6px' }}>
                {tx.payload}
              </div>

              {/* Invariants & Risk */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {tx.invariantsPassed.map((inv, idx) => (
                    <span key={idx} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '1px 6px', borderRadius: '3px' }}>
                      ✓ {inv}
                    </span>
                  ))}
                </div>
                <span>Tail Risk: <strong className="font-mono" style={{ color: 'var(--cyan-primary)' }}>{tx.cvarRiskScore}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Three Execution Gates & Human Quarantine Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Three Execution Gates Status */}
        <div className="glass-panel" style={{ padding: '18px 20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            Autonomous Safety Envelope (3-Tier Gates)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Gate 1 */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#34d399' }}>
                  Gate 1: Hard Symbolic Invariant Verifier
                </span>
                <span className="badge badge-emerald font-mono" style={{ fontSize: '9px' }}>
                  ACTIVE: 100% PASS
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Working Capital Float: <strong>$9.4M / $15.0M Cap</strong> • Sanctions: <strong>0 OFAC Violations</strong> • Single-Source Cap: <strong>32% (Max 35%)</strong>
              </div>
            </div>

            {/* Gate 2 */}
            <div style={{
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cyan-primary)' }}>
                  Gate 2: Fast-Forward Digital Twin (CVaR)
                </span>
                <span className="badge badge-cyan font-mono" style={{ fontSize: '9px' }}>
                  PASS: 1.8% &lt; 3.2%
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Every action simulated across 5,000 perturbed shock scenarios before release.
              </div>
            </div>

            {/* Gate 3 */}
            <div style={{
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#c084fc' }}>
                  Gate 3: Idempotent 2PC Actuation Gateway
                </span>
                <span className="badge badge-purple font-mono" style={{ fontSize: '9px' }}>
                  ZERO HALLUCINATIONS
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Hardware cryptographically signed transactions committed with automatic rollback.
              </div>
            </div>
          </div>
        </div>

        {/* Human-on-the-Loop Quarantine Queue */}
        <div className="glass-panel" style={{ padding: '18px 20px', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <AlertOctagon size={16} color="#f59e0b" />
                Human-in-the-Loop Quarantine Queue
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Transactions exceeding autonomic risk threshold requiring executive signature
              </p>
            </div>
            <span className="badge badge-amber font-mono" style={{ fontSize: '10px' }}>
              {quarantineItems.length} PENDING
            </span>
          </div>

          {quarantineItems.length > 0 ? (
            quarantineItems.map(item => (
              <div key={item.id} style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                fontSize: '11px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{item.action}</span>
                  <span className="font-mono" style={{ color: '#fbbf24', fontWeight: 700 }}>
                    ${(item.costUsd / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Reason: <strong style={{ color: '#f87171' }}>{item.reason}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRejectQuarantine(item.id)}
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                  >
                    Reject & Rollback
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleApproveQuarantine(item.id)}
                    style={{ padding: '4px 12px', fontSize: '11px' }}
                  >
                    Approve & Commit 2PC
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '30px 0',
              color: 'var(--text-muted)',
              fontSize: '12px'
            }}>
              ✓ Quarantine queue empty. All autonomous agents operating within nominal safety bounds.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
