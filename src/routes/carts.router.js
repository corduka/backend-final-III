import { Router } from "express";

import Cart from "../models/cart.model.js";
import { purchaseCart } from '../controllers/carts.controller.js';
const router = Router();

router.post('/:cid/purchase', purchaseCart);

// DELETE product from cart
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();

    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// PUT entire cart update
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = products;
    await cart.save();

    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// PUT quantity of a product
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find((p) => p.product.toString() === pid);
    if (!product)
      return res.status(404).json({ message: "Product not in cart" });

    product.quantity = quantity;
    await cart.save();

    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// DELETE all products in cart
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    await cart.save();

    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// GET cart with populated products
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;

