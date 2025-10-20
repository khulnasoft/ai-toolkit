// @ts-ignore: Suppress missing type declarations for express
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WS = require('ws');
const app = express();
const port = 3001;

const { manager } = require('./manager');

const server = http.createServer(app);
const wss = new WS.Server({ server });

const HISTORY_FILE = path.join(__dirname, 'agent-history.json');

function getAgentList() {
  // @ts-ignore: Accessing protected/private property for monitoring
  const agents = manager ? manager['agents'] : new Map();
  return Array.from(agents.values()).map(a => {
    const agent = a as any;
    return {
      id: agent.id,
      status: agent.status,
      plan: agent.plan,
      selectedModel: agent.selectedModel,
      duration: agent.duration,
      answer: agent.answer,
    };
  });
}

function getAnalytics() {
  // @ts-ignore: Accessing protected/private property for monitoring
  const agents = manager ? manager['agents'] : new Map();
  const results = Array.from(agents.values()).map(a => a as any);
  const completed = results.filter(a => a.status === 'completed');
  const failed = results.filter(a => a.status === 'failed');
  const durations = results.map(a => a.duration || 0);
  const avg = durations.length
    ? durations.reduce((a, b) => a + b, 0) / durations.length
    : 0;
  const min = durations.length ? Math.min(...durations) : 0;
  const max = durations.length ? Math.max(...durations) : 0;
  const modelCounts: Record<string, number> = {};
  for (const a of results) {
    if (a.selectedModel)
      modelCounts[a.selectedModel] = (modelCounts[a.selectedModel] || 0) + 1;
  }
  return {
    total: results.length,
    completed: completed.length,
    failed: failed.length,
    avgDuration: Math.round(avg),
    minDuration: min,
    maxDuration: max,
    modelUsage: modelCounts,
  };
}

function broadcastUpdate() {
  const data = JSON.stringify({
    agents: getAgentList(),
    analytics: getAnalytics(),
  });
  wss.clients.forEach((client: any) => {
    if (client.readyState === WS.OPEN) {
      client.send(data);
    }
  });
}

function logAgentRun(agent: any) {
  const entry = {
    id: agent.id,
    status: agent.status,
    plan: agent.plan,
    selectedModel: agent.selectedModel,
    duration: agent.duration,
    answer: agent.answer,
    endTime: agent.endTime,
    timestamp: Date.now(),
  };
  fs.appendFileSync(HISTORY_FILE, JSON.stringify(entry) + '\n');
}

// Patch MathAgentManager to call logAgentRun on completion/failure
const origRunAgent = manager.runAgent.bind(manager);
manager.runAgent = async function (task: any) {
  await origRunAgent(task);
  // @ts-ignore: Accessing protected/private property for monitoring
  const agent = this['agents'].get(task.id);
  if (agent && (agent.status === 'completed' || agent.status === 'failed')) {
    logAgentRun(agent);
  }
};

// Serve dashboard.html at root
app.get('/', (req: any, res: any) => {
  const filePath = path.join(__dirname, 'dashboard.html');
  fs.readFile(filePath, 'utf8', (err: any, data: string) => {
    if (err) {
      res.status(500).send('Dashboard not found');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/agents', (req: any, res: any) => {
  const agentList = getAgentList();
  res.json(agentList);
  broadcastUpdate();
});

app.get('/analytics', (req: any, res: any) => {
  const analytics = getAnalytics();
  res.json(analytics);
  broadcastUpdate();
});

app.get('/history', (req: any, res: any) => {
  if (!fs.existsSync(HISTORY_FILE)) return res.json([]);
  const lines = fs
    .readFileSync(HISTORY_FILE, 'utf8')
    .split('\n')
    .filter(Boolean);
  const entries = lines
    .map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  res.json(entries);
});

wss.on('connection', (ws: any) => {
  ws.send(
    JSON.stringify({
      agents: getAgentList(),
      analytics: getAnalytics(),
    }),
  );
});

server.listen(port, () => {
  console.log(`Dashboard server listening at http://localhost:${port}`);
});
