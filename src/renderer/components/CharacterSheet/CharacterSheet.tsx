import { useContext } from "react"
import { CharacterContext } from "renderer/context/characterContext"

export default function CharacterSheet () {
  const characterContext = useContext(CharacterContext)
  const { character } = characterContext
  return (
    <div>
      <h1>Character Sheet</h1>
      
    </div>
  )
}