import axios, { AxiosInstance } from "axios";

// Create a custom Axios instance with a baseURL
const api: AxiosInstance = axios.create({
  baseURL: "https://bayut.p.rapidapi.com", // Replace with your API's baseURL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "8d460f8ef4msha149c58b6ca1fd9p1cbc49jsnce423baa386e",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
});

export default api;
