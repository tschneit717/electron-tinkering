import { type ElectronHandler } from 'main/preload'
import { AI_CONFIG } from 'shared/config'
import { type ConversationType } from 'shared/types'

export default class OpenAIClient {
  handler: ElectronHandler

  constructor(handler: ElectronHandler) {
    this.handler = handler
    
  }
  
  private initialize = (prompt: string, activeConversation: ConversationType[]) => {
    const response = this.makeRequest('init', prompt, activeConversation)
    return response
  }
  
  async create(activeConversation: ConversationType[]) {
    const res = await this.initialize(AI_CONFIG.initial_prompt, activeConversation)
    return res
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
