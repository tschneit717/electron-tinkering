import { FormEvent, useContext, useState } from "react"
import { Conversation } from "renderer/components/Conversation"
import { Form } from "renderer/components/Form"
import { OpenAiContext } from "renderer/context/openAI"
import { ConversationType } from "shared/types"

export default function ChatView(): JSX.Element {
  const { openAiClient, setActiveConversation, activeConversation } = useContext(OpenAiContext)
  const [prompt, setPrompt] = useState<string>('')
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setActiveConversation([...activeConversation, {
        role: 'user',
        content: prompt
      }])
      const res = await openAiClient.getCompletion(prompt, activeConversation)
      setConversations([...conversations, res])
    } catch (e) {
      console.error(e)
    }
  }
  const handleResetConversation = (): void => {
    try {
      setPrompt('')
      setConversations([])
      setActiveConversation([])
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      <h1>Chat Adventures</h1>
      <Form 
        formElements={[{
          label: "Ask your question",
          name: "prompt"
        }]}
        handleSubmit={handleSubmit}
        handleReset={handleResetConversation}/>
      <section className="nes-container">
        <section className="message-list">
          {conversations.length > 0
            ? conversations.map((conversation, index) => {
              console.log(conversation)
              return (<Conversation key={conversation.content} content={conversation.content} role={conversation.role}></Conversation>)
            })
            : <></>}
        </section>
      </section>
    </div>
  )
}