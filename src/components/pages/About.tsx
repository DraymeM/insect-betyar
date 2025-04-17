// Categories.tsx
import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "@tanstack/react-router";
import { fetchCategories } from "../../api/repo";
import Spinner from "../common/Spinner";
import CategoryCard from "../common/CategoryCard";

interface Category {
  name: string;
  image: string;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelect = (selectedCategory: string) => {
    navigate({
      to: "/about/category/$category",
      params: { category: selectedCategory },
      search: { page: 1, limit: 10 },
    });
  };

  return (
    <Suspense fallback={<Spinner />}>
      {/* removed overflow-hidden here */}
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 w-100 text-center">
        <div
          className="d-flex flex-wrap justify-content-center mt-5 w-100 px-3"
          style={{ gap: "1.5rem" }}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              category={cat.name}
              image={cat.image}
              onClick={() => handleCategorySelect(cat.name)}
            />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Categories;
