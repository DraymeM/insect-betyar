// src/components/common/Card.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CardProps {
  id: number;
  name: string;
  picture: string;
}

const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const Card: React.FC<CardProps> = ({ id, name, picture }) => {
  const [imgSrc, setImgSrc] = useState(picture);
  const navigate = useNavigate();

  const debouncedClick = useDebouncedCallback(() => {
    navigate({ to: `/about/category/$category/item/${id}` });
  }, 300);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="card h-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={debouncedClick}
    >
      <motion.img
        src={imgSrc}
        alt={name}
        className="card-img-top"
        onError={() => setImgSrc(placeholderImage)}
        variants={imageVariants}
        whileHover="hover"
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: 'white' }}>{name}</h5>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link 
            to={`/about/category/$category/item/${id}`} 
            className="btn btn-primary"
            onClick={(e) => e.stopPropagation()}
          >
            Részletek
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;