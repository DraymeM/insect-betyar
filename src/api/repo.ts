import apiClient from "./index";

export const fetchCategories = async () => {
  const response = await apiClient.get("/categories.json");
  return response.data;
};

export const fetchItems = async () => {
  const response = await apiClient.get("/data.json");
  return response.data;
};

export const fetchLatestItems = async () => {
  const response = await apiClient.get("/data.json");
  const items = response.data;
  return items.slice(-5);
};

export const fetchCategoryItems = async (category: string) => {
  const response = await apiClient.get("/data.json");
  const items = response.data;
  const filteredItems = items.filter(
    (item: { category: string }) => item.category === category
  );
  return filteredItems.slice(-5);
};

export const fetchItemsBySearch = async (searchQuery: string) => {
  const response = await apiClient.get("/data.json");
  const items = response.data;

  if (!searchQuery) {
    return items;
  }
  const filteredItems = items.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return filteredItems;
};
export const fetchItemById = async (id: string | number) => {
  const response = await apiClient.get("/data.json");
  const items = response.data;
  return items.find((item: { id: string | number }) => item.id === id);
};
