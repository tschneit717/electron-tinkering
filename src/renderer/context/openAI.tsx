import { type PropsWithChildren, createContext, useState, type Dispatch, type SetStateAction } from 'react'
import OpenAIClient from 'renderer/api/OpenAIClient'
import { type ConversationType } from 'shared/types'

interface OpenAiContextType {
  openAiClient: OpenAIClient,
  activeConversation: ConversationType[],
  setActiveConversation: Dispatch<SetStateAction<ConversationType[]>>
}

export const OpenAiContext = createContext<OpenAiContextType>({
  openAiClient: new OpenAIClient(window.electron),
  activeConversation: [],
  setActiveConversation: () => void 0
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
