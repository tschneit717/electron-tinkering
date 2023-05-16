import { type ElectronHandler } from 'main/preload'
import { type ConversationType } from 'shared/types'

export default class OpenAIClient {
  handler: ElectronHandler

  constructor(handler: ElectronHandler) {
    this.handler = handler
  }

  async getCompletion(prompt: string, activeConversation: ConversationType[]): Promise<ConversationType> {
    const response = await this.makeRequest('chat', prompt, activeConversation)
    return response
  }

  async makeRequest (path: string, prompt: string, activeConversation: ConversationType[]): Promise<ConversationType> {
    const res = await this.handler.ipcRenderer.invoke('open-ai', [path, prompt, activeConversation])
    return res
  }
}
