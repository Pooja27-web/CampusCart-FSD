const Order = require("../models/Order");
const Cart = require("../models/Cart");

// 🧾 CREATE ORDER (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount
    let totalAmount = 0;

    cart.items.forEach(item => {
      totalAmount += item.product.price * item.quantity;
    });

    // Create order
    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount
    });

    await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// 📄 GET USER ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};