const routes = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

routes.post("/create", createProduct);
routes.put("/update/:id", updateProduct);
routes.get("/all-products", getAllProducts);
routes.get("/single-product/:id", getSingleProduct);
routes.delete("/delete/:id", deleteProduct);

module.exports = routes;
