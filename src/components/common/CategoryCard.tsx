import React, { useState, useEffect } from "react";
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
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    },
    tap: { scale: 0.98 },
  };
  const [cardMaxWidth, setCardMaxWidth] = useState("8rem");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setCardMaxWidth(e.matches ? "10rem" : "8rem");
    };

    handleResize(mediaQuery); // set on mount
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <motion.div
      className="card bg-dark mt-1  border border-2 border-secondary rounded-3 overflow-hidden h-100"
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
          className="border rounded-2 overflow-hidden bg-dark"
          style={{
            position: "relative",
            paddingBottom: "100%",
            width: "100%",
            maxWidth: cardMaxWidth,
            minWidth: cardMaxWidth,
          }}
        >
          <motion.img
            src={imgSrc}
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
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column justify-content-center p-3 pt-0">
        <h5 className="text-center text-light mb-0 mt-2">{category}</h5>
        <div className="text-center mt-2">
          <motion.span
            className="text-muted small"
            whileHover={{ scale: 1.05 }}
          ></motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
