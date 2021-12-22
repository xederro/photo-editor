'use strict'

import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const fs = require("fs");
const { dialog } = require('electron')
const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  registerLocalResourceProtocol()
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

ipcMain.on("selectPhoto", (event, args) => {
  fs.readFile("public/test.txt", (error, data) => {
    dialog.showOpenDialog({
      title: "Open Photo To Edit",
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ]
    }).then((files) => {
      if (!files.canceled){
        returnPaths(files);
      }
    })
  });
});

ipcMain.on("saveFile", (event, args) => {
  dialog.showSaveDialog({
    title: 'Save image',
    defaultPath: 'image.jpg'
  }).then((path) => {
    const base64Data = args.replace(/^data:image\/png;base64,/, "");
    if (!path.canceled){
      fs.writeFile(path.filePath, base64Data, 'base64', function (err) {
        if (err !== null) console.log(err);
      });
    }
  });

})

function returnPaths(files) {
  win.webContents.send("getPaths", files.filePaths[0]);
}

function registerLocalResourceProtocol() {
  protocol.registerFileProtocol('local-resource', (request, callback) => {
    const url = request.url.replace(/^local-resource:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      return callback(decodedUrl)
    } catch (error) {
      console.error('ERROR: registerLocalResourceProtocol: Could not get file path:', error)
    }
  })
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
