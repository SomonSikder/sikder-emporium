const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwt");

// Create User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(200).json({ msg: "User created", success: true, newUser });
  } else {
    throw new Error("User already exist");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      token: generateToken(findUser?._id),
      phone: findUser?.phone,
      role: findUser?.role,
    });
  } else if (!findUser) {
    throw new Error("User Not Found");
  } else if (!(await findUser.isPasswordMatched(password))) {
    throw new Error("Wrong Password");
  }
});

// Get All User
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    res.json(getAllUsers);
  } catch (err) {
    throw new Error(err);
  }
});

// Get User
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    res.json(findUser);
  } catch (err) {
    throw new Error(err);
  }
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findByIdAndRemove(id);
    res.json("Deleted User");
  } catch (err) {
    throw new Error(err);
  }
});

// Update a User
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findUserAndUpdate = await User.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
      },
      { new: true }
    );
    res.json(findUserAndUpdate);
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
