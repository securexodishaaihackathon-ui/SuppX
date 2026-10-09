// Global Multi-Echelon Supply Chain Graph, Nodes, and Corridors
export const NODES = [
  // Tier-2 & Tier-1 Suppliers
  {
    id: 's-tsmc',
    name: 'TSMC Fab 18',
    location: 'Hsinchu, Taiwan',
    type: 'supplier-tier2',
    category: 'Semiconductor Silicon',
    lat: 24.78,
    lon: 120.99,
    capacity: 94, // %
    inventory: 48500, // units
    leadTimeDays: 18,
    health: 'nominal',
    riskScore: 0.18,
    singleSourceShare: 0.32,
    managingAgent: 'Agent-TierN-Bottleneck',
    description: 'Leading-edge 3nm/5nm logic wafer fabrication and advanced CoWoS packaging.'
  },
  {
    id: 's-catl',
    name: 'CATL Mega-Cell',
    location: 'Ningde, China',
    type: 'supplier-tier2',
    category: 'Battery Energy Cells',
    lat: 26.66,
    lon: 119.54,
    capacity: 88,
    inventory: 92000,
    leadTimeDays: 22,
    health: 'nominal',
    riskScore: 0.22,
    singleSourceShare: 0.28,
    managingAgent: 'Agent-TierN-Bottleneck',
    description: 'High-density LFP & NMC battery chemistry cells and active material stacks.'
  },
  {
    id: 's-bosch',
    name: 'Bosch Mobility Center',
    location: 'Stuttgart, Germany',
    type: 'supplier-tier1',
    category: 'ECU & Power Actuators',
    lat: 48.77,
    lon: 9.18,
    capacity: 91,
    inventory: 34000,
    leadTimeDays: 14,
    health: 'nominal',
    riskScore: 0.12,
    singleSourceShare: 0.21,
    managingAgent: 'Agent-ProcureDispatch',
    description: 'Automotive grade control units, inverters, and high-frequency harness assemblies.'
  },
  {
    id: 's-foxconn',
    name: 'Foxconn Integrated Park',
    location: 'Zhengzhou, China',
    type: 'supplier-tier1',
    category: 'Precision Sub-Assembly',
    lat: 34.75,
    lon: 113.62,
    capacity: 86,
    inventory: 67000,
    leadTimeDays: 19,
    health: 'nominal',
    riskScore: 0.25,
    singleSourceShare: 0.29,
    managingAgent: 'Agent-ProcureDispatch',
    description: 'High-speed automated surface-mount assembly and robotic enclosure joining.'
  },
  {
    id: 's-samsung',
    name: 'Samsung SDI Tech Hub',
    location: 'Cheonan, South Korea',
    type: 'supplier-tier2',
    category: 'Solid-State Elements',
    lat: 36.81,
    lon: 127.15,
    capacity: 90,
    inventory: 41000,
    leadTimeDays: 16,
    health: 'nominal',
    riskScore: 0.15,
    singleSourceShare: 0.19,
    managingAgent: 'Agent-TierN-Bottleneck',
    description: 'Solid electrolyte substrates and next-gen cell cathode precursors.'
  },
  {
    id: 's-murata',
    name: 'Murata Micro-Capacitors',
    location: 'Kyoto, Japan',
    type: 'supplier-tier2',
    category: 'MLCC Passive Chips',
    lat: 35.01,
    lon: 135.76,
    capacity: 96,
    inventory: 145000,
    leadTimeDays: 11,
    health: 'nominal',
    riskScore: 0.11,
    singleSourceShare: 0.16,
    managingAgent: 'Agent-TierN-Bottleneck',
    description: 'Micro ceramic capacitors with ultra-low equivalent series resistance.'
  },

  // Strategic Ports and Chokepoints
  {
    id: 'p-shanghai',
    name: 'Port of Shanghai (Yangshan)',
    location: 'Shanghai, China',
    type: 'port',
    category: 'Maritime Mega-Hub',
    lat: 30.62,
    lon: 122.06,
    capacity: 92,
    congestionDwellDays: 2.3,
    dwellBaseline: 2.0,
    health: 'nominal',
    riskScore: 0.20,
    managingAgent: 'Agent-FreightRouter',
    description: 'World highest container throughput facility; terminal gates and crane berths.'
  },
  {
    id: 'p-singapore',
    name: 'Port of Singapore / Malacca',
    location: 'Singapore',
    type: 'port',
    category: 'Strait Transshipment Gateway',
    lat: 1.29,
    lon: 103.85,
    capacity: 89,
    congestionDwellDays: 1.8,
    dwellBaseline: 1.5,
    health: 'nominal',
    riskScore: 0.14,
    managingAgent: 'Agent-FreightRouter',
    description: 'Key junction between Asia-Pacific lines and Indian Ocean westward freight.'
  },
  {
    id: 'p-suez',
    name: 'Bab-el-Mandeb & Suez Corridor',
    location: 'Red Sea Gateway',
    type: 'chokepoint',
    category: 'Strategic Maritime Canal',
    lat: 12.58,
    lon: 43.33,
    capacity: 84,
    congestionDwellDays: 1.2,
    dwellBaseline: 1.0,
    health: 'nominal',
    riskScore: 0.35,
    managingAgent: 'Agent-GeoRisk',
    description: 'Primary sea route linking Asia and European Atlantic gateways.'
  },
  {
    id: 'p-rotterdam',
    name: 'Port of Rotterdam',
    location: 'Rotterdam, Netherlands',
    type: 'port',
    category: 'European Atlantic Hub',
    lat: 51.92,
    lon: 4.47,
    capacity: 86,
    congestionDwellDays: 2.5,
    dwellBaseline: 2.2,
    health: 'nominal',
    riskScore: 0.16,
    managingAgent: 'Agent-FreightRouter',
    description: 'Automated electric container terminals serving the European hinterland.'
  },
  {
    id: 'p-longbeach',
    name: 'Port of Long Beach / LA',
    location: 'California, USA',
    type: 'port',
    category: 'Pacific Gateway',
    lat: 33.75,
    lon: -118.21,
    capacity: 85,
    congestionDwellDays: 3.1,
    dwellBaseline: 2.8,
    health: 'nominal',
    riskScore: 0.22,
    managingAgent: 'Agent-FreightRouter',
    description: 'Primary trans-Pacific receiving port with intermodal rail spurs.'
  },
  {
    id: 'p-panama',
    name: 'Panama Canal Transit Basin',
    location: 'Panama',
    type: 'chokepoint',
    category: 'Interoceanic Canal',
    lat: 9.08,
    lon: -79.68,
    capacity: 80,
    congestionDwellDays: 2.9,
    dwellBaseline: 2.0,
    health: 'nominal',
    riskScore: 0.24,
    managingAgent: 'Agent-FreightRouter',
    description: 'Freshwater lock-based corridor linking Pacific and Atlantic trade.'
  },

  // Final Assembly & Manufacturing Plants
  {
    id: 'm-austin',
    name: 'Gigafactory Austin Advanced',
    location: 'Texas, USA',
    type: 'plant',
    category: 'Final Vehicle & Power Assembly',
    lat: 30.22,
    lon: -97.62,
    capacity: 93,
    inventory: 18200,
    leadTimeDays: 4,
    health: 'nominal',
    riskScore: 0.08,
    managingAgent: 'Agent-S&OP-Balancer',
    description: 'End-to-end casting, pack integration, and structural body assembly.'
  },
  {
    id: 'm-berlin',
    name: 'Berlin Advanced Mobility Hub',
    location: 'Berlin-Brandenburg, Germany',
    type: 'plant',
    category: 'European Final Manufacturing',
    lat: 52.39,
    lon: 13.79,
    capacity: 89,
    inventory: 14600,
    leadTimeDays: 5,
    health: 'nominal',
    riskScore: 0.10,
    managingAgent: 'Agent-S&OP-Balancer',
    description: 'Robotic paintshop, cell module stacking, and powertrain final validation.'
  },
  {
    id: 'm-monterrey',
    name: 'Monterrey Precision Assembly',
    location: 'Nuevo León, Mexico',
    type: 'plant',
    category: 'Nearshore Modular Assembly',
    lat: 25.68,
    lon: -100.31,
    capacity: 92,
    inventory: 16800,
    leadTimeDays: 3,
    health: 'nominal',
    riskScore: 0.12,
    managingAgent: 'Agent-S&OP-Balancer',
    description: 'Sub-frame integration and cross-border rail logistics into North America.'
  },

  // Regional Distribution Centers (RDCs)
  {
    id: 'rdc-chicago',
    name: 'Chicago Inland Mega-RDC',
    location: 'Illinois, USA',
    type: 'rdc',
    category: 'North America Distribution Hub',
    lat: 41.87,
    lon: -87.62,
    capacity: 87,
    inventory: 54000,
    leadTimeDays: 2,
    health: 'nominal',
    riskScore: 0.07,
    managingAgent: 'Agent-MEIO-Arbiter',
    description: 'Central distribution hub fulfilling East & Midwest enterprise customer nodes.'
  },
  {
    id: 'rdc-frankfurt',
    name: 'Frankfurt Central RDC',
    location: 'Frankfurt, Germany',
    type: 'rdc',
    category: 'EMEA Multi-Echelon Hub',
    lat: 50.11,
    lon: 8.68,
    capacity: 90,
    inventory: 48000,
    leadTimeDays: 2,
    health: 'nominal',
    riskScore: 0.09,
    managingAgent: 'Agent-MEIO-Arbiter',
    description: 'Automated high-bay warehouse managing cross-border pan-European deliveries.'
  },
  {
    id: 'rdc-tokyo',
    name: 'Tokyo Kanto Megacity RDC',
    location: 'Tokyo, Japan',
    type: 'rdc',
    category: 'APAC Regional Depot',
    lat: 35.67,
    lon: 139.65,
    capacity: 93,
    inventory: 39000,
    leadTimeDays: 1,
    health: 'nominal',
    riskScore: 0.06,
    managingAgent: 'Agent-MEIO-Arbiter',
    description: 'High-velocity replenishment node feeding Japan and South Korea demand pools.'
  }
];

