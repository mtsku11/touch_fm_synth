const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let synthClient = null;

wss.on('connection', ws => {
  console.log("🔌 Client connected");

  ws.on('message', msg => {
    const data = JSON.parse(msg);

    if (data.type === 'register' && data.role === 'synth') {
      synthClient = ws;
      console.log("🎛️ Synth registered");
    } else if (data.type === 'touch' && synthClient) {
      synthClient.send(JSON.stringify(data));
      console.log("🟢 Forwarded touch:", data);
    }
  });

  ws.on('close', () => {
    if (ws === synthClient) synthClient = null;
    console.log("❌ Client disconnected");
  });
});

app.use(express.static('public'));

server.listen(8080, () => {
  console.log("🚀 WebSocket relay + static server running at http://localhost:8080");
});