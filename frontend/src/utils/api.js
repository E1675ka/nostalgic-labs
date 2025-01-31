// src/api.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/some-endpoint`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
