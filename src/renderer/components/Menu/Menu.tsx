interface MenuProps {
  conversations: string[]
}
export default function Menu ({ conversations }: MenuProps): JSX.Element {
  return (
    <nav>
      <div>
        <h2>Conversations</h2>
      </div>
      <ul> 
        {conversations.map((conversation) => (
          <li key={conversation}>
            <a>Conversation: </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
