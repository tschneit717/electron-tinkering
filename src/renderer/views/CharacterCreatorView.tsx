import { FormEvent, SyntheticEvent, useContext, useState } from "react";
import Store from "renderer/api/Store";
import { CharacterSheet } from "renderer/components/CharacterSheet";
import { Form } from "renderer/components/Form";
import { FormElement } from "renderer/components/Form/Form.interface";
import Layout from "renderer/components/Layout/Layout";
import { CharacterContext } from "renderer/context/characterContext";
import { BUTTON_TYPES } from "shared/types";

export default function CharacterView(): JSX.Element {
  const [error, setError] = useState<string | undefined>(undefined);
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

  const handleSubmit = (e: SyntheticEvent<Element, Event>, values: any) => {
    e.preventDefault()
    try {
      const { name, class: charClass, race } = values
      if (!name || !charClass || !race) {
        throw new Error('Please fill out all fields')
      }
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
    catch (e: unknown) {
      console.error(e)
      setError((e as Error).message as string)
    }
  }

  const handlePreviousSave = async (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    const char = await store.get('character')
    setCharacter(char)
  }


  const formButtons = [
    {
      label: "Create",
      callback: handleSubmit,
      type: BUTTON_TYPES.SUCCESS
    },
    {
      label: "Load Previous Save",
      callback: handlePreviousSave,
      type: BUTTON_TYPES.PRIMARY
    }
  ]

  return (
    <Layout title={"Chat Adventures"}>
      {!character ? (
        <>
          <h1>Create a character</h1>
          <Form
            formElements={characterFields as FormElement[]}
            formButtons={formButtons}
            error={error}
          />
        </>
      ) : <CharacterSheet/>}
    </Layout>
  )
}
