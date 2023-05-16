import { Link } from "react-router-dom";

export default function Nav () {
  return (
    <nav>
      <div>
        <h2>Nav</h2>
      </div>
      <ul> 
        <li>
          <Link to={"/"}>Home</Link>
          <Link to={"/settings"}>Settings</Link>
        </li>
      </ul>
    </nav>
  )
}