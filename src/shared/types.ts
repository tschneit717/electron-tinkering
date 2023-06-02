export type Channels = 'ipc-example' | 'get-secrets' | 'open-ai' | 'character'
export type Commands = 'chat' | 'completion'

export type ChatCompletionMessageRoles = 'user' | 'assistant' | 'system'

export interface ConversationType {
  role: ChatCompletionMessageRoles
  content: string
}

export enum BUTTON_ELEMENT_TYPES {
  BUTTON = 'button',
  INPUT = 'input',
  A = 'a'
}

export enum BUTTON_TYPES {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  DISABLED = 'disabled',
  DARK = 'dark',
  STANDARD = 'standard',
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
