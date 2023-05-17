import { MemoryRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { OpenAiProvider } from './context/openAI'
import ChatView from './views/ChatView'
import { SettingsProvider } from './context/settingsContext'
import './assets/fonts/PressStart2P-Regular.ttf'

const routes = [
  {
    path: '/',
    component: <ChatView/>
  },
  {
    path: '/settings',
    component: <h1>Settings</h1>
  }
]

export default function App(): JSX.Element {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route path={path} element={component}></Route>
  ))
  return (
    <SettingsProvider>
      <OpenAiProvider>
        <Router>
          <Routes>{routeComponents}</Routes>
        </Router>
      </OpenAiProvider>
    </SettingsProvider>
  )
}
