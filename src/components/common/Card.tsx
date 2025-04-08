import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa"; // Importing shopping cart icon

interface CardProps {
  id: number;
  name: string;
  picture: string;
  price: string;
  category: string;
}

const placeholderImage =
  "https://www.museumselection.co.uk/images/products/large/28889.jpg";

const Card: React.FC<CardProps> = ({ id, name, picture, price, category }) => {
  const [imgSrc, setImgSrc] = useState(picture);
  const [isInView, setIsInView] = useState(false); // To track visibility
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true); // If card is in view, trigger animation
        } else {
          setIsInView(false); // If card is out of view, reset animation
        }
      },
      { threshold: 0 } // Trigger when the card is even slightly visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      border: "2px solid #41d5f5",
      borderColor: "#41d5f5",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    },
    tap: {
      scale: 0.98,
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.4 },
    },
  };

  return (
    <motion.div
      ref={cardRef} // Adding the ref for IntersectionObserver
      className="card bg-dark mt-1 mb-1 border border-2 border-secondary rounded-4 overflow-hidden position-relative"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Trigger visibility when in view
      whileHover="hover"
      whileTap="tap"
      style={{ cursor: "pointer" }}
    >
      <Link
        to={`/about/category/${category}/item/${id}`}
        className="text-decoration-none text-white"
      >
        <div className="p-3 pb-0">
          {/* Image Container */}
          <motion.div
            className="rounded-3 overflow-hidden bg-dark"
            style={{
              position: "relative",
              paddingBottom: "100%",
              width: "100%",
              maxWidth: "10rem",
              minWidth: "10rem",
            }}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.img
              src={imgSrc}
              alt={name}
              className="w-100 h-100"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={() => setImgSrc(placeholderImage)}
            />
          </motion.div>
        </div>

        {/* Card Body */}
        <div className="card-body d-flex flex-column justify-content-between pt-0">
          {/* Name */}
          <motion.h5
            className="text-center text-light mt-2"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {name}
          </motion.h5>

          {/* Price and Shopping Cart Button */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <motion.h5
              className="text-center underline text-info mb-0"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {price} Ft
            </motion.h5>

            <motion.button
              className="btn"
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                background:
                  "linear-gradient(to right, #2f336e, rgb(58, 212, 255))",
                border: "none",
                color: "white",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              <FaShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
