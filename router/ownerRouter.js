const express = require("express");
const router = express.Router();
const { isadminlogin } = require("../middlewair/islogin");

router.get("/", isadminlogin, (req, res) => {
  let succes = req.flash("succes");
  res.render("createproduct", { succes });
});

module.exports = router;
