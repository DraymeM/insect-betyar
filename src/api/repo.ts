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

export const fetchItemsBySearch = async (searchQuery: string) => {
  const response = await apiClient.get("/data.json");
  const items = response.data;

  // If search query is empty, return all items like no search was made
  if (!searchQuery) {
    return items;
  }

  // Otherwise, filter items based on the search query
  const filteredItems = items.filter((item: { name: string }) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return filteredItems;
};
