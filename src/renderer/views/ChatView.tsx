import { FormEvent, useEffect, useState } from "react"
import { Conversation } from "renderer/components/Conversation"
import { Form } from "renderer/components/Form"
import Layout from "renderer/components/Layout/Layout"
import { useAIChat } from "renderer/hooks/useAIChat"
import { getRandomInt } from "renderer/utilities/getRandomNumbers"
import { ChatSubmissionType } from "shared/types"

export default function ChatView(): JSX.Element {
  const [messages, addMessage, reset] = useAIChat()
  const [progress, setProgress] = useState(0)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>, values: ChatSubmissionType): Promise<void> => {
    e.preventDefault()
    try {
      await addMessage(values.prompt)
    } catch (e) {
      console.error(e)
    }
  }
  const handleResetConversation = (): void => {
    try {
      reset()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages])
  

  useEffect(() => {
    if (messages && messages.length > 1) {
      return 
    }
    else {
      setTimeout(() => {
        const newValue = progress + getRandomInt(0, 40)
        if (progress > 100) return
        if (newValue < 90) {
          setProgress(newValue)
        } else {
          setProgress(progress + 1)
        }
      }, 500)
    }
  }, [messages, progress])

  const renderChat = () => {
    if (messages && messages.length > 1) {
      return messages.slice(1).map((conversation) => {
        return (<Conversation key={conversation.content} content={conversation.content} role={conversation.role}></Conversation>)
      })
    } else {
      return (<progress className="nes-progress is-success" value={progress} max="100"></progress>)
    }
  }

  return (
    <Layout title={"Chat Adventures"}>
      <section className="nes-container mb-4">
        <section className="message-list">
          {renderChat()}
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