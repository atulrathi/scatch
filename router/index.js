//reqires dependencies
const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");
const { registeruser, loginUser } = require("../controler/Authcontrol");

//render login and signup page
router.get("/", (req, res) => {
  let error = req.flash("error");
  let notuser = req.flash("notuser");
  let wentwrong = req.flash("wenterong");
  if (req.cookies.token) {
    return res.redirect("/user");
  } else {
    res.render("index", { error, notuser, wentwrong });
  }
});

//create user with error handeling
router.post("/register", registeruser);
router.post("/login", loginUser);

module.exports = router;
