//reqires dependencies
const express = require("express");
const router = express.Router();
const { islogin, logout } = require("../middlewair/islogin");

router.get("/", islogin, (req, res) => {
  res.render("user");
});

router.get("/logout",logout)


module.exports = router;
