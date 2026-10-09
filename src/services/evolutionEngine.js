// MAP-Elites (Multi-Dimensional Archive of Phenotypic Elites) & Self-Evolution Engine

export const INITIAL_MAP_ELITES = [
  // 5x5 Behavioral Grid
  // Dim 1: Capital Efficiency (0: Extreme Buffer -> 4: Ultra Just-in-Time)
  // Dim 2: Lead-Time Shock Resilience (0: Fragile -> 4: Black-Swan Immune)
  {
    x: 0,
    y: 4,
    id: 'policy-fortress-v9',
    name: 'Fortress-Resilience v9.4',
    generation: 38,
    fitness: 91.4,
    otif: 99.8,
    capitalExposureM: 14.2,
    bullwhipEta: 1.02,
    cvarTailRisk: 1.1,
    status: 'archived-elite',
    description: 'Triple-buffered safety stock with pre-negotiated priority rail air rights. High working capital cost.',
    code: `def calculate_reorder_point(demand_mean, lead_time_mean, variance_d, variance_l):
    # Fortress Resilience Heuristic (Gen 38)
    z_alpha = 3.09  # 99.9% service level guarantee
    safety_stock = z_alpha * math.sqrt(lead_time_mean * variance_d + (demand_mean**2) * variance_l)
    return (demand_mean * lead_time_mean) + (safety_stock * 1.45)  # Anti-embargo multiplier`
  },
  {
    x: 1,
    y: 3,
    id: 'policy-adaptive-cape-v12',
    name: 'Dynamic Cape-Bypass v12.1',
    generation: 41,
    fitness: 94.8,
    otif: 98.9,
    capitalExposureM: 10.8,
    bullwhipEta: 1.04,
    cvarTailRisk: 1.9,
    status: 'canary-active',
    description: 'Automatically shifts vessels to Cape of Good Hope when Bab-el-Mandeb risk index > 0.65 with zero port dwell bunching.',
    code: `def evaluate_maritime_corridor(vessel_telemetry, ais_chokepoint_risk):
    # Dynamic Cape-Bypass Heuristic (Gen 41)
    if ais_chokepoint_risk.bab_el_mandeb > 0.65:
        target_route = 'r-cape-contingency'
        speed_knots = 21.5 # Steaming acceleration to offset +10 day diversion
        agent_procure_dispatch.lock_air_bridge_for_tier1_chips(priority=True)
        return RouteCommitment(route=target_route, eta_delta_days=+11, speed=speed_knots)`
  },
  {
    x: 2,
    y: 2,
    id: 'policy-balanced-pareto-v14',
    name: 'Pareto-Optimal Arbiter v14.0',
    generation: 44,
    fitness: 97.2,
    otif: 98.4,
    capitalExposureM: 8.9,
    bullwhipEta: 1.03,
    cvarTailRisk: 2.1,
    status: 'production-champion',
    description: 'Current champion policy balancing working capital, OTIF, and low bullwhip propagation.',
    code: `def orchestrate_meio_allocation(echelons, causal_forecast_dist):
    # Neuro-Symbolic MEIO Solver (Gen 44 Production Champion)
    dampener_kappa = 0.85
    bounded_demand = apply_lyapunov_filter(causal_forecast_dist.p_do_intervention, kappa=dampener_kappa)
    for echelon in reversed(echelons):
        echelon.target_buffer = solve_milp_inventory(bounded_demand, echelon.holding_cost, max_cvar=0.032)
    return emit_two_phase_commit(echelons)`
  },
  {
    x: 3,
    y: 1,
    id: 'policy-lean-velocity-v7',
    name: 'Lean-Velocity v7.2',
    generation: 29,
    fitness: 88.5,
    otif: 94.2,
    capitalExposureM: 5.4,
    bullwhipEta: 1.14,
    cvarTailRisk: 4.8,
    status: 'archived-elite',
    description: 'Minimizes holding capital via just-in-time micro shipments; vulnerable to port strikes.',
    code: `def jit_replenishment_pulse(dc_inventory, daily_run_rate):
    # Lean Velocity Heuristic (Gen 29)
    lead_time_buffer_days = 1.2
    return max(0, (daily_run_rate * lead_time_buffer_days) - dc_inventory)`
  },
  {
    x: 4,
    y: 0,
    id: 'policy-extreme-jit-v3',
    name: 'Zero-Buffer JIT v3.1',
    generation: 15,
    fitness: 76.1,
    otif: 89.1,
    capitalExposureM: 3.8,
    bullwhipEta: 1.35,
    cvarTailRisk: 8.9,
    status: 'deprecated',
    description: 'Historical baseline policy. Fails catastrophically under non-stationary chokepoint shocks.',
    code: `def static_min_max(stock):
    # Deprecated Static Rule (Gen 15)
    return stock < 1000`
  }
];

