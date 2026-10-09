# NexusSC: Self-Evolving AI Agent Network for Global Supply Chains

**NexusSC** is a mission-control platform and digital twin implementing a **Hierarchical Holonic Multi-Agent System (H-HMAS)** for real-time global supply chain orchestration, Structural Causal Model (SCM) market shift forecasting, and continuous self-evolution via MAP-Elites.

---

## Key Architecture & Features

1. **Global Digital Twin Interactive Map**:
   - Real-time HTML5 Canvas map displaying Tier-1/Tier-2 suppliers, strategic ports, chokepoints, assembly plants, and regional distribution centers.
   - Dynamic great-circle maritime routing and animated live vessel tracking (e.g. *Ever Apex*, *Cosco Horizon*).
   - Dynamic contingency corridors (e.g. Bab-el-Mandeb bypass around Cape of Good Hope).

2. **Hierarchical Multi-Agent Network (H-HMAS)**:
   - **Tier 3 (Strategic)**: Macro-economic sensing, geopolitical threat analysis, forward commodity hedging.
   - **Tier 2 (Tactical)**: Multi-Echelon Dynamic Inventory Optimization (MEIO), S&OP balancing, VCG capacity double-auctions.
   - **Tier 1 (Operational)**: Real-time route dispatching, autonomous purchase order commit, deep sub-tier bottleneck tracking.
   - **Tier 0 (Meta-Evolution)**: DarwinZero MAP-Elites heuristic mutator and counterfactual digital twin evaluator.

3. **MAP-Elites Self-Evolution Engine**:
   - 5x5 Quality-Diversity (QD) repertoire balancing Working Capital Efficiency vs Shock Immunity.
   - Automated LLM-guided Python heuristic code synthesis with sandboxed gVisor execution.
   - 5,000-trial Monte Carlo counterfactual simulation in the digital twin before canary hot-swap.

4. **Causal World Model & Pearl's Do-Calculus**:
   - Structural Causal Model (SCM) Directed Acyclic Graph (DAG) differentiating association $P(Y \mid X)$ from intervention $P(Y \mid do(X))$.
   - Interactive counterfactual sandbox with atomic slider interventions and macro telemetry feeds (Baltic Dry Index, Brent Crude).

5. **3-Tier Safety Envelope & Idempotent ERP Ledger**:
   - **Gate 1**: Symbolic hard invariants (Working Capital cap, OFAC sanctions, single-source concentration).
   - **Gate 2**: Fast-Forward digital twin CVaR tail-risk verification ($<3.2\%$).
   - **Gate 3**: Hardware-signed Two-Phase Commit (2PC) ERP actuation gateway with human-on-the-loop quarantine queue.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# -> Opens on http://localhost:5173

# 3. Test production build
npm run build
npm start
# -> Runs Express production server on http://localhost:3000
```

---

## Deploying to Railway Cloud

Railway automatically detects this repository via **Nixpacks** or **Docker**.

### Option A: 1-Click Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nexus-sc.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Railway](https://railway.com/).
3. Click **"New Project"** ➔ **"Deploy from GitHub repo"**.
4. Select your `nexus-sc` repository.
5. Railway reads `railway.json` and `package.json`, runs `npm run build`, and starts `server.js` on `0.0.0.0:$PORT`.
6. Click **"Generate Domain"** under Networking settings to get your public live URL.

### Option B: Deploy via Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link project
railway login
railway init

# Deploy directly
railway up
```
