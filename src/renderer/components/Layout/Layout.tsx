import { PropsWithChildren, useContext } from "react"
// import { Menu } from "../Menu"
import { OpenAiContext } from "renderer/context/openAI"
import { Nav } from "../Nav"
import { ViewContext } from "renderer/context/viewContext"

interface LayoutProps extends PropsWithChildren {
  title: string
}

export default function Layout ({ title, children }: LayoutProps): JSX.Element {
  const viewContext = useContext(ViewContext)
  const { isDark } = viewContext

  // const openAiContext = useContext(OpenAiContext)
  // const { activeConversation } = openAiContext
  return (
    <div className={`p-4 ${isDark ? 'is-dark' : ''}`}>
      <header className="flex flex-col">
        <h1 className="text-3xl">{title}</h1>
        <Nav/>
        {/* <Menu conversations={activeConversation}/> */}
      </header>
      {children}
    </div>
  )
}