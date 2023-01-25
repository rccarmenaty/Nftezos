const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  register,
  login,
  forgotpassword,
  resetpassword,
  info,
  logout,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/forgotpassword").post(forgotpassword);

router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/info").get(info);

module.exports = router;
