// src/components/NavBar.tsx
import React from 'react';
import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaBug } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useDebouncedCallback } from 'use-debounce';

const NavBar: React.FC = () => {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();

  const debouncedNavigate = useDebouncedCallback((to: string) => {
    navigate({ to });
  }, 300);

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
              as="div"
              className={matchRoute({ to: '/' }) ? 'active' : ''}
              onClick={() => debouncedNavigate('/')}
              style={{ cursor: 'pointer' }} // Inline fix
            >
              <FaHome /> Főoldal
            </Nav.Link>
            <Nav.Link
              as="div"
              className={matchRoute({ to: '/about' }) ? 'active' : ''}
              onClick={() => debouncedNavigate('/about')}
              style={{ cursor: 'pointer' }} // Inline fix
            >
              <FaBug /> Termékeink
            </Nav.Link>
            <Nav.Link
              as="div"
              className={matchRoute({ to: '/contact' }) ? 'active' : ''}
              onClick={() => debouncedNavigate('/contact')}
              style={{ cursor: 'pointer' }} // Inline fix
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