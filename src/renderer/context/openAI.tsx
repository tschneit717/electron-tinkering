import { type PropsWithChildren, createContext, useState, type Dispatch, type SetStateAction, useContext } from 'react'
import OpenAIClient from 'renderer/api/OpenAIClient'
import { type ConversationType } from 'shared/types'
import { SettingsContext } from './settingsContext'

interface OpenAiContextType {
  openAiClient: OpenAIClient,
  activeConversation: ConversationType[],
  setActiveConversation: Dispatch<SetStateAction<ConversationType[]>>
  initializeBot: (() => Promise<ConversationType>) | (() => void)
}

export const OpenAiContext = createContext<OpenAiContextType>({
  initializeBot: () => void 0,
  openAiClient: new OpenAIClient(window.electron),
  activeConversation: [],
  setActiveConversation: () => void 0
})

export const OpenAiProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const settingsContext = useContext(SettingsContext);
  const { electron } = settingsContext
  const openAi = new OpenAIClient(electron)
  
  const [activeConversation, setActiveConversation] = useState<ConversationType[]>([])
  
  const initializeBot = async () => {
    try {
      const res = await openAi.create(activeConversation)
      setActiveConversation([res])
      return res
    } catch (e: unknown) {
      console.error(e)
      throw new Error(e as string);
    }
  }
  
  const values = {
    initializeBot,
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
