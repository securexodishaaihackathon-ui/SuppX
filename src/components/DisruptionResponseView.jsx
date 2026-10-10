import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  RotateCcw,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  XCircle
} from 'lucide-react';
import './DisruptionResponseView.css';

const SHIPMENTS = [
  {
    id: 'SH-204',
    product: 'AI accelerator modules',
    destination: 'Austin distribution center',
    units: 480,
    currentCover: 4,
    disruptedEta: 13,
    reroutedEta: 8,
    transferredCover: 10,
    combinedCover: 10
  },
  {
    id: 'SH-219',
    product: 'Battery management units',
    destination: 'Rotterdam distribution center',
    units: 320,
    currentCover: 7,
    disruptedEta: 14,
    reroutedEta: 9,
    transferredCover: 13,
    combinedCover: 13
  },
  {
    id: 'SH-227',
    product: 'Power controller boards',
    destination: 'Singapore distribution center',
    units: 200,
    currentCover: 5,
    disruptedEta: 12,
    reroutedEta: 7,
    transferredCover: 11,
    combinedCover: 11
  }
];

const PLANS = [
  {
    id: 'reroute',
    name: 'Reroute via Busan',
    description: 'Move the affected loads to an alternate port and vessel.',
    cost: 84000,
    shipments: SHIPMENTS.map((shipment) => ({
      eta: shipment.reroutedEta,
      cover: shipment.currentCover
    }))
  },
  {
    id: 'transfer',
    name: 'Transfer regional inventory',
    description: 'Expedite stock from unaffected regional distribution centers.',
    cost: 42000,
    shipments: SHIPMENTS.map((shipment) => ({
      eta: shipment.disruptedEta,
      cover: shipment.transferredCover
    }))
  },
  {
    id: 'combined',
    name: 'Reroute + inventory transfer',
    description: 'Combine alternate-port routing with targeted stock transfers.',
    cost: 126000,
    shipments: SHIPMENTS.map((shipment) => ({
      eta: shipment.reroutedEta,
      cover: shipment.combinedCover
    }))
  }
];

const RECOMMENDED_PLAN_ID = 'combined';

