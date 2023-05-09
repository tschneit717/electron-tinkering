import config from 'dotenv'
import { type IpcMainInvokeEvent } from 'electron'

export function getSecrets(e: IpcMainInvokeEvent): object | undefined {
  console.log(e)
  return config.config()?.parsed
}