// Agent Taxonomy & State Definitions
export const AGENTS_STATE = [
  // Strategic Tier
  {
    id: 'agent-macrosense',
    name: 'Agent-MacroSense',
    tier: 'Tier 3 (Strategic)',
    role: 'Macro Regime & Commodity Sensing',
    status: 'active',
    health: 99,
    activeTasks: 4,
    lastAction: 'Ingested 4,200 AIS signals and NYMEX Brent crude futures tick',
    confidenceScore: 0.96,
    icon: 'Radio'
  },
  {
    id: 'agent-georisk',
    name: 'Agent-GeoRisk',
    tier: 'Tier 3 (Strategic)',
    role: 'Geopolitical & Spatial Corridor Threat Scoring',
    status: 'active',
    health: 98,
    activeTasks: 2,
    lastAction: 'Evaluating Bab-el-Mandeb naval escort security probabilities',
    confidenceScore: 0.94,
    icon: 'ShieldAlert'
  },
  {
    id: 'agent-hedge',
    name: 'Agent-CommodityHedge',
    tier: 'Tier 3 (Strategic)',
    role: 'Automated Forward Material Hedging',
    status: 'active',
    health: 97,
    activeTasks: 1,
    lastAction: 'Maintained 60-day bunker fuel collar contract ($76-$84/bbl)',
    confidenceScore: 0.92,
    icon: 'TrendingUp'
  },

  // Tactical Tier
  {
    id: 'agent-meio',
    name: 'Agent-MEIO-Arbiter',
    tier: 'Tier 2 (Tactical)',
    role: 'Multi-Echelon Dynamic Inventory Optimization',
    status: 'active',
    health: 100,
    activeTasks: 8,
    lastAction: 'Updated z-alpha safety stocks across 3 RDCs and 2 Assembly hubs',
    confidenceScore: 0.98,
    icon: 'Layers'
  },
  {
    id: 'agent-sop',
    name: 'Agent-S&OP-Balancer',
    tier: 'Tier 2 (Tactical)',
    role: 'Master Production Schedule & Capacity Arbiter',
    status: 'active',
    health: 99,
    activeTasks: 3,
    lastAction: 'Balanced Austin vs Berlin stamping line allocation for Q4 backlog',
    confidenceScore: 0.95,
    icon: 'Sliders'
  },
  {
    id: 'agent-auction',
    name: 'Agent-CapacityAuction',
    tier: 'Tier 2 (Tactical)',
    role: 'VCG Combinatorial Allocation & Bullwhip Suppressor',
    status: 'active',
    health: 99,
    activeTasks: 5,
    lastAction: 'Cleared double auction for 850 TEU trans-Pacific container slots',
    confidenceScore: 0.99,
    icon: 'Scale'
  },

  // Operational Tier
  {
    id: 'agent-router',
    name: 'Agent-FreightRouter',
    tier: 'Tier 1 (Operational)',
    role: 'Real-Time Vessel & Intermodal Logistics Rerouting',
    status: 'active',
    health: 98,
    activeTasks: 14,
    lastAction: 'Monitoring Ever Apex waypoints via Great-Circle trajectory',
    confidenceScore: 0.97,
    icon: 'Navigation'
  },
  {
    id: 'agent-procure',
    name: 'Agent-ProcureDispatch',
    tier: 'Tier 1 (Operational)',
    role: 'Autonomous Purchase Order Release & 2PC ERP Gateway',
    status: 'active',
    health: 100,
    activeTasks: 6,
    lastAction: 'Committed PO #88921 for 4,000 Bosch ECU assemblies ($480k)',
    confidenceScore: 0.99,
    icon: 'CheckCircle2'
  },
  {
    id: 'agent-bottleneck',
    name: 'Agent-TierN-Bottleneck',
    tier: 'Tier 1 (Operational)',
    role: 'Deep Multi-Tier Sub-tier Vendor Health Observer',
    status: 'active',
    health: 96,
    activeTasks: 9,
    lastAction: 'Validated neon gas raw supply continuity for TSMC Fab 18',
    confidenceScore: 0.93,
    icon: 'Cpu'
  },

  // Meta-Evolution Tier
  {
    id: 'agent-darwin',
    name: 'Agent-DarwinZero',
    tier: 'Tier 0 (Meta-Evolution)',
    role: 'Self-Evolution Engine & MAP-Elites Policy Mutator',
    status: 'active',
    health: 100,
    activeTasks: 1,
    lastAction: 'Simulating Generation 45 candidate across 5,000 Monte Carlo shocks',
    confidenceScore: 0.99,
    icon: 'Sparkles'
  }
];

