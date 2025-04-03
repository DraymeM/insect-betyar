// src/components/common/CategoryCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import "bootstrap/dist/css/bootstrap.min.css";

interface CategoryCardProps {
  category: string;
  image?: string;
  onClick: () => void;
  index?: number;
}

const placeholderImage =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  image,
  onClick,
  index = 0,
}) => {
  const [imgSrc, setImgSrc] = useState(image || placeholderImage);

  const debouncedOnClick = useDebouncedCallback(() => {
    onClick();
  }, 300);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.2 },
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.img
        src={imgSrc}
        alt={category}
        className="card-img-top"
        onError={() => setImgSrc(placeholderImage)}
        whileHover="hover"
      />
      <div className="card-body">
        <motion.button
          className="btn btn-primary"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={debouncedOnClick}
        >
          {category}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
