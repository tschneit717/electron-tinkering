import { type PropsWithChildren, createContext, useState } from 'react'
import OpenAIClient from 'renderer/api/OpenAIClient'
import { type ConversationType } from 'shared/types'

export const OpenAiContext = createContext({
  openAiClient: new OpenAIClient(window.electron),
  activeConversation: [] as ConversationType[],
  setActiveConversation: (conversation: ConversationType[]) => {}
})

export const OpenAiProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const electron = window.electron
  const openAi = new OpenAIClient(electron)
  const [activeConversation, setActiveConversation] = useState<ConversationType[]>([])
  const values = {
    openAiClient: openAi,
    activeConversation,
    setActiveConversation
  }
  return (
    <OpenAiContext.Provider value={values}>
      {children}
    </OpenAiContext.Provider>
  )
}
