const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwt");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongodbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");

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
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findOneAndUpdate(
      findUser.id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 66 * 1000,
    });
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
    validateMongodbId(id);
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
    validateMongodbId(id);
    const findUser = await User.findByIdAndRemove(id);
    res.json("Deleted User");
  } catch (err) {
    throw new Error(err);
  }
});

// Update a User
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongodbId(_id);

    const findUserAndUpdate = await User.findByIdAndUpdate(
      _id,
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

// Block User
const blockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const findUserAndBlock = await User.findByIdAndUpdate(
      id,
      {
        isBlock: true,
      },
      { new: true }
    );
    res.json("User Blocked");
  } catch (error) {
    throw new Error(error);
  }
});

// Unblock User
const unBlockUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const findUserAndUnblock = await User.findByIdAndUpdate(
      id,
      {
        isBlock: false,
      },
      { new: true }
    );
    res.json("User Unblocked");
  } catch (error) {
    throw new Error(error);
  }
});

// Handle Refresh Token
const handleRefresh = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh Token in Databsae");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something worng with refresh Token");
    }
    const accessToken = generateToken(user?.id);
    res.json({ accessToken });
  });
});

// Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.sendStatus(204);
});
module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefresh,
  logout,
};
