const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();

// Mock data for fallback
const MOCK_PRODUCTS = [
  { _id: 1, name: "Notebook", price: 120, description: "Premium notebook", stock: 50 },
  { _id: 2, name: "Pen", price: 20, description: "Smooth writing pen", stock: 100 },
  { _id: 3, name: "Backpack", price: 800, description: "Durable backpack", stock: 30 },
  { _id: 4, name: "Calculator", price: 450, description: "Scientific calculator", stock: 25 },
  { _id: 5, name: "Headphones", price: 1499, description: "Wireless headphones", stock: 15 },
  { _id: 6, name: "Water Bottle", price: 199, description: "Eco-friendly bottle", stock: 60 },
  { _id: 7, name: "Pencil", price: 60, description: "HB pencil set", stock: 80 },
  { _id: 8, name: "PowerBank", price: 1499, description: "20000mAh power bank", stock: 20 }
];

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("CampusCart Backend Running 🚀");
});

// Direct products endpoint (before router)
app.get("/api/products", (req, res) => {
  res.json(MOCK_PRODUCTS);
});

app.use("/api/auth", authRoutes);
// Temporarily disabled while we debug // app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { 
  retryWrites: true,
  w: "majority"
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.log("⚠️ MongoDB Connection Failed:", err.message);
  console.log("🔄 Server will run in fallback mode with in-memory storage");
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error",
    status: err.status || 500
  });
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
  console.log("📍 API endpoints available: /api/auth, /api/products, /api/cart, /api/orders");
});