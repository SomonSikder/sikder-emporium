const routes = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

routes.post("/create", authMiddleware, isAdmin, createProduct);
routes.put("/update/:id", authMiddleware, isAdmin, updateProduct);
routes.get("/all-products", getAllProducts);
routes.get("/single-product/:id", getSingleProduct);
routes.delete("/delete/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = routes;
