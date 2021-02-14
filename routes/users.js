const express = require("express");
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const catchAsync = require("../utils/catchAsync");
// const User = require("../models/user");

// ***** RENDER REGISTER & POST REGISTER SCREENS *****
router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

// ***** RENDER LOGIN AND POST LOGIN SCREENS *****
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

// ***** LOGOUT SCREEN *****
router.get("/logout", users.logout);

module.exports = router;
