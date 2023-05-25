import { PropsWithChildren, createContext, useState } from "react"
import { CharacterType } from "shared/character"

interface CharacterContextType {
  character?: CharacterType | null
  setCharacter?: (character: CharacterType) => void
}

export const CharacterContext = createContext<CharacterContextType>({
  character: null,
  setCharacter: () => void 0
})

export const CharacterContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [character, setCharacter] = useState<CharacterType | null>(null)

  const values = {
    character,
    setCharacter
  }
  return (
    <CharacterContext.Provider value={values}>
      {children}
    </CharacterContext.Provider>
  )
}