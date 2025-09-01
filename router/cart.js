const express = require("express");
const { islogin } = require("../middlewair/islogin");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");
const router = express.Router();

router.get("/", islogin, async (req, res) => {
  let user = await usermodel.findOne({ _id: req.user._id }).populate("cart");
  res.render("cart", { user });
});

router.get("/product/:id", islogin, async (req, res) => {
  try {
    let product = await productmodel.findOne({ _id: req.params.id });
    let user = await usermodel.findOne({ _id: req.user._id });

    // check if product already exists in cart
    let index = user.cart.indexOf(product._id);

    if (index === -1) {
      // not present → add it
      user.cart.push(product._id);
    } else {
      // already present → remove it
      user.cart.splice(index, 1);
    }

    await user.save();
    res.redirect("/cart");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
