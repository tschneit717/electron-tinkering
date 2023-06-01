import { set } from "date-fns"
import { PropsWithChildren, createContext, useEffect, useState } from "react"
import Store from "renderer/api/Store"
import { CharacterType, InventoryItem } from "shared/character"

interface CharacterContextType {
  character?: CharacterType | null
  setCharacter: (character: CharacterType) => void
  levelUp: () => void
  updateHitPoints: (newVal: number) => void
  updateInventory: (newVal: InventoryItem[]) => void
  updateGold: (newVal: number) => void
}

export const CharacterContext = createContext<CharacterContextType>({
  character: null,
  setCharacter: () => void 0,
  levelUp: () => void 0,
  updateHitPoints: () => void 0,
  updateInventory: () => void 0,
  updateGold: () => void 0
})

export const CharacterContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [status, setStatus] = useState<string>('alive')
  const store = new Store(window.electron);
  const [character, setCharacter] = useState<CharacterType | null>(null)

  const levelUp = async () => {
    if (!character) return
    const newLevel = character.level + 1
    setCharacter({...character, level: newLevel})
    await store.set('character', {...character, level: newLevel})
  }
  
  const updateHitPoints = async (newVal: number) => {
    if (!character) return
    if (newVal > character.maxHitpoints) return
    setCharacter({...character, currentHitpoints: newVal})
    await store.set('character', {...character, currentHitpoints: newVal})
  }

  const updateInventory = (newItem: InventoryItem) => {
    if (!character) return
    const foundItem = character.inventory.find((item) => {
      if (item.name === newItem.name) {
        if (item.quantity && newItem.quantity) {
          item.quantity += newItem.quantity
        } else if (item.quantity && !newItem.quantity) {
          item.quantity += 1
        } else {
          item.quantity = 1
        }
        return item
      }
    }) 
    if (!foundItem) {
      character.inventory.push(newItem)
    }
  }

  const updateGold = (amount: number) => {
    if (!character) return
    setCharacter({...character, gold: character.gold + amount})
    store.set('character', {...character, gold: character.gold + amount})
  }

  useEffect(() => {
    if (character?.currentHitpoints === 0) {
      setStatus('dead')
    }
  }, [character])

  const values = {
    character,
    setCharacter,
    levelUp,
    updateHitPoints,
    updateInventory,
    updateGold,
    status
  }

  return (
    <CharacterContext.Provider value={values}>
      {children}
    </CharacterContext.Provider>
  )
}