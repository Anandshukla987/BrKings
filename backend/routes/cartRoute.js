const express = require("express");
const {
  addToCart,
  removeFromCart,
  updateProductQuantity,
  fetchCartItems,
} = require("../controller/cartController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Add or update item in the cart
router.post("/add", authMiddleware, addToCart);

// Remove item from the cart
router.delete("/remove", authMiddleware, removeFromCart);

// Update cart item quantity
router.put("/update", authMiddleware, updateProductQuantity);

// Get all cart items for the user
router.get("/", authMiddleware, fetchCartItems);

module.exports = router;
