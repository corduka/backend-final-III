import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    cart.items.push({ product: productId, quantity });
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const purchaseCart = async (req, res) => {
    try {
        res.status(200).json({ message: 'Cart purchased successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Purchase failed' });
    }
};