import { useContext } from "react"
import { Link } from "react-router-dom"
import { CharacterContext } from "renderer/context/characterContext"
import { ViewContext } from "renderer/context/viewContext"

export default function CharacterSheet () {
  const viewContext = useContext(ViewContext)
  const { isDark } = viewContext
  const characterContext = useContext(CharacterContext)
  const { character } = characterContext
  const { name, level, race, class: classType, currentHitpoints, maxHitpoints, gold, inventory } = character || {}
  if (!character) return (<div>No character found</div>)
  console.log(currentHitpoints)
  return (
    <div>
      <h1>Character Sheet</h1>
      <div className={`nes-container with-title is-centered ${isDark ? 'is-dark': ''}`}>
        <p className="title">{name}</p>
        <div className="flex flex-wrap justify-between">
          <div className="lists text-left pl-6 mt-4 mb-4">
            <ul className="nes-list is-disc ">
              <li>Level: {level}</li>
              <li>Race: {race}</li>
              <li>Class: {classType}</li>
            </ul>
          </div>
          <div className={`nes-container w-auto mb-4 ${isDark ? 'is-dark': ''}`}>
            <p>HP: <span className="nes-text is-error">{`${currentHitpoints}`}/{`${maxHitpoints}`}</span></p>
          </div>
          <div className={`nes-container with-title w-full ${isDark ? 'is-dark': ''}`}>
            <p className="title">Inventory</p>
            <ul className="nes-list is-disc pl-6 flex align-start flex-wrap flex-col text-left max-h-96">
              <li>Gold: {gold}</li>
              {inventory ? inventory.map((item) => {
                const capitalize = (s: string) => {
                  if (typeof s !== 'string') return ''
                  return s.charAt(0).toUpperCase() + s.slice(1)
                }
                if (item.name === 'gold') return (<></>)
                if (item.name || item.item) return (
                  <li key={item.name ?? item.item}>{capitalize(item.name || item.item || '')} x {item.quantity}</li>
                ) 
              }) : <></>}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>Let's Play!</h2>
        <Link className="nes-btn is-primary" to="/play">Start Game</Link>
      </div>
    </div>
  )
}