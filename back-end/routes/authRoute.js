const routes = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");
routes.post("/register", createUser);
routes.post("/login", loginUser);
routes.get("/all-users", getAllUsers);
routes.get("/:id", getUser);
routes.delete("/:id", deleteUser);
routes.put("/:id", updateUser);

module.exports = routes;
