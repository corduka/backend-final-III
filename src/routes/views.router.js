import { Router } from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const router = Router();

// Show products with pagination
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const products = await Product.paginate({}, { limit, page });
  res.render("products", {
    products: products.docs,
    page: products.page,
    totalPages: products.totalPages,
  });
});

// Single product view
router.get("/products/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid);
  res.render("productDetails", { product });
});

// Show a specific cart
router.get("/carts/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate("products.product");
  res.render("cart", { cart });
});

export default router;
