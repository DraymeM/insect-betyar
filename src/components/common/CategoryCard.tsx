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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 8px 16px rgba(2, 186, 232, 0.3)",
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="card bg-dark mt-1 mb-1 border border-2 border-info rounded-4 overflow-hidden h-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={debouncedOnClick}
      style={{ cursor: "pointer" }}
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
        <h5 className="text-center text-light mb-0 mt-2">{category}</h5>
        <div className="text-center mt-2">
          <motion.span
            className="text-info small"
            whileHover={{ scale: 1.05 }}
          ></motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
