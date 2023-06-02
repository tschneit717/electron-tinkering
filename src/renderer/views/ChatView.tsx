import { FormEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Conversation } from "renderer/components/Conversation"
import { Form } from "renderer/components/Form"
import { FormElement } from "renderer/components/Form/Form.interface"
import Layout from "renderer/components/Layout/Layout"
import { CharacterContext } from "renderer/context/characterContext"
import { ViewContext } from "renderer/context/viewContext"
import { useAIChat } from "renderer/hooks/useAIChat"
import { getRandomInt } from "renderer/utilities/getRandomNumbers"
import { BUTTON_TYPES, ChatSubmissionType } from "shared/types"

export default function ChatView(): JSX.Element {
  const viewContext = useContext(ViewContext)
  const { isDark } = viewContext
  const characterContext = useContext(CharacterContext)
  const { character } = characterContext

  if (!character) {
    return (
      <Layout title={"Chat Adventures"}>
        <div className={`nes-container is-rounded ${isDark ? 'is-dark' : ''}`}>
          <p className="title">You need to create a character first!</p>
          <Link to="/character" className="nes-btn is-primary">Create Character</Link>
        </div>
      </Layout>
    )
  }

  const [messages, addMessage] = useAIChat()
  const [progress, setProgress] = useState(0)

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

  const formElements: FormElement[] = [
    {
      label: "Write your prompt here",
      name: "prompt",
      type: "textarea"
    }
  ]

  const formButtons = [
    {
      label: 'Info',
      callback: (e: SyntheticEvent<Element, Event>, values: ChatSubmissionType): void => {
        addMessage('info', values.prompt)
      },
      type: BUTTON_TYPES.STANDARD,
    },
    {
      label: 'Take an Action',
      callback: (e: SyntheticEvent<Element, Event>, values: ChatSubmissionType): void => {
        addMessage('action', values.prompt)
      },
      type: BUTTON_TYPES.PRIMARY,
    },
    {
      label: 'Talk',
      callback: (e: SyntheticEvent<Element, Event>, values: ChatSubmissionType): void => {
        addMessage('talking', values.prompt)
      },
      type: BUTTON_TYPES.SUCCESS,
    },
    {
      label: 'Attack',
      callback: (e: SyntheticEvent<Element, Event>, values: ChatSubmissionType): void => {
        addMessage('attacking', values.prompt)
      },
      type: BUTTON_TYPES.ERROR,
    },
    {
      label: 'Examine',
      callback: (e: SyntheticEvent<Element, Event>, values: ChatSubmissionType): void => {
        addMessage('examining', values.prompt)
      },
      type: BUTTON_TYPES.WARNING,
    }
  ]

  return (
    <Layout title={"Chat Adventures"}>  
      <section className={`nes-container mb-4 ${isDark ? 'is-dark' : ''}`}>
        <section className="message-list">
          {renderChat()}
        </section>
      </section>
      <Form
        formElements={formElements}
        formButtons={formButtons}
      />
    </Layout>
  )
}