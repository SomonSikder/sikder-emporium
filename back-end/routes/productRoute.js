const routes = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

routes.post("/create", createProduct);
routes.put("/update/:id", updateProduct);
routes.get("/all-products", getAllProducts);
routes.get("/single-product/:id", getSingleProduct);

module.exports = routes;
