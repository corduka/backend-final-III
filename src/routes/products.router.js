// routes/products.router.js
import { Router } from "express";
import Product from "../models/product.model.js";
import { authorization } from '../middlewares/authorization.middleware.js';

const router = Router();

// Only the admin can create, update, and delete products
router.post('/', authorization('admin'), productController.createProduct);
router.put('/:pid', authorization('admin'), productController.updateProduct);
router.delete('/:pid', authorization('admin'), productController.deleteProduct);

// ✅ GET with pagination, filtering, sorting
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    if (query) {
      const [key, value] = query.split(":");
      filter[key] = value;
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    const result = await Product.paginate(filter, options);

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// ✅ POST create new product
router.post("/", async (req, res) => {
  try {
    const { title, description, price, category, available, thumbnail } =
      req.body;

    if (!title || !price) {
      return res
        .status(400)
        .json({ status: "error", message: "Title and price are required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      available,
      thumbnail,
    });

    await newProduct.save();

    res.status(201).json({ status: "success", payload: newProduct });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
