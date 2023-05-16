import { ElectronHandler } from "main/preload";
import { PropsWithChildren, createContext, useState, Dispatch, SetStateAction } from "react";
import { SettingsType } from "shared/types";


interface SettingsContextType {
  electron: ElectronHandler,
  settings: SettingsType,
  setSettings: Dispatch<SetStateAction<SettingsType>>
}

export const SettingsContext = createContext<SettingsContextType>({
  electron: window.electron,
  settings: { openai: {} },
  setSettings: () => void {}
})

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const electron = window.electron
  const [settings, setSettings] = useState<SettingsType>({
    openai: {}
  })

  const values = {
    settings,
    electron,
    setSettings
  }

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}
