import React from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaBug } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const NavBar: React.FC = () => {
  const matchRoute = useMatchRoute();

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
              to="/" // Replace with TanStack Link
              className={matchRoute({ to: '/' }) ? 'active' : ''}
            >
              <FaHome /> Főoldal
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about" // Replace with TanStack Link
              className={matchRoute({ to: '/about' }) ? 'active' : ''}
            >
              <FaBug /> Termékeink
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact" // Replace with TanStack Link
              className={matchRoute({ to: '/contact' }) ? 'active' : ''}
            >
              <MdEmail /> Elérhetőségek
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