function getPlanImpact(plan) {
  const remainingBuffers = plan.shipments.map(({ eta, cover }) => cover - eta);
  const exposedShipments = remainingBuffers.filter((buffer) => buffer < 0).length;
  const exposureDays = remainingBuffers.reduce(
    (total, buffer) => total + Math.max(0, -buffer),
    0
  );

  return { remainingBuffers, exposedShipments, exposureDays };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function DisruptionResponseView() {
  const [status, setStatus] = useState('detected');
  const [selectedPlanId, setSelectedPlanId] = useState(RECOMMENDED_PLAN_ID);
  const [history, setHistory] = useState([
    { id: 'detected', time: getTime(), message: 'Demo port-closure alert received.' }
  ]);

  const selectedPlan = PLANS.find((plan) => plan.id === selectedPlanId) || PLANS[2];
  const approvedPlan = status === 'approved' ? selectedPlan : null;
  const approvedImpact = approvedPlan ? getPlanImpact(approvedPlan) : null;
  const canAssess = status === 'detected' || status === 'rejected';

  const recordHistory = (message) => {
    setHistory((events) => [
      ...events,
      { id: `${Date.now()}-${events.length}`, time: getTime(), message }
    ]);
  };

  const runAssessment = () => {
    setStatus('assessed');
    recordHistory('Impact assessment completed; three shipments flagged for review.');
  };

  const approvePlan = () => {
    setStatus('approved');
    recordHistory(
      `Planner approved "${selectedPlan.name}" (${formatCurrency(selectedPlan.cost)}); simulated outcome recorded.`
    );
  };

  const rejectPlan = () => {
    setStatus('rejected');
    recordHistory(`Planner rejected "${selectedPlan.name}"; no simulated action applied.`);
  };

  const resetDemo = () => {
    setStatus('detected');
    setSelectedPlanId(RECOMMENDED_PLAN_ID);
    setHistory([
      { id: `detected-${Date.now()}`, time: getTime(), message: 'Demo port-closure alert received.' }
    ]);
  };

  return (
    <section className="response-workflow" aria-labelledby="response-title">
      <div className="response-heading">
        <div>
          <div className="response-eyebrow">HUMAN-SUPERVISED DECISION SUPPORT</div>
          <h1 id="response-title">Port disruption response</h1>
          <p>Follow one illustrative disruption from alert through planner review to a simulated result.</p>
        </div>
        <span className="response-demo-badge">DEMO DATA · NO LIVE ACTIONS</span>
      </div>

      <div className="response-alert">
        <div className="response-alert-icon"><AlertTriangle size={20} /></div>
        <div className="response-alert-copy">
          <div className="response-alert-title">Shanghai port closure · 72-hour strike scenario</div>
          <div>Illustrative alert · Port of Shanghai → three shipments · Potential delay: 8 days</div>
        </div>
        <span className="response-status">{
          status === 'detected' ? 'DETECTED' :
            status === 'assessed' ? 'AWAITING APPROVAL' :
              status === 'approved' ? 'SIMULATED PLAN APPROVED' : 'PLAN REJECTED'
        }</span>
      </div>

      <div className="response-steps" aria-label="Workflow progress">
        {[
          { id: 'detected', label: 'Disruption detected' },
          { id: 'assessed', label: 'Impact assessed' },
          { id: 'approved', label: 'Planner decision' },
          { id: 'outcome', label: 'Simulated outcome' }
        ].map((step, index) => {
          const completed =
            status === 'approved' ||
            (status === 'assessed' && index < 2) ||
            (status === 'rejected' && index < 2);
          const current =
            (status === 'detected' && index === 0) ||
            (status === 'assessed' && index === 2) ||
            (status === 'approved' && index === 3) ||
            (status === 'rejected' && index === 2);
          return (
            <div className={`response-step${completed ? ' is-complete' : ''}${current ? ' is-current' : ''}`} key={step.id}>
              <span>{completed ? <CheckCircle2 size={16} /> : index + 1}</span>
              {step.label}
            </div>
          );
        })}
      </div>

      <div className="response-content-grid">
        <div className="response-main-column">
          <section className="glass-panel response-panel" aria-labelledby="impact-title">
            <div className="response-panel-heading">
              <div>
                <div className="response-section-kicker">NETWORK IMPACT</div>
                <h2 id="impact-title">Shipments requiring attention</h2>
              </div>
              <span className="response-data-tag">SAMPLE SHIPMENT RECORDS</span>
            </div>

            <div className="response-summary-grid">
              <div><span>Affected shipments</span><strong>3</strong></div>
              <div><span>Units in transit</span><strong>1,000</strong></div>
              <div><span>Added delay</span><strong>+8 days</strong></div>
            </div>

            <div className="response-table-wrap">
              <table className="response-table">
                <thead>
                  <tr>
                    <th>Shipment / product</th>
                    <th>Destination</th>
                    <th>Units</th>
                    <th>Stock cover</th>
                    <th>Disrupted ETA</th>
                    <th>Exposure</th>
                  </tr>
                </thead>
                <tbody>
                  {SHIPMENTS.map((shipment) => {
                    const exposure = Math.max(0, shipment.disruptedEta - shipment.currentCover);
                    return (
                      <tr key={shipment.id}>
                        <td><strong>{shipment.id}</strong><span>{shipment.product}</span></td>
                        <td>{shipment.destination}</td>
                        <td>{shipment.units.toLocaleString()}</td>
                        <td>{shipment.currentCover} days</td>
                        <td>{shipment.disruptedEta} days</td>
                        <td><span className="response-risk">{exposure} days at risk</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="response-footnote">
              Exposure is the gap between estimated arrival and current stock coverage. Values are illustrative, not operational forecasts.
            </p>
          </section>

          <section className="glass-panel response-panel" aria-labelledby="plans-title">
            <div className="response-panel-heading">
              <div>
                <div className="response-section-kicker">RESPONSE OPTIONS</div>
                <h2 id="plans-title">Compare plans before acting</h2>
              </div>
              <span className="response-data-tag">RULE-BASED DEMO ESTIMATES</span>
            </div>

            <div className="response-plan-list">
              {PLANS.map((plan) => {
                const impact = getPlanImpact(plan);
                const isSelected = selectedPlanId === plan.id;
                const isRecommended = plan.id === RECOMMENDED_PLAN_ID;
                return (
                  <button
                    className={`response-plan${isSelected ? ' is-selected' : ''}`}
                    key={plan.id}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={status === 'approved'}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <span className="response-plan-radio" aria-hidden="true">
                      {isSelected ? <CheckCircle2 size={18} /> : <span />}
                    </span>
                    <span className="response-plan-content">
                      <span className="response-plan-title">
                        {plan.name}
                        {isRecommended && <span className="response-recommended">RECOMMENDED</span>}
                      </span>
                      <span className="response-plan-description">{plan.description}</span>
                      <span className="response-plan-metrics">
                        <span><Truck size={13} /> {formatCurrency(plan.cost)} estimated cost</span>
                        <span><AlertTriangle size={13} /> {impact.exposureDays === 0 ? 'No modeled stockout exposure' : `${impact.exposureDays} exposure days across ${impact.exposedShipments} shipments`}</span>
                      </span>
                    </span>
                    <ArrowRight className="response-plan-arrow" size={16} />
                  </button>
                );
              })}
            </div>

            <div className="response-explanation">
              <ShieldCheck size={17} />
              <div>
                <strong>Why this plan is recommended</strong>
                <p>
                  The combined plan is the only modeled option that closes the stock-coverage gap for all three shipments.
                  Its illustrative cost is {formatCurrency(PLANS[2].cost)} and leaves 2–4 days of projected cover after arrival.
                  This is a rule-based comparison, not an AI-generated or optimized plan.
                </p>
              </div>
            </div>

            {canAssess && (
              <div className="response-actions">
                <button className="btn btn-primary" type="button" onClick={runAssessment}>
                  <CheckCircle2 size={16} />
                  Run impact assessment
                </button>
                <span>Assessment uses the fixed demo dataset; it does not call a forecasting model.</span>
              </div>
            )}

            {status === 'assessed' && (
              <div className="response-approval">
                <div className="response-approval-copy">
                  <UserRoundCheck size={18} />
                  <span><strong>Planner review required</strong><small>Selected: {selectedPlan.name} · {formatCurrency(selectedPlan.cost)}</small></span>
                </div>
                <div className="response-approval-actions">
                  <button className="btn btn-secondary" type="button" onClick={rejectPlan}>
                    <XCircle size={15} /> Reject
                  </button>
                  <button className="btn btn-primary" type="button" onClick={approvePlan}>
                    <CheckCircle2 size={15} /> Approve simulated plan
                  </button>
                </div>
              </div>
            )}

            {status === 'rejected' && (
              <div className="response-rejected">
                <XCircle size={17} />
                Plan rejected. No simulated action was applied. Run the assessment again to review another option.
              </div>
            )}
          </section>
        </div>

        <aside className="response-side-column">
          {approvedPlan && approvedImpact && (
            <section className="glass-panel response-panel response-outcome" aria-live="polite">
              <div className="response-panel-heading">
                <div>
                  <div className="response-section-kicker">SIMULATED RESULT</div>
                  <h2>Planner-approved plan</h2>
                </div>
                <CheckCircle2 size={20} />
              </div>
              <div className="response-outcome-banner">
                <strong>{approvedPlan.name}</strong>
                <span>Approval recorded · {formatCurrency(approvedPlan.cost)} illustrative cost</span>
              </div>
              <div className="response-outcome-kpis">
                <div><span>Shipments still exposed</span><strong>{approvedImpact.exposedShipments} / {SHIPMENTS.length}</strong></div>
                <div><span>Remaining exposure</span><strong>{approvedImpact.exposureDays} shipment-days</strong></div>
                <div><span>Units assessed</span><strong>{SHIPMENTS.reduce((sum, shipment) => sum + shipment.units, 0).toLocaleString()}</strong></div>
              </div>
              <div className="response-buffer-list">
                {SHIPMENTS.map((shipment, index) => {
                  const buffer = approvedImpact.remainingBuffers[index];
                  return (
                    <div className="response-buffer-row" key={shipment.id}>
                      <span>{shipment.id} · {shipment.destination}</span>
                      <strong className={buffer >= 0 ? 'is-safe' : 'is-risk'}>
                        {buffer >= 0 ? `${buffer} days buffer` : `${Math.abs(buffer)} days at risk`}
                      </strong>
                    </div>
                  );
                })}
              </div>
              <p className="response-footnote">
                Simulated approval only. No carrier booking, inventory movement, purchase order, or ERP/TMS write occurred.
              </p>
            </section>
          )}

          <section className="glass-panel response-panel" aria-labelledby="evidence-title">
            <div className="response-panel-heading">
              <div>
                <div className="response-section-kicker">PROVENANCE & ASSUMPTIONS</div>
                <h2 id="evidence-title">What this decision uses</h2>
              </div>
            </div>
            <ul className="response-evidence-list">
              <li><span className="response-source-dot is-amber" /><span><strong>Disruption</strong><small>Predefined Shanghai closure scenario · sample</small></span></li>
              <li><span className="response-source-dot is-cyan" /><span><strong>Shipments & stock cover</strong><small>Fixed prototype records · sample</small></span></li>
              <li><span className="response-source-dot is-purple" /><span><strong>Cost, route, and transfer estimates</strong><small>Illustrative rules · not live quotes</small></span></li>
            </ul>
            <div className="response-assumption">
              <Clock3 size={15} />
              <span>Assumes alternate-port capacity and qualified transfer stock are available. Validate both before any real-world use.</span>
            </div>
          </section>

          <section className="glass-panel response-panel" aria-labelledby="history-title">
            <div className="response-panel-heading">
              <div>
                <div className="response-section-kicker">AUDIT TRAIL</div>
                <h2 id="history-title">Decision history</h2>
              </div>
              <button className="response-reset" type="button" onClick={resetDemo}>
                <RotateCcw size={13} /> Reset demo
              </button>
            </div>
            <ol className="response-history">
              {history.map((event) => (
                <li key={event.id}>
                  <span className="response-history-marker"><CheckCircle2 size={14} /></span>
                  <span className="response-history-content"><strong>{event.message}</strong><small>{event.time} · local demo history</small></span>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </section>
  );
}
