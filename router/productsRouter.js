const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productmodel = require("../models/productmodel");
const admin = require("../models/admin");
const { isadminlogin } = require("../middlewair/islogin");

router.post(
  "/createproduct",
  isadminlogin,
  upload.single("image"),
  async (req, res) => {
    try {
      let { name, price, discount, backgroundcolor, details, textcolor } =
        req.body;

      price = Math.abs(price);
      discount = Math.abs(discount);

      // Find the one admin (only admin exists in your system)
      let adminDoc = await admin.findOne();
      console.log(adminDoc);
      if (!adminDoc) {
        return res.redirect("/adminLogin");
      }

      // Create product
      let product = await productmodel.create({
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
        name,
        price,
        discount,
        backgroundcolor,
        details,
        textcolor,
      });
      // Push product into admin's product list
      adminDoc.product.push(product._id);
      await adminDoc.save();

      req.flash("success", "Product created successfully");
      res.redirect("/owner");
    } catch (err) {
      res.send(err.message);
    }
  }
);
module.exports = router;
