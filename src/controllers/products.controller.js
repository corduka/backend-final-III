// controllers/products.controller.js
const Product = require("../models/product.model");

const getProducts = async (req, res) => {
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

    const result = await Product.paginate(filter, options); // Use mongoose-paginate-v2

    const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      result;

    res.json({
      status: "success",
      payload: docs,
      totalPages,
      page: parseInt(page),
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?page=${prevPage}` : null,
      nextLink: hasNextPage ? `/api/products?page=${nextPage}` : null,
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};
