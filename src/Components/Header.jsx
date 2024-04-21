import { Link } from "react-router-dom";
import "../styles/styles.css";
import { useState } from "react";
// import Logo from "../../images/Logo";
// import { Link } from "react-router-dom";

function Header() {
  const [active, setActive] = useState(false);
  function ativar() {
    setActive(!active);
    // console.log(active)
  }
  return (
    <>
      <header>
        <nav className="navbar">
          <Link to="#" className="logo">
            Speedtest Tracker
          </Link>
          <ul className={active ? "nav-menu active" : "nav-menu"}>
            <li className="nav-itens">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-itens">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-itens">
              <Link to="/configs" className="nav-link">
                Configurações
              </Link>
            </li>
          </ul>
          <div className="hamburger" onClick={ativar}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
