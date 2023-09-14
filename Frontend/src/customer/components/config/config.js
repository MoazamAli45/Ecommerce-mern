import axios from "axios";
export const API_URL = "https://ecommerce-mern-api-beta.vercel.app";
// http://localhost:8000
//   As for fetching data from backend we need to send token
const jwt = localStorage.getItem("jwt");
// console.log(jwt);
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: jwt ? `Bearer ${jwt}` : "",
    "Content-Type": "application/json",
  },
});
