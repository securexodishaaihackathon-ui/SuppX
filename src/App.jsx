import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import LiveRealDataPanel from './components/LiveRealDataPanel';
import GlobalDigitalTwinMap from './components/GlobalDigitalTwinMap';
import AgentNetworkView from './components/AgentNetworkView';
import SelfEvolutionView from './components/SelfEvolutionView';
import CausalWorldModelView from './components/CausalWorldModelView';
import SafetyExecutionLedger from './components/SafetyExecutionLedger';
import NodeDetailModal from './components/NodeDetailModal';
import DisruptionResponseView from './components/DisruptionResponseView';

import { SCENARIOS, INITIAL_VESSELS, NODES } from './services/supplyChainData';
import { generateAgentMessage } from './services/simulationEngine';
import { INITIAL_LEDGER_TRANSACTIONS } from './services/evolutionEngine';
import { fetchFullRealWorldTelemetry } from './services/realDataService';
import { playAlert, playSuccess } from './services/soundEffects';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [simSpeed, setSimSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [generation, setGeneration] = useState(44);
  const [isMutating, setIsMutating] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  // Live Vessels State (Verified IMO / MMSI Registries)
  const [vessels, setVessels] = useState(INITIAL_VESSELS);

  // Real-World Telemetry State (Open-Meteo, USGS, ECB FX, NYMEX)
  const [realData, setRealData] = useState(null);
  const [isRealDataLoading, setIsRealDataLoading] = useState(false);

  // Inter-Agent Message Log
  const [agentMessages, setAgentMessages] = useState([
    generateAgentMessage('agent-macrosense', selectedScenario.id),
    generateAgentMessage('agent-meio', selectedScenario.id),
    generateAgentMessage('agent-router', selectedScenario.id),
    generateAgentMessage('agent-auction', selectedScenario.id)
  ]);

  // Real-Time System Metrics
  const [metrics, setMetrics] = useState({
    sai: 11.2,
    bullwhipEta: 1.03,
    touchlessRate: 96.8,
    otif: 98.4,
    workingCapitalM: 9.4,
    cvarRisk: 1.8
  });

  // Epoch Clock
  const [simTicks, setSimTicks] = useState(0);

  // Function to fetch real-world telemetry
  const loadRealWorldTelemetry = async () => {
    setIsRealDataLoading(true);
    try {
      const data = await fetchFullRealWorldTelemetry(NODES);
      if (data) {
        setRealData(data);
        
        // Update metrics dynamically with live real Brent Crude price
        if (data.market?.brentCrude?.price) {
          const liveBrent = data.market.brentCrude.price;
          // Correlate working capital with real fuel prices
          setMetrics(prev => ({
            ...prev,
            workingCapitalM: parseFloat((9.4 + (liveBrent - 80) * 0.04).toFixed(1))
          }));
        }

        // If real earthquake detected near supply chain, log real perception
        if (data.earthquakes?.supplyChainAlerts?.length > 0) {
          const alert = data.earthquakes.supplyChainAlerts[0];
          const quakeMsg = {
            id: `quake-${Date.now()}`,
            time: new Date().toLocaleTimeString(),
            agentId: 'agent-georisk',
            content: `[Real USGS Seismic Hazard] M ${alert.quakeMag} detected ${alert.distanceKm}km from ${alert.nodeName}. Correlating structural integrity.`
          };
          setAgentMessages(prev => [quakeMsg, ...prev]);
        }

        playSuccess();
      }
    } catch (err) {
      console.error('Error fetching real telemetry:', err);
    } finally {
      setIsRealDataLoading(false);
    }
  };

  // Initial Real Data Fetch on Mount
  useEffect(() => {
    loadRealWorldTelemetry();
    // Periodic refresh every 3 minutes
    const poller = setInterval(loadRealWorldTelemetry, 180000);
    return () => clearInterval(poller);
  }, []);

  // Handle Scenario Change
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
    if (scenario.id !== 'scenario-baseline') {
      playAlert();
    } else {
      playSuccess();
    }

    // Adjust metrics dynamically based on scenario shock
    if (scenario.effects.activeReroute) {
      // Suez Blockade
      setMetrics(prev => ({
        ...prev,
        sai: 14.8,
        bullwhipEta: 1.04,
        otif: 97.6,
        workingCapitalM: 11.2,
        cvarRisk: 2.4
      }));
    } else if (scenario.id === 'scenario-taiwan-strait') {
      setMetrics(prev => ({
        ...prev,
        sai: 16.2,
        bullwhipEta: 1.05,
        otif: 94.2,
        workingCapitalM: 12.8,
        cvarRisk: 3.1
      }));
    } else if (scenario.id === 'scenario-demand-surge') {
      setMetrics(prev => ({
        ...prev,
        sai: 12.4,
        bullwhipEta: 1.04,
        otif: 98.1,
        workingCapitalM: 13.9,
        cvarRisk: 2.0
      }));
    } else {
      // Nominal
      setMetrics({
        sai: 11.2,
        bullwhipEta: 1.03,
        touchlessRate: 96.8,
        otif: 98.4,
        workingCapitalM: 9.4,
        cvarRisk: 1.8
      });
    }

    const alertMsg = {
      id: `alert-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      agentId: 'agent-macrosense',
      content: `[Macro Regime Shift] Ingested ${scenario.name}. Structural Causal Model weights updated.`
    };
    setAgentMessages(prev => [alertMsg, ...prev]);
  };

  // Continuous Simulation Tick Loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSimTicks(t => t + 1);

      // 1. Advance vessel progress smoothly along authentic trajectories
      setVessels(prevVessels => {
        return prevVessels.map(v => {
          const delta = (0.0015 * simSpeed);
          let newProgress = v.progress + delta;
          if (newProgress >= 1.0) newProgress = 0.0; // Loop voyage
          return { ...v, progress: newProgress };
        });
      });

      // 2. Periodically inject autonomic agent communication
      if (Math.random() < 0.35) {
        const agentPool = [
          'agent-macrosense', 'agent-georisk', 'agent-meio', 
          'agent-auction', 'agent-router', 'agent-procure', 'agent-darwin'
        ];
        const randomAgent = agentPool[Math.floor(Math.random() * agentPool.length)];
        const newMsg = generateAgentMessage(randomAgent, selectedScenario.id);
        setAgentMessages(prev => [newMsg, ...prev.slice(0, 40)]);
      }

    }, 500 / simSpeed);

    return () => clearInterval(interval);
  }, [isPaused, simSpeed, selectedScenario]);

  // Trigger Policy Mutation (Self-Evolution Engine)
  const handleTriggerMutation = () => {
    setIsMutating(true);
    setTimeout(() => {
      setGeneration(g => g + 1);
      setIsMutating(false);
      setMetrics(prev => ({
        ...prev,
        sai: Math.max(9.1, prev.sai - 0.6),
        bullwhipEta: 1.02,
        otif: 98.9,
        workingCapitalM: Math.max(8.2, prev.workingCapitalM - 0.4)
      }));

      const evoMsg = {
        id: `evo-${Date.now()}`,
        time: new Date().toLocaleTimeString(),
        agentId: 'agent-darwin',
        content: `[Generation ${generation + 1} Champion] Canary policy promoted to production. Lyapunov dampener optimized.`
      };
      setAgentMessages(prev => [evoMsg, ...prev]);
    }, 4000);
  };

  // Handle direct node action from modal
  const handleInjectNodeAction = (node, actionType) => {
    const actionMsg = {
      id: `act-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      agentId: node.managingAgent,
      content: `[Action release] Manually requested ${actionType} on ${node.name}. Invariant checks satisfied.`
    };
    setAgentMessages(prev => [actionMsg, ...prev]);
  };

  // Virtual Date
  const baseEpoch = new Date(2026, 9, 10, 3, 0);
  const currentSimDate = new Date(baseEpoch.getTime() + simTicks * 3600000 * 0.5 * simSpeed);
  const virtualDateString = currentSimDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ` • ${currentSimDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC`;

  return (
    <div className="app-container">
      {/* Top Header & HUD */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedScenario={selectedScenario}
        onSelectScenario={handleSelectScenario}
        simSpeed={simSpeed}
        setSimSpeed={setSimSpeed}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        onTriggerMutation={handleTriggerMutation}
        isMutating={isMutating}
        generation={generation}
        virtualDate={virtualDateString}
      />

      {/* Main Mission Control Body */}
      <main className="app-main">
        {/* KPI Telemetry Banner */}
        <MetricCards metrics={metrics} scenario={selectedScenario} />

        {/* Live Real-World Sensor Mesh & Feeds Panel */}
        <LiveRealDataPanel
          realData={realData}
          onRefresh={loadRealWorldTelemetry}
          isLoading={isRealDataLoading}
        />

        {/* Tab View Switcher */}
          {activeTab === 'workflow' && <DisruptionResponseView />}

          {activeTab === 'map' && (
          <GlobalDigitalTwinMap
            scenario={selectedScenario}
            vessels={vessels}
            onSelectNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        )}

        {activeTab === 'agents' && (
          <AgentNetworkView
            agentMessages={agentMessages}
            onSelectAgent={() => {}}
          />
        )}

        {activeTab === 'evolution' && (
          <SelfEvolutionView
            generation={generation}
            onTriggerMutation={handleTriggerMutation}
            isMutating={isMutating}
          />
        )}

        {activeTab === 'causal' && (
          <CausalWorldModelView
            scenario={selectedScenario}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyExecutionLedger
            transactions={INITIAL_LEDGER_TRANSACTIONS}
          />
        )}
      </main>

      {/* Node Detail Inspector Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onInjectNodeAction={handleInjectNodeAction}
      />
    </div>
  );
}
