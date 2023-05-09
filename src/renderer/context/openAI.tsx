import { type PropsWithChildren, createContext } from 'react'
import OpenAIClient from 'renderer/api/OpenAIClient'

export const OpenAiContext = createContext({
  openAiClient: new OpenAIClient(window.electron)
})

export const OpenAiProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const electron = window.electron
  const openAi = new OpenAIClient(electron)

  const values = {
    openAiClient: openAi
  }
  return (
    <OpenAiContext.Provider value={values}>
      {children}
    </OpenAiContext.Provider>
  )
}
