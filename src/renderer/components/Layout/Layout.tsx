import { PropsWithChildren, useContext } from "react"
import { Menu } from "../Menu"
import { OpenAiContext } from "renderer/context/openAI"
import { Nav } from "../Nav"

interface LayoutProps extends PropsWithChildren {
  title: string
}

export default function Layout ({ title, children }: LayoutProps): JSX.Element {
  const openAiContext = useContext(OpenAiContext)
  const { activeConversation } = openAiContext
  return (
    <div className="p-4">
      <header className="flex flex-col">
        <h1 className="text-3xl">{title}</h1>
        <Nav/>
        {/* <Menu conversations={activeConversation}/> */}
      </header>
      {children}
    </div>
  )
}