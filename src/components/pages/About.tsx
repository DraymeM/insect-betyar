import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from '../common/Card';
import CategoryCard from '../common/CategoryCard';
import { useParams, useNavigate } from '@tanstack/react-router';
import { fetchCategories, fetchItems } from '../../api/repo';
import { useDebouncedCallback } from 'use-debounce';
import { Outlet } from '@tanstack/react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const { category, id } = useParams({ strict: false });
  const navigate = useNavigate();

  const debouncedNavigate = useDebouncedCallback((to: string) => {
    navigate({ to });
  }, 300);

  const debouncedPageChange = useDebouncedCallback((newPage: number) => {
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
  }, 300);

  const debouncedLimitChange = useDebouncedCallback((value: number) => {
    setLimit(value);
    setCurrentPage(1);
  }, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        if (category) {
          const itemsData = await fetchItems();
          const filteredItems = itemsData.filter((item: any) => item.category === category);
          setTotalItems(filteredItems.length);
          setItems(filteredItems.slice(0, limit));
        }
      } catch (error) {
        console.error('Error loading the page:', error);
      }
    };
    fetchData();
  }, [limit, category]);

  const handleCategorySelect = (selectedCategory: string) => {
    debouncedNavigate(`/about/category/${selectedCategory}`);
  };

  const handleBackToCategories = () => {
    debouncedNavigate('/about');
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    debouncedLimitChange(Number(e.target.value));
  };

  const totalPages = Math.ceil(totalItems / limit);

  // **If an item is being viewed (`id` exists), only show the detail view**
  if (id) {
    return <Outlet />;
  }

  return (
    <div className="page">
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

      {category && (
        <>
          <div className="controls-container">
            <div className="back-button-container">
              <button onClick={handleBackToCategories} className="back-button">
                <FaArrowLeft /> Vissza a kategóriákhoz
              </button>
            </div>

            <div className="limit-selector">
              <label htmlFor="limit">Items per page: </label>
              <select id="limit" value={limit} onChange={handleLimitChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>
          </div>

          <div className="card-list">
            {items.map((item) => (
              <Card key={item.id} id={item.id} name={item.name} picture={item.picture} category={category} />
            ))}
          </div>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => debouncedPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft />
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => debouncedPageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => debouncedPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FaArrowRight />
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default About;
