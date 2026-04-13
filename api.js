import axios from "axios";

// 🔗 Base URL of backend
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔐 Add token automatically (VERY IMPORTANT)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


// ================= AUTH =================

// Register
export const registerUser = (data) =>
  API.post("/auth/register", data);

// Login
export const loginUser = (data) =>
  API.post("/auth/login", data);


// ================= PRODUCTS =================

// Get all products
export const getProducts = () =>
  API.get("/products");

// Add product (protected)
export const addProduct = (data) =>
  API.post("/products", data);


// ================= CART =================

// Add to cart
export const addToCart = (data) =>
  API.post("/cart", data);

// Get cart
export const getCart = () =>
  API.get("/cart");


// ================= ORDERS =================

// Create order
export const createOrder = () =>
  API.post("/orders");

// Get orders
export const getOrders = () =>
  API.get("/orders");


export default API;
