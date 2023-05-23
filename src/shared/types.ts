export type Channels = 'ipc-example' | 'get-secrets' | 'open-ai'
export type Commands = 'chat' | 'completion'

export type ChatCompletionMessageRoles = 'user' | 'assistant' | 'system'

export interface ConversationType {
  role: ChatCompletionMessageRoles
  content: string
}

export interface SettingsType {
  openai: any
}
export interface ChatSubmissionType {
  prompt: string
}

export type SubmissionValues = ChatSubmissionType | ChatSubmissionType


export interface CreateChatCompletion{ 
  model: string,
  messages: ConversationType[],
  temperature: number,
}