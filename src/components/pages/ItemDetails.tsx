// src/pages/ItemDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';

const ItemDetail: React.FC = () => {
  const { id } = useParams({ from: '/items/:id' });
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      const item = data.find((i: { id: { toString: () => any; }; }) => i.id.toString() === id);
      setItem(item);
    };
    fetchItem();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="item-detail">
      <img src={item.picture} alt={item.name} />
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <Link to="/" className="btn btn-secondary">Go Back</Link>
    </div>
  );
};

export default ItemDetail;
