import { type PropsWithChildren, createContext, useState } from 'react'
import OpenAIClient from 'renderer/api/OpenAIClient'

export const OpenAiContext = createContext({})

export const OpenAiProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [openAi, setOpenAi] = useState<OpenAIClient | null>(null)

  async function buildAiClient(): Promise<void> {
    const electron = window.electron
    const secrets = await electron.ipcRenderer.invoke('get-secrets', []) ?? {}
    const openAIClient = new OpenAIClient(secrets.OPENAI_API_KEY)
    setOpenAi(openAIClient)
  }

  if (!openAi) {
    void buildAiClient()
  }

  const values = {
    openAiClient: openAi
  }
  return (
    <OpenAiContext.Provider value={values}>
      {children}
    </OpenAiContext.Provider>
  )
}
