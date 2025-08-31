//reqires dependencies
const express = require("express");
const router = express.Router();
const { islogin, logout } = require("../middlewair/islogin");
const productmodel = require("../models/productmodel")

router.get("/", islogin,async (req, res) => {
  let product = await productmodel.find();
  res.render("user",{product});
});

router.get("/logout",logout)


module.exports = router;
