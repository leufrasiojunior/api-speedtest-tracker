import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="p-3 text-bg-dark">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link creme" aria-current="page" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link creme " aria-current="page" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link creme" to="/results">
            Resultados
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
