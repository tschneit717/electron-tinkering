import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import './App.css'
import { Button } from './components/Button'
import OpenAIClient from './api/OpenAIClient'

function Hello(): JSX.Element {
  const electron = window.electron
  const openAIClient = new OpenAIClient(electron.ipcRenderer.envVariables)
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <Button text={'Hello world'} callback={async () => await openAIClient.getCompletion('Hi friend') }/>
      </div>
    </div>
  )
}

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  )
}
