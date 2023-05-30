import { FormEvent, useContext } from "react";
import Store from "renderer/api/Store";
import { CharacterSheet } from "renderer/components/CharacterSheet";
import { Form } from "renderer/components/Form";
import { FormElement } from "renderer/components/Form/Form.interface";
import Layout from "renderer/components/Layout/Layout";
import { CharacterContext } from "renderer/context/characterContext";

export default function CharacterView(): JSX.Element {
  const store = new Store(window.electron);
  const characterContext = useContext(CharacterContext)
  const { character, setCharacter } = characterContext
  
  const characterFields = [
    {
      label: "Name",
      name: "name"
    },
    {
      label: "Race",
      name: "race",
      type: "select",
      selectFields: [
        'Human',
        'Elf',
        'Dwarf',
        'Halfling',
        'Gnome',
        'Half-Elf',
        'Half-Orc',
        'Dragonborn',
        'Tiefling'
      ]
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
    const char = {
      name: values.name,
      class: values.class,
      race: values.race,
      level: 1,
      currentHitpoints: 10,
      maxHitpoints: 10,
      gold: 0,
      inventory: []
    }
    setCharacter(char)

    store.set('character', char)
  }

  const handlePreviousSave = async () => {
    const char = await store.get('character')
    setCharacter(char)
  }

  return (
    <Layout title={"Chat Adventures"}>
      {!character ? (
        <>
          <h1>Create a character</h1>
          <Form
            submitButtonLabel="Create"
            formElements={characterFields as FormElement[]}
            handleSubmit={handleSubmit}/>
          <h2>Or load a previous save: </h2>
          <button className="nes-btn is-primary" onClick={handlePreviousSave}>Load</button>
        </>
      ) : <CharacterSheet/>}
    </Layout>
  )
}
