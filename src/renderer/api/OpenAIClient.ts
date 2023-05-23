import { type ElectronHandler } from 'main/preload'
import { AI_CONFIG } from 'shared/config'
import { CreateChatCompletion, type ConversationType } from 'shared/types'

export default class OpenAIClient {
  handler: ElectronHandler

  constructor(handler: ElectronHandler) {
    this.handler = handler
    
  }
  
  private initialize = (prompt: string, activeConversation: CreateChatCompletion) => {
    const response = this.makeRequest('init', prompt, activeConversation)
    return response
  }
  
  async create(config: CreateChatCompletion) {
    const res = await this.initialize(AI_CONFIG.initial_prompt, config)
    return res
  }

  async getCompletion(prompt: string, activeConversation: CreateChatCompletion): Promise<ConversationType> {
    const response = await this.makeRequest('chat', prompt, activeConversation)
    return response
  }

  async makeRequest (path: string, prompt: string, activeConversation: CreateChatCompletion): Promise<ConversationType> {
    const res = await this.handler.ipcRenderer.invoke('open-ai', [path, prompt, activeConversation])
    return res
  }
}
