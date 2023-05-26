import { StartMenu } from "renderer/components/StartMenu";

const links = [
  {
    name: "Start Game",
    path: "/play"
  },
  {
    name: "Load a Character",
    path: "/character"
  },
  {
    name: "Settings",
    path: "/settings"
  }
]

export default function StartView(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl">AIon's Legacy</h1>
      <p className="text-3xl">Adventures in the Cyberspace</p>
      <div>
        <StartMenu links={links}/>
      </div>
    </div>
  )
}
