const { app, BrowserWindow } = require('electron')
const path = require('path')
const { contextIsolated } = require('process')

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    minWidth: 140,
    minHeight: 163,
    icon: path.join(__dirname, 'CastorLogo.png'),
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolated: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})