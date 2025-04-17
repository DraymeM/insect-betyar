import React, { useState } from "react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaHome, FaBug, FaShoppingCart } from "react-icons/fa";
import { MdEmail, MdInfoOutline } from "react-icons/md";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaConciergeBell } from "react-icons/fa";

const InfoDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const matchRoute = useMatchRoute();

  const navLinkStyle: React.CSSProperties = {
    position: "relative",
    transition: "all 0.3s ease-in-out",
    padding: "0.5rem 0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    cursor: "pointer",
  };

  const navLinkAfterBase: React.CSSProperties = {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: "2px",
    backgroundColor: "#3498db",
    transition: "width 0.3s ease-in-out",
    width: "0",
  };

  const isAnyActive = ["/services", "/aboutus", "/contact"].some((route) =>
    matchRoute({ to: route, fuzzy: true })
  );

  return (
    <div className="nav-item dropdown " style={{ position: "relative" }}>
      <button
        className="btn btn-dark mx-2 mt-1 px-3 dropdown-toggle"
        style={{
          ...navLinkStyle,
          color: isAnyActive ? "#3498db" : "var(--text-color)",
          fontWeight: isAnyActive ? "bold" : "normal",
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <MdInfoOutline />
        <span>Info</span>
      </button>

      {showDropdown && (
        <div
          className="dropdown-menu show bg-dark mt-1 border-secondary pb-2"
          style={{
            position: "absolute",
            left: 0,
            top: "100%",
            backgroundColor: "#343a40",
            border: "1px solid rgba(0,0,0,.15)",
            borderRadius: "0.25rem",
            zIndex: 1100,
            minWidth: "200px",
            padding: 0,
          }}
        >
          {[
            {
              to: "/services",
              icon: <FaConciergeBell />,
              label: "Szolgáltatások",
            },
            { to: "/aboutus", icon: <MdInfoOutline />, label: "Rolunk" },
            { to: "/contact", icon: <MdEmail />, label: "Elérhetőségek" },
          ].map(({ to, icon, label }) => {
            const isActive = matchRoute({ to, fuzzy: true });
            const color = isActive ? "#3498db" : "var(--text-color)";

            return (
              <div
                key={to}
                style={{
                  position: "relative",
                  padding: "0.5rem 1rem",
                }}
              >
                <Link
                  to={to}
                  className="d-flex align-items-center py-2 gap-2"
                  style={{
                    color,
                    fontWeight: isActive ? "bold" : "normal",
                    textDecoration: "none",
                  }}
                  onClick={() => setShowDropdown(false)}
                >
                  <span style={{ color }}>{icon}</span>
                  <span style={{ color }}>{label}</span>
                </Link>
                <span
                  style={{
                    ...navLinkAfterBase,
                    width: isActive ? "calc(100% - 2rem)" : "0",
                    left: "1rem",
                    transform: "translateX(0)",
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NavBar: React.FC = () => {
  const matchRoute = useMatchRoute();
  const { state } = useCart();

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
    backgroundColor: "#3498db",
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
        zIndex: 1030,
        overflow: "visible", // Allow dropdown to overflow navbar
      }}
    >
      <Container fluid style={{ position: "relative" }}>
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
          className="overflow-visible" // Changed to visible
          style={{
            transition: "max-height 0.5s ease-in-out",
            maxHeight: "500px",
          }}
        >
          <Nav className="ms-auto" style={{ position: "relative" }}>
            {[
              { to: "/", icon: <FaHome />, label: "Főoldal" },
              { to: "/about", icon: <FaBug />, label: "Termékeink" },
            ].map(({ to, icon, label }) => {
              const isActive = matchRoute({ to, fuzzy: true });
              const color = isActive ? "#3498db" : "var(--text-color)";

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

            <InfoDropdown />

            <Nav.Link
              as={Link}
              to="/cart"
              className="px-3 d-flex align-items-center mt-1 md-mt-0 gap-1 mx-1 position-relative justify-content-center"
              style={{
                ...navLinkStyle,
                color: "white",
                fontWeight: "bold",
                background: matchRoute({ to: "/cart", fuzzy: true })
                  ? "linear-gradient(to right, #2f336e, rgb(58, 212, 255) 300%)"
                  : "linear-gradient(to right, #2f336e, rgb(58, 212, 255))",
                borderRadius: matchRoute({ to: "/cart", fuzzy: true })
                  ? "50px"
                  : "30px",
                transition: "all 0.4s ease-in-out",
                position: "relative",
                marginRight: "1rem",
                minWidth: "60px",
                height: "40px",
              }}
            >
              <AnimatePresence mode="wait">
                {matchRoute({ to: "/cart", fuzzy: true }) ? (
                  <motion.span
                    key="cart-icon-big"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.4 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: "white" }}
                  >
                    <FaShoppingCart size={15} className="mx-4" />
                  </motion.span>
                ) : (
                  <motion.div
                    key="cart-full"
                    className="d-flex gap-1 align-items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ color: "white" }}>
                      <FaShoppingCart />
                    </span>
                    <span style={{ color: "white" }}>Kosár</span>
                  </motion.div>
                )}
              </AnimatePresence>

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
