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
      <h1 className="md:text-7xl sm:text-4xl text-2xl text-center">AIon's Legacy</h1>
      <p className="md:text-3xl sm:text-xl text-center">Adventures in the Cyberspace</p>
      <div>
        <StartMenu links={links}/>
      </div>
    </div>
  )
}
