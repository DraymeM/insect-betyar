import React, { useState } from 'react';

interface CategoryCardProps {
  category: string;
  image?: string; // Make the image prop optional
  onClick: () => void;
}

const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const CategoryCard: React.FC<CategoryCardProps> = ({ category, image, onClick }) => {
  const [imgSrc, setImgSrc] = useState(image || placeholderImage);

  return (
    <div className="card" onClick={onClick}>
      <img
        src={imgSrc}
        alt={category}
        className="card-image"
        onError={() => setImgSrc(placeholderImage)} // Fallback to placeholder if image fails to load
      />
      <button className="btn">{category}</button>
    </div>
  );
};

export default CategoryCard;