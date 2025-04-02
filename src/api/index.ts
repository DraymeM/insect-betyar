import axios from "axios";

const apiClient = axios.create({
  baseURL: "/insect-betyar",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
