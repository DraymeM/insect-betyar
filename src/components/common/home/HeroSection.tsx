import React from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const fadeInOut = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 1 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  const gradientAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 0.3,
      y: 0,
      transition: { type: "spring", duration: 1 },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  const scrollToLatestItems = () => {
    const latestItemsSection = document.getElementById("latest-items");
    if (latestItemsSection) {
      const offset = 80;
      const position = latestItemsSection.offsetTop - offset;
      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      id="hero-section"
      variants={fadeInOut}
      initial="hidden"
      whileInView="visible"
      exit="exit" // Trigger exit animation when leaving the viewport
      viewport={{ once: false, amount: 0.1 }} // Trigger fade when 10% of the element is in view
      className="bg-dark text-light py-4 py-md-5"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')", // Your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "50vh",
        position: "relative",
      }}
    >
      {/* Animated Black Gradient Overlay */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to top, rgba(20, 28, 31, 0.3), rgba(20, 28, 31, 0))",
          zIndex: 0,
        }}
        variants={gradientAnimation}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
      />

      <Container
        className="position-relative text-center d-flex flex-column justify-content-center align-items-center h-100"
        style={{ zIndex: 1 }}
      >
        <motion.h1
          className="display fw-bold text-info text-center text-md-start"
          variants={fadeInOut}
        >
          Insect Betyár
        </motion.h1>
        <motion.p className="lead mt-3 fs-4 fs-md-2" variants={fadeInOut}>
          Az egzotikus rovarok szerelmeseinek egyedüli lelőhelye!
        </motion.p>
        <motion.p className="fs-6 fs-md-5 w-85" variants={fadeInOut}>
          Fedezz fel ritka és lenyűgöző rovarpéldányokat a világ minden tájáról!
          Nálunk biztosan találsz egy új kedvencet.
        </motion.p>
        <motion.div variants={fadeInOut}>
          <Button
            variant="info"
            size="lg"
            className="mt-3 animated-button"
            onClick={scrollToLatestItems}
            aria-label="Browse the collection"
          >
            Böngéssz a gyűjteményben
          </Button>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default HeroSection;