// Active Transit Routes & Maritime Corridors
export const ROUTES = [
  {
    id: 'r-transpacific',
    name: 'Trans-Pacific Maritime Arc',
    origin: 'p-shanghai',
    destination: 'p-longbeach',
    type: 'maritime',
    waypoints: [
      [30.62, 122.06],
      [32.5, 140.0],
      [38.0, 175.0],
      [36.5, -150.0],
      [33.75, -118.21]
    ],
    normalTransitDays: 14,
    status: 'active'
  },
  {
    id: 'r-suez-eur',
    name: 'Asia-Europe via Suez Canal',
    origin: 'p-singapore',
    destination: 'p-rotterdam',
    type: 'maritime',
    waypoints: [
      [1.29, 103.85],
      [5.9, 80.5],
      [12.58, 43.33], // Bab-el-Mandeb
      [27.8, 34.3],
      [31.2, 32.3], // Suez Canal
      [36.0, 15.0],
      [36.0, -5.5], // Gibraltar
      [48.0, -5.0],
      [51.92, 4.47] // Rotterdam
    ],
    normalTransitDays: 24,
    status: 'active'
  },
  {
    id: 'r-cape-contingency',
    name: 'Cape of Good Hope Contingency',
    origin: 'p-singapore',
    destination: 'p-rotterdam',
    type: 'maritime-contingency',
    waypoints: [
      [1.29, 103.85],
      [-5.0, 90.0],
      [-20.0, 60.0],
      [-34.8, 20.0], // Cape of Good Hope
      [-15.0, 0.0],
      [10.0, -20.0],
      [35.0, -15.0],
      [48.0, -6.0],
      [51.92, 4.47]
    ],
    normalTransitDays: 35,
    status: 'idle'
  },
  {
    id: 'r-feeder-tsmc-sha',
    name: 'East Asia Feeder (Hsinchu - Shanghai)',
    origin: 's-tsmc',
    destination: 'p-shanghai',
    type: 'feeder',
    waypoints: [
      [24.78, 120.99],
      [27.5, 122.5],
      [30.62, 122.06]
    ],
    normalTransitDays: 2,
    status: 'active'
  },
  {
    id: 'r-transatlantic',
    name: 'North Atlantic Container Highway',
    origin: 'p-rotterdam',
    destination: 'p-longbeach',
    type: 'maritime-canal',
    waypoints: [
      [51.92, 4.47],
      [45.0, -15.0],
      [25.0, -65.0],
      [9.08, -79.68], // Panama
      [15.0, -95.0],
      [33.75, -118.21]
    ],
    normalTransitDays: 21,
    status: 'active'
  },
  {
    id: 'r-na-rail',
    name: 'BNSF Intermodal Rail Spine',
    origin: 'p-longbeach',
    destination: 'm-austin',
    type: 'rail',
    waypoints: [
      [33.75, -118.21],
      [32.22, -110.97],
      [31.76, -106.48],
      [30.22, -97.62]
    ],
    normalTransitDays: 4,
    status: 'active'
  },
  {
    id: 'r-austin-chicago',
    name: 'Central Freight Line (Austin - Chicago)',
    origin: 'm-austin',
    destination: 'rdc-chicago',
    type: 'truck-rail',
    waypoints: [
      [30.22, -97.62],
      [35.46, -97.51],
      [39.09, -94.57],
      [41.87, -87.62]
    ],
    normalTransitDays: 2,
    status: 'active'
  },
  {
    id: 'r-europe-inland',
    name: 'Rhine-Main Logistics Corridor',
    origin: 'p-rotterdam',
    destination: 'rdc-frankfurt',
    type: 'inland',
    waypoints: [
      [51.92, 4.47],
      [51.22, 6.77],
      [50.11, 8.68]
    ],
    normalTransitDays: 1,
    status: 'active'
  }
];

