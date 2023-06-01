export type Channels = 'ipc-example' | 'get-secrets' | 'open-ai' | 'character'
export type Commands = 'chat' | 'completion'

export type ChatCompletionMessageRoles = 'user' | 'assistant' | 'system'

export interface ConversationType {
  role: ChatCompletionMessageRoles
  content: string
}

export interface SettingsType {
  openai: unknown
}
export interface ChatSubmissionType {
  prompt: string
}

export type SubmissionValues = ChatSubmissionType | ChatSubmissionType


export interface CreateChatCompletion { 
  model: string,
  messages: ConversationType[],
  temperature: number,
}

export const ChatCompletionResponseSample =  {
  action: {
    type: 'level up' || 'update health' || 'update gold' || 'update inventory' || 'update character' || 'game over' || 'dialogue' || 'information' || 'story update',
    data: 'string' || 'number' || 'object' || 'boolean' || 'undefined'
  }, 
  message: 'string'
}