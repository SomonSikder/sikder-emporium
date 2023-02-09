const routes = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
routes.post("/register", authMiddleware, isAdmin, createUser);
routes.post("/login", loginUser);
routes.get("/all-users", authMiddleware, isAdmin, getAllUsers);
routes.get("/:id", authMiddleware, isAdmin, getUser);
routes.delete("/:id", authMiddleware, isAdmin, deleteUser);
routes.put("/update-user", authMiddleware, updateUser);
routes.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
routes.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = routes;
