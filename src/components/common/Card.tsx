import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

interface CardProps {
  id: number;
  name: string;
  picture: string;
  category: string;
}

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const Card: React.FC<CardProps> = ({ id, name, picture, category }) => {
  const [imgSrc, setImgSrc] = useState(picture);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 8px 20px rgba(2, 186, 232, 0.3)",
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      className="card bg-dark mt-1 mb-1 border border-2 border-info rounded-4 overflow-hidden h-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      style={{ cursor: "pointer" }}
    >
      <Link
        to={`/about/category/${category}/item/${id}`}
        className="text-decoration-none text-white"
      >
        {/* Larger Framed Image Container with 1:1 Aspect Ratio */}
        <div className="p-3 pb-0">
          <div
            className="border border-2 border-info rounded-3 overflow-hidden bg-black"
            style={{
              position: "relative",
              paddingBottom: "100%" /* 1:1 Aspect Ratio */,
              minHeight: "12rem" /* Minimum size to make it larger */,
              minWidth: "12rem",
            }}
          >
            <motion.img
              src={imgSrc}
              alt={name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={() => setImgSrc(placeholderImage)}
            />
          </div>
        </div>
        {/* Card Body */}
        <div className="card-body d-flex flex-column justify-content-center p-3 pt-0">
          <h5 className="text-center text-info mb-0 mt-2">{name}</h5>
          <div className="text-center mt-2">
            <motion.span
              className="text-info small"
              whileHover={{ scale: 1.05 }}
            ></motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
