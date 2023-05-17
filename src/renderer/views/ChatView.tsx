import { FormEvent, useContext, useEffect, useState } from "react"
import { Conversation } from "renderer/components/Conversation"
import { Form } from "renderer/components/Form"
import Layout from "renderer/components/Layout/Layout"
import { OpenAiContext } from "renderer/context/openAI"
import { ConversationType, SubmissionValues } from "shared/types"

export default function ChatView(): JSX.Element {
  const { openAiClient, setActiveConversation, initializeBot } = useContext(OpenAiContext)
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>, values: SubmissionValues): Promise<void> => {
    e.preventDefault()
    try {
      setConversations([...conversations, {
        role: 'user',
        content: values.prompt
      }])
      const resp = await openAiClient.getCompletion(values.prompt, conversations)
      setConversations(conversations => [...conversations, resp])
    } catch (e) {
      console.error(e)
    }
  }
  const handleResetConversation = (): void => {
    try {
      setConversations([])
      setActiveConversation([])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await initializeBot()
      if (res) {
        setConversations([res])
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [conversations])

  return (
    <Layout title={"Chat Adventures"}>
      <section className="nes-container mb-4">
        <section className="message-list">
          {conversations.length > 0
            ? conversations.map((conversation, index) => {
              console.log(conversation)
              return (<Conversation key={conversation.content} content={conversation.content} role={conversation.role}></Conversation>)
            })
            : <></>}
        </section>
      </section>
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