import {format} from 'date-fns'
import { useContext } from 'react'
import { ViewContext } from 'renderer/context/viewContext'

interface ConversationProps {
  role: 'user' | 'system' | 'assistant'
  content: string
  timestamp?: string
}
export default function Conversation({ role, content, timestamp }: ConversationProps) {
  const viewContext = useContext(ViewContext)
  const { isDark } = viewContext
  const direction = role === 'user' ? '-right' : '-left'
  const date = timestamp ? format(new Date(timestamp), 'HH:mm:ss') : null
  return (
    <section className={`message ${direction} flex items-end gap-4 mb-4`}>
      {direction === '-left' ? <i className="nes-bcrikko flex-shrink-0"></i> : <></>}
      <div className={`nes-balloon from${direction} w-full flex-shrink ${isDark ? 'is-dark' : ''}`}>
        <p>{content}</p>
        {date ? <p className="">{date}</p> : <></>}
      </div>
      {direction === '-right' ? <i className="relative block h-24 w-24 before:text-5xl nes-icon user flex-shrink-0 leading-none"></i> : <></>}
    </section>
  )
}