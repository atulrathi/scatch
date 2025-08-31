const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productmodel = require("../models/productmodel");

router.get("/", (req, res) => {
  res.send("produt");
});

router.post("/createproduct", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, backgroundcolor, panelcolor, textcolor } =
      req.body;
    price = Math.abs(price);
    discount = Math.abs(discount);
    let product = await productmodel.create({
      image: {
        data:req.file.buffer,
        contentType:req.file.mimetype,
      },
      name,
      price,
      discount,
      backgroundcolor,
      panelcolor,
      textcolor,
    });
    req.flash("succes", "product created successfully ");
    res.redirect("/owner");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
