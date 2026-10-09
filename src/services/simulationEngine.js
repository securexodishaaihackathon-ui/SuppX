import { NODES, ROUTES, INITIAL_VESSELS, SCENARIOS, CAUSAL_GRAPH } from './supplyChainData';
import { INITIAL_MAP_ELITES, AGENTS_STATE, INITIAL_LEDGER_TRANSACTIONS } from './evolutionEngine';

// Compute great circle or linear interpolation between waypoints
export function interpolateRoute(waypoints, progress) {
  if (!waypoints || waypoints.length === 0) return [0, 0];
  if (waypoints.length === 1) return waypoints[0];
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const totalSegments = waypoints.length - 1;
  const segmentProgress = clampedProgress * totalSegments;
  const currentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const nextIndex = currentIndex + 1;
  const fraction = segmentProgress - currentIndex;

  const [lat1, lon1] = waypoints[currentIndex];
  const [lat2, lon2] = waypoints[nextIndex];

  // Simple interpolation across longitude wrapping
  let deltaLon = lon2 - lon1;
  if (deltaLon > 180) deltaLon -= 360;
  if (deltaLon < -180) deltaLon += 360;

  const lat = lat1 + (lat2 - lat1) * fraction;
  let lon = lon1 + deltaLon * fraction;
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;

  return [lat, lon];
}

// Generate inter-agent message logs
export function generateAgentMessage(agentId, scenarioId) {
  const now = new Date().toLocaleTimeString();
  const templates = {
    'agent-macrosense': [
      `[Perception] Real-time AIS vessel density at Singapore dropped -4.8%. Causal weight adjusted.`,
      `[Perception] Ingested 18 maritime insurance rate updates. Spot freight index upward drift detected.`,
      `[Telemetry] Macro feed: High-frequency radar confirms port berth clear at Rotterdam.`
    ],
    'agent-georisk': [
      `[GeoRisk] Bab-el-Mandeb threat level score recalculated: SCM coefficient updated to 0.94.`,
      `[GeoRisk] Spatial corridor advisory: Recommending contingency routing for high-value silicon consignments.`,
      `[GeoRisk] Monitored maritime defense corridor radio; Cape route risk remains negligible (<0.02).`
    ],
    'agent-meio': [
      `[MEIO] Dynamic Safety Stock formula evaluated: z_alpha=2.58 across 14 SKU categories.`,
      `[MEIO] Buffer expansion triggered at Chicago RDC (+850 units) to absorb trans-Pacific variance.`,
      `[MEIO] Holding cost penalty optimized: Total working capital locked at $9.1M (well within $15M cap).`
    ],
    'agent-auction': [
      `[VCG Auction] Cleared capacity market for 420 FEU reefer slots; 0% speculative over-bidding.`,
      `[Bullwhip Dampener] Lyapunov filter suppressed 18% oscillatory demand spike from downstream retailer.`,
      `[Auction] Allocation commitment locked: Austin Gigafactory granted priority battery slots.`
    ],
    'agent-router': [
      `[FreightRouter] Ever Apex waypoint updated. Speed adjusted to 20.8 knots to optimize port berth arrival.`,
      `[FreightRouter] Evaluated Cape of Good Hope contingency: Total delta transit +11.2 days; fuel burn +31%.`,
      `[FreightRouter] Cosco Horizon completed waypoint arc 3; Pacific wave swell within safe navigation envelope.`
    ],
    'agent-darwin': [
      `[Self-Evolution] Generation 45 policy candidate synthesized: Mutated dampener_kappa to 0.88.`,
      `[Digital Twin] Executed 5,000 Monte Carlo counterfactual scenarios in sandbox; CVaR tail risk = 1.6%.`,
      `[Meta-Learning] Elite policy archive Pareto frontier updated; promoting candidate to Canary testing.`
    ]
  };

  const pool = templates[agentId] || [
    `[Task] Executed autonomic operational heuristic; state invariant maintained.`
  ];
  const text = pool[Math.floor(Math.random() * pool.length)];

  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    time: now,
    agentId,
    content: text
  };
}
