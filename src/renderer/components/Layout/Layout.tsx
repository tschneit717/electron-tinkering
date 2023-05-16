import { PropsWithChildren, useContext } from "react"
import { Menu } from "../Menu"
import { OpenAiContext } from "renderer/context/openAI"
import { Nav } from "../Nav"

type LayoutProps = PropsWithChildren

export default function Layout ({ children }: LayoutProps): JSX.Element {
  const openAiContext = useContext(OpenAiContext)
  const { activeConversation } = openAiContext
  return (
    <div>
      <Nav/>
      <Menu conversations={activeConversation}/>
      {children}
    </div>
  )
}