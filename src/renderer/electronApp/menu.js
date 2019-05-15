import { Menu, app, BrowserWindow, ipcMain } from "electron";

const template = [
  {
    role: "help",
    label: "Arquivo",
    submenu: [
      {
        label: "Fechar Janela",
        click() {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          focusedWindow.webContents.send("clearLocalStorage");
          app.quit();
        }
      }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }]
  },
  {
    role: "help",
    label: "Ajuda",
    submenu: [
      {
        label: "Sobre o Sistema"
      }
    ]
  }
];

/*
ipcMain.on('init', (event, data) => {
  const template = [
    {
      role: "help",
      label: "Arquivo",
      submenu: [
        {
          label: "Logout",
          click() {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send("logout");
          }
        },
        {
          label: "Fechar Janela",
          click() {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send("clearLocalStorage");
            app.quit();
          }
        }
      ]
    },
    {
      role: "window",
      submenu: [{ role: "minimize" }]
    },
    {
      role: "help",
      label: "Ajuda",
      submenu: [
        {
          label: "Sobre o Sistema"
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
})
*/
const menu = Menu.buildFromTemplate(template);
//Menu.setApplicationMenu(null);
