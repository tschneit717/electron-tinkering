export type Channels = 'ipc-example' | 'get-secrets' | 'open-ai'
export type Commands = 'chat' | 'completion'
export interface ConversationType {
  role: 'assistant' | 'user' | 'system'
  content: string
}

export interface SettingsType {
  openai: any
}

export interface SubmissionValues {
  prompt: string;
}