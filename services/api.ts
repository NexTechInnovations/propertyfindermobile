import axios, { AxiosInstance } from "axios";

// Create a custom Axios instance with a baseURL
const api: AxiosInstance = axios.create({
  baseURL: "https://bayut.p.rapidapi.com", // Replace with your API's baseURL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "2e926eb412mshb9736914e0f4f09p15e9bajsnc1547b423793",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
});

export default api;
