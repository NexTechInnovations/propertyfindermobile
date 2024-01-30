import axios, { AxiosInstance } from "axios";

// Create a custom Axios instance with a baseURL
const api: AxiosInstance = axios.create({
  baseURL: "https://bayut.p.rapidapi.com", // Replace with your API's baseURL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "293e0b6fc9msh8e2ecd6b6178856p1bc8bfjsn973fc9577c3e",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
});

export default api;
