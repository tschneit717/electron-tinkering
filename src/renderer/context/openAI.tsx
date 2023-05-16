import { type PropsWithChildren, createContext, useState, type Dispatch, type SetStateAction, useContext } from 'react'
import OpenAIClient from 'renderer/api/OpenAIClient'
import { type ConversationType } from 'shared/types'
import { SettingsContext } from './settingsContext'

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
  const settingsContext = useContext(SettingsContext);
  const { electron } = settingsContext
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
