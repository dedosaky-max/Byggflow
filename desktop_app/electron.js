// electron.js
const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

const isDev = !app.isPackaged;

let mainWindow;

/**
 * Crea la finestra principale
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    show: false, // mostriamo dopo il ready-to-show per evitare flicker
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    // In dev carichiamo Vite
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    // In produzione carichiamo il build statico
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/**
 * IPC di esempio (puoi estenderlo per parlare col backend)
 */
ipcMain.handle("ping", () => {
  return "pong";
});

/**
 * Lifecycle app
 */
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // Su macOS le app restano aperte finché l’utente non fa Cmd+Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
