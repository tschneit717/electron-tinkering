import { Link } from "react-router-dom";

export default function Nav () {
  return (
    <nav>
      <ul className="flex gap-4"> 
        <li>
          <Link to={"/"}>{`<Home>`}</Link>
        </li>
        <li>
          <Link to={"/character"}>{`<Character Sheet>`}</Link>
        </li>
        <li>
          <Link to={"/settings"}>{`<Settings>`}</Link>
        </li>
      </ul>
    </nav>
  )
}