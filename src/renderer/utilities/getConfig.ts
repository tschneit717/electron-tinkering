function getConfig(): object {
  const { ipcRenderer } = window.require('electron')
  let config = {}
  ipcRenderer.on('get-env-reply', (event, arg) => {
    // The dotenv config object should return an object with
    // another object inside caled "parsed". Change this if need be.
    console.log(arg)
    config = arg.parsed
  })
  ipcRenderer.send('get-env')

  return config
}

export default getConfig
