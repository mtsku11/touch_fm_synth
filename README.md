# Touch-Controlled FM Synth (Web-Based)

This project is a browser-based FM synthesizer that can be controlled from any device using a touch interface. It uses WebSockets to connect a controller (e.g., a mobile phone) to the synth running in a browser on a desktop.

## 🎛 Project Structure

```
touch-synth/
├── server.js               # Node.js WebSocket relay + static file server
├── package.json            # Dependencies: express, ws
└── public/
    ├── synth.html          # FM synth controlled by WebSocket
    ├── controller.html     # Touch XY pad controller with multitouch
    └── js/
        └── csound.js       # Csound WebAssembly module (add manually)
```

---

## 🚀 Quick Start (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Run the WebSocket + static file server

```bash
node server.js
```

### 3. Open in your browser

- On your **desktop**:  
  `http://localhost:8080/fm-synth-with-start.html`

- On your **phone (same Wi-Fi)**:  
  `http://<your-computer-ip>:8080/fm-controller.html`

---

## 🌐 Hosting

### ✅ Frontend (Static Files) — Recommended: **Netlify**

1. Push `/public` folder to GitHub
2. Link repo to [https://www.netlify.com/](https://www.netlify.com/)
3. Set build = `none`, publish = `public/`

### ✅ Backend (WebSocket Server) — Recommended: **Render**

1. Push full project (including `server.js`) to GitHub
2. Go to [https://render.com/](https://render.com/)
3. Create a new **Web Service**
4. Select your GitHub repo
5. Start command: `node server.js`

---

## 🧠 Notes

- WebSocket URL should remain:  
  `ws://your-domain:8080`  
  or use `wss://` if deploying secure WebSocket relay

- Csound WebAssembly files (`csound.js`, `csound.wasm`) must be placed in `/public/js/` before deployment

---

## 👋 Credits

Built with ❤️ using:
- Csound
- Web Audio API
- Express + WebSockets