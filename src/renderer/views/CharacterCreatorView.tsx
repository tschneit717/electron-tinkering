import { FormEvent, useContext, useEffect } from "react";
import { Form } from "renderer/components/Form";
import Layout from "renderer/components/Layout/Layout";
import { CharacterContext } from "renderer/context/characterContext";


// name: string
// level: number
// class: CharacterClassesEnum
// currentHitpoints: number
// maxHitpoints: number
// gold: number
// inventory: InventoryItem[]

export default function CharacterView(): JSX.Element {
  const characterContext = useContext(CharacterContext)
  const { character, setCharacter } = characterContext
  
  const characterFields = [
    {
      label: "Name",
      name: "name"
    },
    {
      label: "Class",
      name: "class",
      type: "select",
      selectFields: [
        'Fighter',
        'Wizard',
        'Rogue',
        'Cleric',
        'Ranger',
        'Paladin',
        'Druid',
        'Monk',
        'Bard',
        'Barbarian',
      ]
    }
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>, values: any) => {
    e.preventDefault()

    setCharacter({
      name: values.name,
      class: values.class,
      level: 1,
      currentHitpoints: 10,
      maxHitpoints: 10,
      gold: 0,
      inventory: []
    })
  }

  useEffect(() => {
    console.log(character)
  }, [character])

  return (
    <Layout title={"Chat Adventures"}>
      {!character ? (
        <>
          <h1>Create a character</h1>
          <Form
            formElements={characterFields}
            handleSubmit={handleSubmit}/>
        </>
      ) : <p>{character.name}</p>}
    </Layout>
  )
}