// Verified ERP Execution Ledger (Two-Phase Commit stream)
export const INITIAL_LEDGER_TRANSACTIONS = [
  {
    txId: '0x9b7f...c421',
    timestamp: '2 mins ago',
    type: 'ERP_PO_RELEASE',
    sourceAgent: 'Agent-ProcureDispatch',
    system: 'SAP S/4HANA (US-PROD)',
    payload: 'Auto-released PO #88921 to Bosch Mobility for 4,000 ECU controllers ($480,000)',
    status: 'COMMITTED',
    invariantsPassed: ['Working Capital Cap (9.4M / 15.0M)', 'Sanctions Clean', 'Concentration <= 35%'],
    cvarRiskScore: '1.4%'
  },
  {
    txId: '0x4e12...a889',
    timestamp: '8 mins ago',
    type: 'MEIO_BUFFER_UPDATE',
    sourceAgent: 'Agent-MEIO-Arbiter',
    system: 'Manhattan WMS (Central RDC)',
    payload: 'Expanded Chicago RDC solid-state cell safety stock buffer: +1,200 units (z=2.58)',
    status: 'COMMITTED',
    invariantsPassed: ['Storage Limit (<92%)', 'Holding Cost ROI > 4.2x'],
    cvarRiskScore: '1.8%'
  },
  {
    txId: '0x2a98...df10',
    timestamp: '19 mins ago',
    type: 'FREIGHT_BOOKING_SLOT',
    sourceAgent: 'Agent-CapacityAuction',
    system: 'Flexport Freight API',
    payload: 'Secured 320 TEU reefer slots on Trans-Pacific Arc at $3,450/FEU clearing rate',
    status: 'COMMITTED',
    invariantsPassed: ['VCG Truthfulness Verified', 'No-Hoarding Dampener'],
    cvarRiskScore: '0.9%'
  },
  {
    txId: '0x81df...77b2',
    timestamp: '34 mins ago',
    type: 'FORWARD_COMMODITY_HEDGE',
    sourceAgent: 'Agent-CommodityHedge',
    system: 'Treasury ERP / Bloomberg FX',
    payload: 'Exercised zero-cost collar forward contract for 12,000 metric tons lithium carbonate',
    status: 'COMMITTED',
    invariantsPassed: ['Hedging Policy Compliance', 'Treasury Risk Envelope'],
    cvarRiskScore: '2.0%'
  }
];
