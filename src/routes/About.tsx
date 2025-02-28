import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from '../components/common/Card';
import CategoryCard from '../components/common/CategoryCard';
import { useParams, useNavigate } from '@tanstack/react-router';
import { fetchCategories, fetchItems } from '../api/repo'; // Import the new functions

interface Category {
  name: string;
  image: string;
}

const About: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const { category } = useParams({ strict: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        // Fetch items
        const itemsData = await fetchItems();

        // Filter items by category if a category is selected
        const filteredItems = category ? itemsData.filter((item: any) => item.category === category) : [];
        setTotalItems(filteredItems.length);
        setItems(filteredItems.slice(0, limit));
      } catch (error) {
        console.error('Error loading the page:', error);
      }
    };
    fetchData();
  }, [limit, category]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalItems / limit)) return;

    setCurrentPage(newPage);
    fetchItems()
      .then((data) => {
        const filteredItems = category ? data.filter((item: any) => item.category === category) : [];
        const startIndex = (newPage - 1) * limit;
        setItems(filteredItems.slice(startIndex, startIndex + limit));
      })
      .catch((error) => {
        console.error('Error loading items:', error);
      });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    navigate({ to: `/about/category/${selectedCategory}` });
  };

  const handleBackToCategories = () => {
    navigate({ to: '/about' });
  };

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="page">
      {/* Show Category Cards if no category is selected */}
      {!category && (
        <div className="category-list">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              category={cat.name}
              image={cat.image}
              onClick={() => handleCategorySelect(cat.name)}
            />
          ))}
        </div>
      )}

      {/* Show Items if a category is selected */}
      {category && (
        <>
          {/* Back Button */}
          <div className="back-button-container">
            <button onClick={handleBackToCategories} className="back-button">
              <FaArrowLeft /> Back to Categories
            </button>
          </div>

          {/* Limit Selector */}
          <div className="limit-selector">
            <label htmlFor="limit">Items per page: </label>
            <select id="limit" value={limit} onChange={handleLimitChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </div>

          {/* Item List */}
          <div className="card-list">
            {items.map((item) => (
              <Card key={item.id} id={item.id} name={item.name} picture={item.picture} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>

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
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default About;