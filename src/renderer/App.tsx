import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import './App.css'
import { Button } from './components/Button'
import type OpenAIClient from './api/OpenAIClient'
import { useContext, useEffect, useState } from 'react'
import { OpenAiContext, OpenAiProvider } from './context/openAI'

function Hello(): JSX.Element {
  const openAiContext = useContext(OpenAiContext)
  const openAiClient = openAiContext.openAiClient || {}
  const [prompt, setPrompt] = useState<string>('')
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <input value={prompt} onChange={(e) => { setPrompt(e.target.value) }}></input>
      <div className="Hello">
        <Button text={'Hello world'} callback={async () => await openAiClient.getCompletion(prompt) }/>
      </div>
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
