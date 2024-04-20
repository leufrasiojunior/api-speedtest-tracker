import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.css";

function Header() {
  return (
    <nav className="p-3 text-bg-dark">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active creme" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active creme " aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link creme" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link creme" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">
            Disabled
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
