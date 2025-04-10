import React from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaHome, FaBug, FaShoppingCart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useCart } from "../../context/CartContext";

const NavBar: React.FC = () => {
  const matchRoute = useMatchRoute();
  const { state } = useCart(); // Get the cart state

  const navLinkStyle: React.CSSProperties = {
    position: "relative",
    transition: "all 0.3s ease-in-out",
    padding: "0.5rem 0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  };

  const navLinkAfterBase: React.CSSProperties = {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: "2px",
    backgroundColor: "#41d5f5",
    transition: "width 0.3s ease-in-out",
    width: "0",
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{
        transition: "box-shadow 0.3s ease-in-out",
        zIndex: 1030, // Set the z-index for the navbar to ensure it stays below the badge
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="ms-0">
          <img
            src="/insect-betyar/insectbetyarlogo.png"
            alt="Insect Betyár Logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ border: 0, outline: 0, boxShadow: "none" }}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="overflow-hidden"
          style={{
            transition: "max-height 0.5s ease-in-out",
            maxHeight: "500px",
          }}
        >
          <Nav className="ms-auto">
            {[
              { to: "/", icon: <FaHome />, label: "Főoldal" },
              { to: "/about", icon: <FaBug />, label: "Termékeink" },
              { to: "/contact", icon: <MdEmail />, label: "Elérhetőségek" },
            ].map(({ to, icon, label }) => {
              const isActive = matchRoute({ to, fuzzy: true });
              const color = isActive ? "#41d5f5" : "var(--text-color)";

              return (
                <Nav.Link
                  as={Link}
                  to={to}
                  key={to}
                  className="px-3 d-flex align-items-center gap-1 position-relative"
                  style={{
                    ...navLinkStyle,
                    color,
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                >
                  <span style={{ color }}>{icon}</span>
                  <span style={{ color }}>{label}</span>
                  <span
                    style={{
                      ...navLinkAfterBase,
                      width: isActive ? "100%" : "0",
                    }}
                  />
                </Nav.Link>
              );
            })}

            <Nav.Link
              as={Link}
              to="/cart"
              className="px-3 d-flex align-items-center mt-1 md-mt-0 gap-1 mr-1 position-relative"
              style={{
                ...navLinkStyle,
                color: matchRoute({ to: "/cart", fuzzy: true })
                  ? "var(--bs-info)"
                  : "white",
                fontWeight: "bold",
                background: matchRoute({ to: "/cart", fuzzy: true })
                  ? "linear-gradient(to right, #2f336e, rgb(58, 212, 255) 300%)"
                  : "linear-gradient(to right, #2f336e, rgb(58, 212, 255))",
                borderRadius: matchRoute({ to: "/cart", fuzzy: true })
                  ? "10px"
                  : "30px",
                transition: "all 0.4s ease-in-out",
                position: "relative",
                marginRight: "1rem",
              }}
            >
              <span
                style={{
                  color: matchRoute({ to: "/cart", fuzzy: true })
                    ? "var(--bs-info)"
                    : "white",
                }}
              >
                <FaShoppingCart />
              </span>
              <span
                style={{
                  color: matchRoute({ to: "/cart", fuzzy: true })
                    ? "var(--bs-info)"
                    : "white",
                }}
              >
                Kosár
              </span>
              {state.items.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    fontSize: "0.75rem",
                    minWidth: "1.5rem",
                    height: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1050,
                  }}
                >
                  {state.items.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
