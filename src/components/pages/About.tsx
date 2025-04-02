import React, { useEffect, useState, Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "@tanstack/react-router";
import { fetchCategories, fetchItems } from "../../api/repo";
import { useDebouncedCallback } from "use-debounce";
import { Outlet } from "@tanstack/react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "../common/Spinner";
import SearchBar from "../common/SearchBar";
import { Toast, ToastContainer } from "react-bootstrap";
import { IoIosWarning } from "react-icons/io";
const Card = React.lazy(() => import("../common/Card"));
const CategoryCard = React.lazy(() => import("../common/CategoryCard"));
const LimitSelector = React.lazy(() => import("../common/LimitSelector"));
const Pagination = React.lazy(() => import("../common/Pagination"));

interface Category {
  name: string;
  image: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, id } = useParams({ strict: false });

  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get("page") || "1", 10);
  const limit = parseInt(params.get("limit") || "5", 10);
  const searchQuery = params.get("search") || "";

  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showToast, setShowToast] = useState(false); // Toast visibility

  const debouncedPageChange = useDebouncedCallback((newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalItems / limit)) return;
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("page", newPage.toString());
    navigate({ to: `${location.pathname}?${updatedParams.toString()}` });
  }, 300);

  const debouncedLimitChange = useDebouncedCallback((value: number) => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("page", "1");
    updatedParams.set("limit", value.toString());
    navigate({ to: `${location.pathname}?${updatedParams.toString()}` });
  }, 300);

  const handleSearch = (query: string) => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("search", query);
    updatedParams.set("page", "1");
    navigate({ to: `${location.pathname}?${updatedParams.toString()}` });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const itemsData = await fetchItems();
        const filteredItems = category
          ? itemsData.filter((item: any) => item.category === category)
          : itemsData;

        const lowercasedQuery = searchQuery.toLowerCase();
        const filteredBySearch = searchQuery
          ? filteredItems.filter((item: any) =>
              item.name.toLowerCase().includes(lowercasedQuery)
            )
          : filteredItems;

        setTotalItems(filteredBySearch.length);
        setItems(
          filteredBySearch.slice((currentPage - 1) * limit, currentPage * limit)
        );

        // Show toast if no items found
        setShowToast(filteredBySearch.length === 0);
      } catch (error) {
        console.error("Error loading the page:", error);
      }
    };

    fetchData();
  }, [limit, category, searchQuery, currentPage]);

  const handleCategorySelect = (selectedCategory: string) => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("page", "1");
    if (!updatedParams.has("limit")) {
      updatedParams.set("limit", "10");
    }
    updatedParams.delete("category");

    navigate({
      to: `/about/category/${selectedCategory}?${updatedParams.toString()}`,
    });
  };

  const handleBackToCategories = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.delete("category");
    updatedParams.delete("search");
    updatedParams.delete("page");
    updatedParams.delete("limit");
    navigate({ to: `/about?${updatedParams.toString()}` });
  };

  const totalPages = Math.ceil(totalItems / limit);

  if (id) {
    return <Outlet />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div className="page">
        {!category && (
          <div className="card-list">
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
            <Suspense fallback={<Spinner />}>
              <div className="controls-container">
                <div className="back-button-container">
                  <button
                    onClick={handleBackToCategories}
                    className="back-button"
                  >
                    <FaArrowLeft /> Vissza
                  </button>
                </div>
                <SearchBar onSearch={handleSearch} />
                <LimitSelector
                  value={limit}
                  onLimitChange={debouncedLimitChange}
                />
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={debouncedPageChange}
              />

              {items.length > 0 ? (
                <div className="card-list">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      picture={item.picture}
                      category={category}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center mt-4">
                  <p className="text-info fs-4">
                    Nincsen ilyen termék a keresési feltételek alapján!
                  </p>
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={debouncedPageChange}
              />
            </Suspense>
          </>
        )}
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="info"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          animation
          className={`fade ${showToast ? "show slide-in" : "slide-out"}`}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              <IoIosWarning size={25} />
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Nincsen ilyen termék a keresési feltételek alapján!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Suspense>
  );
};

export default About;