// Live In-Transit Commercial Fleet (Verified IMO & MMSI Registries)
export const INITIAL_VESSELS = [
  {
    id: 'v-evergiven',
    name: 'Ever Given (IMO: 9811000)',
    carrier: 'Evergreen Marine (Panama)',
    imo: '9811000',
    mmsi: '353136000',
    teu: 20124,
    routeId: 'r-suez-eur',
    currentPos: [12.58, 43.33], // Approaching Bab-el-Mandeb
    progress: 0.45,
    speedKnots: 19.4,
    cargo: 'TSMC 3nm Silicon & NMC Battery Stacks',
    valueUsd: 142000000,
    destination: 'Port of Rotterdam',
    status: 'on-schedule',
    etaDays: 11,
    managingAgent: 'Agent-FreightRouter'
  },
  {
    id: 'v-cosco-universe',
    name: 'Cosco Universe (IMO: 9795610)',
    carrier: 'COSCO Shipping (Hong Kong)',
    imo: '9795610',
    mmsi: '477174600',
    teu: 21237,
    routeId: 'r-transpacific',
    currentPos: [37.2, 178.5],
    progress: 0.52,
    speedKnots: 20.2,
    cargo: 'Foxconn Precision Sub-assemblies & Harnesses',
    valueUsd: 98000000,
    destination: 'Port of Long Beach',
    status: 'on-schedule',
    etaDays: 6,
    managingAgent: 'Agent-FreightRouter'
  },
  {
    id: 'v-madrid-maersk',
    name: 'Madrid Maersk (IMO: 9778791)',
    carrier: 'A.P. Møller – Maersk (Denmark)',
    imo: '9778791',
    mmsi: '219836000',
    teu: 20568,
    routeId: 'r-transpacific',
    currentPos: [35.1, -158.2],
    progress: 0.74,
    speedKnots: 18.8,
    cargo: 'Murata MLCC Capacitors & Sensor Arrays',
    valueUsd: 76000000,
    destination: 'Port of Long Beach',
    status: 'on-schedule',
    etaDays: 3,
    managingAgent: 'Agent-FreightRouter'
  },
  {
    id: 'v-msc-gulsun',
    name: 'MSC Gülsün (IMO: 9839438)',
    carrier: 'Mediterranean Shipping Co (Panama)',
    imo: '9839438',
    mmsi: '354363000',
    teu: 23756,
    routeId: 'r-suez-eur',
    currentPos: [5.9, 80.5],
    progress: 0.22,
    speedKnots: 19.8,
    cargo: 'CATL Lithium Precursors & Power Inverters',
    valueUsd: 115000000,
    destination: 'Port of Rotterdam',
    status: 'on-schedule',
    etaDays: 16,
    managingAgent: 'Agent-FreightRouter'
  },
  {
    id: 'a-polar-902',
    name: 'Atlas Cargo Flight 902 (747-8F)',
    carrier: 'Atlas Air (Tail: N856GT)',
    imo: 'ICAO: GTI902',
    mmsi: 'N856GT',
    teu: 140, // Air ULD capacity
    routeId: 'air-hsinchu-austin',
    currentPos: [34.0, -135.0],
    progress: 0.65,
    speedKnots: 490,
    cargo: 'High-Priority CoWoS ASIC Accelerators',
    valueUsd: 48000000,
    destination: 'Gigafactory Austin',
    status: 'high-priority',
    etaDays: 0.4,
    managingAgent: 'Agent-ProcureDispatch'
  }
];

