import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';

interface CardProps {
  id: number;
  name: string;
  picture: string;
  description: string;
}

const placeholderImage = "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const Card: React.FC<CardProps> = ({ id, name, picture, description }) => {
  const [imgSrc, setImgSrc] = useState(picture);

  return (
    <div className="card">
      <h3>{name}</h3>
      <img 
        src={imgSrc} 
        alt={name} 
        className="card-image" 
        onError={() => setImgSrc(placeholderImage)} // Ha a kép betöltése sikertelen, beállítja a placeholder képet
      />
      <p>{description}</p>
      <Link to={`/item/${id}`} className="btn">Részletek</Link>
    </div>
  );
};

export default Card;
