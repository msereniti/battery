const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 350, height: 600, frame: false, title: 'Battery', backgroundColor: '#607D8B', transparent: true, resizable: false})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'render/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})