// Structural Causal Model (SCM) Nodes for Pearl's Do-Calculus
export const CAUSAL_GRAPH = {
  nodes: [
    { id: 'geo_shock', label: 'Geopolitical Risk Shock (Z_geo)', type: 'exogenous', baseline: 0.15 },
    { id: 'oil_price', label: 'Bunker Fuel Index (X_fuel)', type: 'endogenous', baseline: 78.4 },
    { id: 'route_disrupt', label: 'Chokepoint Closure (X_route)', type: 'intervention_target', baseline: 0.05 },
    { id: 'transit_latency', label: 'Maritime Transit Latency (M_latency)', type: 'mediator', baseline: 18.2 },
    { id: 'port_dwell', label: 'Port Demurrage Dwell (M_dwell)', type: 'mediator', baseline: 2.4 },
    { id: 'safety_stock', label: 'Dynamic Buffer Allocation (A_meio)', type: 'policy_agent', baseline: 12.5 },
    { id: 'stockout_risk', label: 'Stockout Prob. (Y_stockout)', type: 'outcome', baseline: 0.018 },
    { id: 'total_lost_ebitda', label: 'Downstream Lost Revenue (Y_ebitda)', type: 'outcome', baseline: 1.2 }
  ],
  edges: [
    { from: 'geo_shock', to: 'oil_price', strength: 0.64, description: 'Conflict elevates Brent crude risk premium' },
    { from: 'geo_shock', to: 'route_disrupt', strength: 0.88, description: 'Militant actions force maritime passage halts' },
    { from: 'route_disrupt', to: 'transit_latency', strength: 0.95, description: 'Rerouting via Cape of Good Hope adds +12 days' },
    { from: 'oil_price', to: 'transit_latency', strength: 0.32, description: 'Slow steaming to conserve fuel adds minor latency' },
    { from: 'transit_latency', to: 'port_dwell', strength: 0.71, description: 'Bunches arrivals into European terminal berths' },
    { from: 'transit_latency', to: 'safety_stock', strength: -0.85, description: 'MEIO Agent expands safety stock buffers' },
    { from: 'port_dwell', to: 'stockout_risk', strength: 0.78, description: 'Terminal gridlock starves factory lines' },
    { from: 'safety_stock', to: 'stockout_risk', strength: -0.92, description: 'Expanded buffers absorb lead-time variance' },
    { from: 'stockout_risk', to: 'total_lost_ebitda', strength: 0.96, description: 'Idled factory shifts trigger unrecoverable revenue loss' }
  ]
};

