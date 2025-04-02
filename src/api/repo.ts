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
  return items.slice(-3);
};
