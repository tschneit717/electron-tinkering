import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import './App.css'
import { Button } from './components/Button'
import { type FormEvent, useContext, useState } from 'react'
import { OpenAiContext, OpenAiProvider } from './context/openAI'
import { type ConversationType } from 'shared/types'

function Hello(): JSX.Element {
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
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <input value={prompt} onChange={(e) => { setPrompt(e.target.value) }}></input>
      <form onSubmit={handleSubmit} className="Hello">
        <Button text={'Submit'} type={'submit'}/>
        <Button text={'Reset'} type={'button'} callback={handleResetConversation}/>
      </form>
      {conversations.length > 0
        ? conversations.map((conversation, index) => {
          console.log(conversation)
          return (<div key={conversation.content}>{conversation.content}</div>)
        })
        : <></>}
    </div>
  )
}

export default function App(): JSX.Element {
  return (
    <OpenAiProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </OpenAiProvider>
  )
}
