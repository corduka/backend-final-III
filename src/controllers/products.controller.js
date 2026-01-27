import Product from "../models/product.model.js";

// ✅ GET products with pagination, filter, sort
export const getProducts = async (req, res) => {
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
};

// ✅ CREATE product (admin)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ✅ UPDATE product (admin)
export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.json({ status: "success", payload: updatedProduct });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// ✅ DELETE product (admin)
export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.json({ status: "success", message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};