const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "./temp" });
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getMiself,
  logout,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUser,
  updateProfile,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticateUser, getMiself);
router.route("/all").get(getAllUsers);
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);

router.route("/user/:id").get(getUser);
router
  .route("/getUserDetails")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/updateProfile")
  .put(isAuthenticateUser, upload.single("userProfile"), updateProfile);

module.exports = router;
