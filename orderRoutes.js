const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Create Order
router.post("/", authMiddleware, orderController.createOrder);

// Get Orders
router.get("/", authMiddleware, orderController.getOrders);

module.exports = router;