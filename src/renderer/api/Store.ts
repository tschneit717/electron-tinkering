import { ElectronHandler } from "main/preload"

export default class Store {
  handler: ElectronHandler

  constructor(handler: ElectronHandler) {
    this.handler = handler
    
  }

  makeRequest(command: string, key: string, value?: string | object) {
    return this.handler.ipcRenderer.invoke('character', [command, key, value])
  }
  
  async get(key: string) {
    const data = await this.makeRequest('get', key)
    console.log(data)
    return data
  }
  
  async set(key: string, value: string | object) {
    const data = await this.makeRequest('set', key, value)
    console.log(data)
    return data
  }

  async delete(key: string) {
    return await this.makeRequest('deleteKey', key)
  }
}