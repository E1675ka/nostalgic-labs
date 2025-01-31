import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Uses environment variable for flexibility
  withCredentials: true, // Allows sending cookies (useful for authentication)
});

export default API;
