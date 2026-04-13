const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, cartController.addToCart);
router.get("/", authMiddleware, cartController.getCart);

module.exports = router;