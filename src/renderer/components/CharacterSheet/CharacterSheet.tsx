import { useContext } from "react"
import { CharacterContext } from "renderer/context/characterContext"

export default function CharacterSheet () {
  const characterContext = useContext(CharacterContext)
  const { character } = characterContext
  const { name, level, race, class: classType, currentHitpoints, maxHitpoints, gold, inventory } = character || {}
  if (!character) return (<div>No character found</div>)
  return (
    <div>
      <h1>Character Sheet</h1>
      <div className="nes-container with-title is-centered">
        <p className="title">{name}</p>
        <div className="flex flex-wrap justify-between">
          <div className="lists text-left pl-6 mt-4">
            <ul className="nes-list is-disc ">
              <li>Level: {level}</li>
              <li>Race: {race}</li>
              <li>Class: {classType}</li>
            </ul>
          </div>
          <div className="nes-container w-auto">
            <p>HP: <span className="nes-text is-error">{currentHitpoints}/{maxHitpoints}</span></p>
          </div>
          <div className="nes-container with-title w-full mt-4">
            <p className="title">Inventory</p>
            <ul className="nes-list is-disc pl-6 flex align-start flex-wrap max-h-96">
              <li>Gold: {gold}</li>
              {inventory ? inventory.map((item) => {
                return <li key={item.name}>{item.name} x {item.quantity}</li>
              }) : <></>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}