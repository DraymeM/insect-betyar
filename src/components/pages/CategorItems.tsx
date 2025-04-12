import React, { useEffect, useState, Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { fetchItems, fetchItemsBySearch } from "../../api/repo";
import { useDebouncedCallback } from "use-debounce";
import Spinner from "../common/Spinner";
import SearchBar from "../common/SearchBar";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Card from "../common/Card";
import LimitSelector from "../common/LimitSelector";
import Pagination from "../common/Pagination";
import { Outlet } from "@tanstack/react-router";

interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

const CategoryItems: React.FC = () => {
  const { category, id } = useParams({ strict: false });
  const search = useSearch({ strict: false });
  const navigate = useNavigate();

  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [previousLimit, setPreviousLimit] = useState<number | null>(null);
  const shownToast = React.useRef(false);

  const currentPage = search.page || 1;
  const limit = search.limit || 10;
  const searchQuery = search.search || "";

  const debouncedPageChange = useDebouncedCallback((newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(totalItems / limit)) return;
    setIsLoading(true);
    navigate({
      search: ((prev: SearchParams) => ({ ...prev, page: newPage })) as any,
    });
  }, 300);

  const debouncedLimitChange = useDebouncedCallback((value: number) => {
    if (value !== previousLimit) {
      setIsLoading(true);
      setPreviousLimit(value);
      navigate({
        search: ((prev: SearchParams) => ({
          ...prev,
          limit: value,
          page: 1,
        })) as any,
      });
    }
  }, 300);

  const handleSearch = (query: string) => {
    if (query !== searchQuery) {
      setIsLoading(true);
      navigate({
        search: { ...search, search: query, page: 1 },
      });
    }
  };

  const handleBackToCategories = () => {
    navigate({
      to: "/about",
      search: {},
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let itemsData = [];
        if (searchQuery) {
          itemsData = await fetchItemsBySearch(searchQuery);
        } else {
          itemsData = await fetchItems();
        }

        const filteredItems = itemsData.filter(
          (item: any) => item.category === category
        );
        setTotalItems(filteredItems.length);
        setItems(
          filteredItems.slice((currentPage - 1) * limit, currentPage * limit)
        );

        if (filteredItems.length === 0 && !shownToast.current) {
          toast.info("Nincsen ilyen termék a keresési feltételek alapján!");
          shownToast.current = true;
        }
      } catch (error) {
        console.error("Error loading items:", error);
        toast.error("Hiba történt az adatok betöltése közben!");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(timer);
      shownToast.current = false;
    };
  }, [limit, category, searchQuery, currentPage]);

  const totalPages = Math.ceil(totalItems / limit);
  const previousListViewParams = React.useRef<SearchParams>({
    page: 1,
    limit: 10,
    search: "",
  });

  // Update ref whenever search params change (but only in list view)
  useEffect(() => {
    if (!id) {
      previousListViewParams.current = {
        page: search.page || 1,
        limit: search.limit || 10,
      };
    }
  }, [search, id]);

  // Initialize or restore URL params when component becomes visible
  useEffect(() => {
    if (!id) {
      // Check if we're coming back from item detail (no search params)
      const shouldRestoreParams =
        !search.page && !search.limit && !search.search;

      const targetParams = shouldRestoreParams
        ? previousListViewParams.current
        : {
            page: search.page || 1,
            limit: search.limit || 10,
          };

      navigate({
        search: targetParams as any,
        replace: true,
      });
    }
  }, [id]); // Run whenever we switch between list and detail views

  // ... rest of your existing code ...

  if (id) {
    // Before navigating to item detail, save current list view params
    const currentParams = {
      page: search.page || 1,
      limit: search.limit || 10,
      search: search.search || "",
    };
    previousListViewParams.current = currentParams;

    navigate({
      to: `/about/category/${category}/item/${id}`,
      search: undefined, // Ensure no query params
      replace: true,
    });
    return <Outlet />;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 w-100 text-center overflow-hidden">
        <div className="d-flex mt-5 justify-content-center align-items-center gap-3 flex-wrap">
          <div className="d-flex justify-content-start">
            <Button
              onClick={handleBackToCategories}
              className="btn btn-info text-white d-inline-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Vissza
            </Button>
          </div>
          <SearchBar onSearch={handleSearch} />
          <LimitSelector
            value={limit}
            options={["5", "10", "15", "25"]}
            limitLabel="Limit: "
            onLimitChange={debouncedLimitChange}
          />
        </div>

        {!isLoading && (
          <>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={debouncedPageChange}
            />
          </>
        )}

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "30%" }}
            >
              <Spinner />
            </div>
          ) : items.length > 0 ? (
            <div
              className="d-flex flex-wrap justify-content-center w-100 px-0"
              style={{ gap: "1.5rem", minWidth: "80vw", maxWidth: "100vw" }}
            >
              {items.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  picture={item.picture}
                  price={item.price}
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
        </div>

        {!isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={debouncedPageChange}
          />
        )}

        <Outlet />
      </div>
    </Suspense>
  );
};

export default CategoryItems;
