// preload.js
const { contextBridge, ipcRenderer } = require("electron");

// API sicure esposte al renderer
contextBridge.exposeInMainWorld("electronAPI", {
  ping: () => ipcRenderer.invoke("ping"),
});