// Disruption Presets
export const SCENARIOS = [
  {
    id: 'scenario-baseline',
    name: 'Normal Global Equilibrium',
    badge: 'Nominal',
    badgeClass: 'badge-emerald',
    description: 'All major maritime corridors open. Baseline lead times, nominal commodity prices, and steady consumer demand.',
    effects: {
      suezRisk: 0.12,
      fuelPrice: 78.4,
      bdi: 1420,
      leadTimeMultiplier: 1.0,
      activeReroute: false,
      demandShock: 1.0,
      tsmcCapacity: 94
    }
  },
  {
    id: 'scenario-suez-crisis',
    name: 'Bab-el-Mandeb / Red Sea Blockade',
    badge: 'Critical Chokepoint',
    badgeClass: 'badge-crimson',
    description: 'Maritime attacks force immediate suspension of Suez passage. Ships rerouted around Cape of Good Hope (+12 days transit, +38% fuel costs).',
    effects: {
      suezRisk: 0.96,
      fuelPrice: 108.5,
      bdi: 2850,
      leadTimeMultiplier: 1.65,
      activeReroute: true,
      demandShock: 1.0,
      tsmcCapacity: 94
    }
  },
  {
    id: 'scenario-taiwan-strait',
    name: 'Taiwan Strait Maritime Embargo',
    badge: 'Tier-2 Critical',
    badgeClass: 'badge-amber',
    description: 'Naval drills throttle TSMC shipping channels. Global 3nm wafer allocation cut by 62%. Multi-sourcing allocation triggered.',
    effects: {
      suezRisk: 0.20,
      fuelPrice: 86.0,
      bdi: 1980,
      leadTimeMultiplier: 2.1,
      activeReroute: false,
      demandShock: 1.0,
      tsmcCapacity: 38
    }
  },
  {
    id: 'scenario-typhoon',
    name: 'Super Typhoon Megi (East Asia Port Closure)',
    badge: 'Severe Weather',
    badgeClass: 'badge-purple',
    description: 'Category 5 typhoon forces Port of Shanghai & Ningde to cease operations for 8 days. Container yard gridlock cascades into trans-Pacific lines.',
    effects: {
      suezRisk: 0.15,
      fuelPrice: 82.1,
      bdi: 2150,
      leadTimeMultiplier: 1.45,
      activeReroute: false,
      demandShock: 1.0,
      tsmcCapacity: 82
    }
  },
  {
    id: 'scenario-demand-surge',
    name: 'Black Swan AI Hardware Demand (+340%)',
    badge: 'Demand Shock',
    badgeClass: 'badge-cyan',
    description: 'Unprecedented commercial compute demand triggers order explosion. Anti-bullwhip VCG auctions activate to throttle speculative hoarding.',
    effects: {
      suezRisk: 0.18,
      fuelPrice: 84.0,
      bdi: 2600,
      leadTimeMultiplier: 1.25,
      activeReroute: false,
      demandShock: 3.4,
      tsmcCapacity: 100
    }
  }
];
