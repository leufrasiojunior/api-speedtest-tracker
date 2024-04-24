import { Link } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" className="navbar-dark">
          <Container>
            <Navbar.Brand href="#home">Meu Site</Navbar.Brand>
            <Nav className="me-auto d-flex justify-content-center w-100">
              <div
                className="d-flex w-100d-flex flex-column flex-md-row w-100 align-items-center"
                style={{ maxWidth: "30%" }}
              >
                <Button
                  style={{
                    flex: "1",
                    backgroundColor: "#FAFAFA",
                    color: "#000",
                    border: "none",
                    minWidth: "150px",
                  }}
                  className="link-no-underline mb-2 mb-md-0 me-1 ms-1"
                >
                  <Link to="/=" className="link-no-underline text-color">
                    Home
                  </Link>
                </Button>
                <Button
                  style={{
                    flex: "1",
                    backgroundColor: "#FAFAFA",
                    color: "#000",
                    border: "none",
                    minWidth: "150px",
                  }}
                  className="link-no-underline mx-2 btn mb-2 mb-md-0 me-1 ms-1"
                >
                  <Link
                    to="/dashboard"
                    className="link-no-underline text-color"
                  >
                    Dashboard
                  </Link>
                </Button>
                <Button
                  style={{
                    flex: "1",
                    backgroundColor: "#FAFAFA",
                    color: "#000",
                    border: "none",
                    minWidth: "150px",
                  }}
                  className="link-no-underline"
                >
                  <Link
                    to="/dashboard"
                    className="link-no-underline text-color mb-2 mb-md-0 me-1 ms-1"
                  >
                    Configurações
                  </Link>
                </Button>
              </div>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
