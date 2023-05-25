import { useContext } from "react";
import { Form } from "renderer/components/Form";
import Layout from "renderer/components/Layout/Layout";
import { CharacterContext } from "renderer/context/characterContext";

export default function CharacterView(): JSX.Element {
  const characterContext = useContext(CharacterContext)
  const { character } = characterContext
  return (
    <Layout title={"Chat Adventures"}>
      
      <Form
        formElements={[{
          label: "Write your prompt here",
          name: "prompt"
        }]}
        handleSubmit={handleSubmit}
        handleReset={handleResetConversation}/>
    </Layout>
  )
}
