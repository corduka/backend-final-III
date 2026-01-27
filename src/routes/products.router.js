import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { authorization } from "../middlewares/authorization.middleware.js";

const router = Router();

// ✅ GET products (pagination, filter, sort)
router.get("/", getProducts);

// ✅ Only admin can create, update, delete
router.post("/", authorization("admin"), createProduct);
router.put("/:pid", authorization("admin"), updateProduct);
router.delete("/:pid", authorization("admin"), deleteProduct);

export default router;