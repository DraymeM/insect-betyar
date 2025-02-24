import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from '../components/common/Card';

const About: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/insect-betyar/data.json');
        const data = response.data;
        setTotalItems(data.length);
        setItems(data.slice(0, limit)); 
      } catch (error) {
        console.error('Error loading the page:', error);
      }
    };
    fetchData();
  }, [limit]);

  
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalItems / limit)) return;

    setCurrentPage(newPage);
    axios
      .get('/insect-betyar/data.json') 
      .then((res) => {
        const data = res.data;
        const startIndex = (newPage - 1) * limit;
        setItems(data.slice(startIndex, startIndex + limit)); 
      })
      .catch((error) => {
        console.error('Hiba történt az oldalak betöltésekor:', error);
      });
  };

 
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); 
  };

 
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="page">
      

      {/* Limit kiválasztása */}
      <div className="limit-selector">
        <label htmlFor="limit">Elemek száma oldalanként: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </div>

      <div className="card-list">
        {items.map((item) => (
          <Card 
            key={item.id}
            id={item.id}
            name={item.name}
            picture={item.picture}
            
          />
        ))}
      </div>

      {/* Lapozás */}
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          <FaArrowLeft /> {/* Left arrow icon */}
        </button>

        {/* Oldalszámok dinamikusan generálva */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button 
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          <FaArrowRight /> {/* Right arrow icon */}
        </button>
      </div>
    </div>
  );
};

export default About;
