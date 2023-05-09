import { type ElectronHandler } from 'main/preload'
import { type ConversationType } from 'shared/types'

export default class OpenAIClient {
  handler: ElectronHandler

  constructor(handler: ElectronHandler) {
    this.handler = handler
  }

  async getCompletion(prompt: string): Promise<ConversationType> {
    const response = await this.makeRequest('chat', prompt)
    return response
  }

  async makeRequest (path: string, prompt: string): Promise<ConversationType> {
    const res = await this.handler.ipcRenderer.invoke('open-ai', [path, prompt])
    return res
  }
}
