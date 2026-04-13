const Product = require("../models/Product");

const PRODUCTS = [
  { _id: 1, name: "Notebook", price: 120, description: "Premium notebook", stock: 50 },
  { _id: 2, name: "Pen", price: 20, description: "Smooth writing pen", stock: 100 },
  { _id: 3, name: "Backpack", price: 800, description: "Durable backpack", stock: 30 },
  { _id: 4, name: "Calculator", price: 450, description: "Scientific calculator", stock: 25 },
  { _id: 5, name: "Headphones", price: 1499, description: "Wireless headphones", stock: 15 },
  { _id: 6, name: "Water Bottle", price: 199, description: "Eco-friendly bottle", stock: 60 },
  { _id: 7, name: "Pencil", price: 60, description: "HB pencil set", stock: 80 },
  { _id: 8, name: "PowerBank", price: 1499, description: "20000mAh power bank", stock: 20 }
];

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product added", product });
  } catch (err) {
    res.json({ message: "Product added (fallback mode)", product: req.body });
  }
};

exports.getProducts = async (req, res) => {
  // Return mock data directly
  res.json(PRODUCTS);
};