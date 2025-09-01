const express = require("express");
const { isadminlogin } = require("../middlewair/islogin");
const admin = require("../models/admin");
const productmodel = require("../models/productmodel");
const router = express.Router();

router.get("/", isadminlogin, async (req, res) => {
  let data = await admin.findOne().populate("product");
  res.render("allproduct", { data });
});

router.get("/delete/:id", isadminlogin, async (req, res) => {
  try {
    let product = await productmodel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/allproduct");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
