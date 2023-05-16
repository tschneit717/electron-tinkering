import {format} from 'date-fns'

interface ConversationProps {
  role: 'user' | 'system' | 'assistant'
  content: string
  timestamp?: string
}
export default function Conversation({ role, content, timestamp }: ConversationProps) {
  const direction = role === 'user' ? '-right' : '-left'
  const date = timestamp ? format(new Date(timestamp), 'HH:mm:ss') : null
  return (
    <section className={`message ${direction}`}>
      <i className="nes-bcrikko"></i>
      <div className={`nes-balloon from${direction}`}>
        <p>{content}</p>
        {date ? <p className="">{date}</p> : <></>}
      </div>
    </section>
  )
}