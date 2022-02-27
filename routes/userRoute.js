const express = require("express");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers,
} = require("../controllers/userController");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);
router
  .route("/getUserDetails")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers);
module.exports = router;
