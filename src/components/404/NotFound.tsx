import React from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

const NotFound: React.FC = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "100vh" }}
    >
      {/* Logo with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <img
          src="/insect-betyar/insectbetyarlogo.png"
          alt="Logo"
          style={{ maxWidth: "300px" }}
          className="img-fluid"
        />
      </motion.div>

      {/* Big 404 number with info color */}
      <motion.div
        className="display-1 fw-bold text-info mb-3"
        style={{ fontSize: "5rem" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        404
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Az oldal nem található
      </motion.h1>

      {/* Message */}
      <motion.p
        className="lead"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        A keresett oldal nem létezik.
      </motion.p>
    </Container>
  );
};

export default NotFound;
