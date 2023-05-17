import config from 'dotenv'
import { type IpcMainInvokeEvent } from 'electron'

export function getSecrets(e: IpcMainInvokeEvent): object | undefined {
  return config.config()?.parsed
}
