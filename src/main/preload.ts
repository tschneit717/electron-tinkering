// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import { type Channels } from 'shared/types'

const electronHandler = {
  ipcRenderer: {
    async invoke(channel: Channels, args: unknown[]) {
      return await ipcRenderer.invoke(channel, args).then(res => res)
    },
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args)
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]): void => { func(...args) }
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => { func(...args) })
    }
  }
}

contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
