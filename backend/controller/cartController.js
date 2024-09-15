const Cart = require("../models/cartModel"); // Import the Cart model

// Controller to add a product to the cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    // Find an active cart for the user
    let cart = await Cart.findOne({ user: userId, status: "active" });

    if (!cart) {
      // If no active cart, create a new one
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
        status: "active",
      });
    } else {
      // If an active cart exists, update it
      const existingProductIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (existingProductIndex >= 0) {
        // If the product already exists in the cart, update the quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Otherwise, add the new product to the cart
        cart.products.push({ product: productId, quantity });
      }
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to cart", error });
  }
};

// Controller to fetch cart items for a user
const fetchCartItems = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({
      user: userId,
      status: "active",
    }).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart items", error });
  }
};

// Controller to remove a product from the cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({
      user: userId,
      status: "active",
    }).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (p) => p.product._id.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove product from cart", error });
  }
};

// Controller to increment or decrement product quantity in the cart
const updateProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body; // `action` should be either 'increment' or 'decrement'
  const userId = req.user._id;

  try {
    // Find the active cart for the user
    let cart = await Cart.findOne({ user: userId, status: "active" });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId
    );

    if (productIndex < 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Increment or decrement quantity based on action

    cart.products[productIndex].quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Product quantity updated", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product quantity", error });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  removeFromCart,
  updateProductQuantity,
};
