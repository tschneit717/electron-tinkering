import { Form } from "renderer/components/Form";
import Layout from "renderer/components/Layout/Layout";

export default function SettingsView(): JSX.Element {
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
