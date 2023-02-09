const routes = require("express").Router();
const userRoutes = require("./authRoute");
routes.use("/user", userRoutes);
module.exports = routes;
