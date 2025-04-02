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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="card text-center shadow-sm"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        src={imgSrc}
        alt={name}
        className="card-img-top category-image"
        onError={() => setImgSrc(placeholderImage)}
      />
      <div className="card-body">
        <h5 className="card-title text-light">{name}</h5>
        <motion.div variants={buttonVariants} whileTap="tap">
          <Link
            to={`/about/category/${category}/item/${id}`}
            className="btn btn-primary"
          >
            Részletek
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
