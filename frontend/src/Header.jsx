import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Moon Phase Calculator</Link>
          </li>
          <li>
            <Link to="/howitworks">How It Works</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </header>
  );
}

export default Header;