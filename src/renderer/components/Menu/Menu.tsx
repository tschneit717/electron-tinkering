interface MenuProps {
  conversations: any[]
}
export default function Menu ({ conversations }: MenuProps): JSX.Element {
  return (
    <nav>
      <div>
        <h2>Conversations</h2>
      </div>
      <ul> 
        {conversations.map((conversation, index) => (
          <li key={conversation}>
            <a>Conversation: </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
