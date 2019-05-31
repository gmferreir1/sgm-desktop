import { app, BrowserWindow, ipcMain, Menu, shell } from "electron";
const PDFWindow = require("electron-pdf-window");
const ipc = require("electron").ipcRenderer;
const path = require("path");
const { download } = require("electron-dl");
const log = require("electron-log");

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    width: 1000,
    useContentSize: true,
    fullscreen: false,
    icon: path.join(__dirname, "../renderer/assets/icons/64x64.png"),
    /*
    webPreferences: {
      devTools: process.env.NODE_ENV === "development" ? true : false
    }
    */
  });

  mainWindow.maximize();
  mainWindow.loadURL(winURL);
  mainWindow.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  require("../renderer/electronApp/menu");

  mainWindow.setMenuBarVisibility(false);

  ipcMain.on("printPdf", async (event, dataPrint) => {
    if (!dataPrint.file_type || dataPrint.file_type === "pdf") {
      const win = new PDFWindow({
        width: 1024,
        height: 768
      });

      win.loadURL(dataPrint.url);
      return;
    }

    if (dataPrint.file_type === "word") {
      const win = BrowserWindow.getFocusedWindow();
      return await download(win, dataPrint.url, { saveAs: true });
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    mainWindow.webContents.send("clearLocalStorage");
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from "electron-updater";

ipcMain.on("checkUpdates", (event, data) => {
  autoUpdater.on("error", () => {
    event.sender.send("updateError");
  });

  autoUpdater.on("update-not-available", () => {
    event.sender.send("updateNotAvailable");
  });

  autoUpdater.on("update-available", () => {
    event.sender.send("updateAvailable");
  });

  autoUpdater.on("download-progress", progressObj => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";

    log.info(JSON.stringify(progressObj));
    event.sender.send("downloadProgress", log_message);
  });

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });

  /** se demorar disparar algum evento ele dispara este para a mensagem
   *  não ficar aparecendo para o usuário
   *  */
  setTimeout(() => {
    event.sender.send("updateNotAvailable");
  }, 4000);
});

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

if (process.env.NODE_ENV === "production") {
  //autoUpdater.updateConfigPath = path.join("/home/guilherme/Programing/mwd-restaurant/electron/app-update.yml");
  autoUpdater.checkForUpdates();
}
