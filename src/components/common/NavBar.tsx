import { Link, useMatchRoute } from '@tanstack/react-router'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaHome } from 'react-icons/fa'

const NavBar: React.FC = () => {
  const matchRoute = useMatchRoute()

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="ms-0">
          <img
            src="/insect-betyar/insectbetyarlogo.png"
            alt="Insect Betyár Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={matchRoute({ to: '/' }) ? 'active' : ''}
            >
              <FaHome /> Főoldal
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={matchRoute({ to: '/about' }) ? 'active' : ''}
            >
              Galéria
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={matchRoute({ to: '/contact' }) ? 'active' : ''}
            >
              Elérhetőségek
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
