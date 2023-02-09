const routes = require("express").Router();
const userRoutes = require("./authRoute");
const productRoutes = require("./productRoute");

routes.use("/user", userRoutes);
routes.use("/product", productRoutes);

module.exports = routes;
