import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com", // use env var
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can customize error handling here
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
