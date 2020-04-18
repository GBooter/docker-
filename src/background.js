'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
import setIPCMain from './js/setIPCMain'
const isDevelopment = app.isPackaged

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    title: 'HK工具箱',
    center: true,
    width: 1010,
    height: 600,
    minWidth: 1010,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  /** 导入IPCMain配置文件 */
  setIPCMain()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
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
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    if (!isDevelopment) {
      /** 新增的：安装vue-devtools */
      BrowserWindow.addDevToolsExtension('/media/kangert/Data/DevelopmentCode/Web/vue-devtools/packages/shell-chrome')
    } else {
      const electron = require('electron')
      /** 获取electron窗体的菜单栏以及devtools 亲测 */
      const Menu = electron.Menu
      /** 隐藏electron创听的菜单栏 */
      Menu.setApplicationMenu(null)
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
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
