import { MemoryRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { OpenAiProvider } from './context/openAI'
import ChatView from './views/ChatView'
import { SettingsProvider } from './context/settingsContext'
import './assets/fonts/PressStart2P-Regular.ttf'
import CharacterView from './views/CharacterCreatorView'
import SettingsView from './views/SettingsView'
import { CharacterContextProvider } from './context/characterContext'
import StartView from './views/StartView'
import { ViewContextProvider } from './context/viewContext'
const routes = [
  {
    path: '/',
    component: <StartView/>
  },
  {
    path: '/play',
    component: <ChatView/>
  },
  {
    path: '/character',
    component: <CharacterView/>
  },
  {
    path: '/settings',
    component: <SettingsView/>
  }
]

export default function App(): JSX.Element {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route key={path} path={path} element={component}></Route>
  ))
  return (
    <ViewContextProvider>
      <CharacterContextProvider>
        <SettingsProvider>
          <OpenAiProvider>
            <Router>
              <Routes>{routeComponents}</Routes>
            </Router>
          </OpenAiProvider>
        </SettingsProvider>
      </CharacterContextProvider>
    </ViewContextProvider>
  )
}
