import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)
if (window.electron) {
  // calling IPC exposed from preload script
  window.electron.ipcRenderer.once('get-secrets', (arg) => {
    // eslint-disable-next-line no-console
    console.log(arg)
  })
  window.electron.ipcRenderer.sendMessage('get-secrets', ['ping'])
}
