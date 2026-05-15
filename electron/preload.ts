import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (settings: unknown) => ipcRenderer.invoke('settings:set', settings),
  getStats: () => ipcRenderer.invoke('stats:get'),
  addPomodoro: (minutes: number) => ipcRenderer.invoke('stats:addPomodoro', minutes),
  updateTitle: (text: string) => ipcRenderer.send('title:update', text),
  showNotification: (title: string, body: string) =>
    ipcRenderer.send('notification:show', title, body),
})
