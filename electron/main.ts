import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, Notification } from 'electron'
import { join } from 'path'
import { getSettings, setSettings, getStats, addPomodoro } from './store'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    frame: false,
    transparent: false,
    backgroundColor: '#1a1a2e',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: join(__dirname, '../public/icon.png'),
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('minimize', (event: Electron.Event) => {
    event.preventDefault()
    mainWindow?.hide()
  })

  mainWindow.on('close', () => {
    mainWindow = null
  })
}

function createTray() {
  const iconPath = join(__dirname, '../public/icon.png')
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon.resize({ width: 16, height: 16 }))
  tray.setToolTip('番茄钟')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click: () => {
        mainWindow?.show()
        mainWindow?.focus()
      },
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)

  tray.on('double-click', () => {
    mainWindow?.show()
    mainWindow?.focus()
  })
}

// IPC handlers
ipcMain.handle('settings:get', () => getSettings())
ipcMain.handle('settings:set', (_, settings) => setSettings(settings))
ipcMain.handle('stats:get', () => getStats())
ipcMain.handle('stats:addPomodoro', (_, minutes) => addPomodoro(minutes))

ipcMain.on('title:update', (_, text: string) => {
  mainWindow?.setTitle(text)
  tray?.setToolTip(text)
})

ipcMain.on('notification:show', (_, title: string, body: string) => {
  if (Notification.isSupported()) {
    new Notification({ title, body }).show()
  }
})

app.whenReady().then(() => {
  createWindow()
  createTray()

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
