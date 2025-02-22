// src/pages/CardList.tsx
import React, { useEffect, useState } from 'react';
import Card from '../common/Card';

const CardList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="card-list">
      {items.map((item) => (
        <Card 
          key={item.id}
          id={item.id}
          name={item.name}
          picture={item.picture}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default CardList;
