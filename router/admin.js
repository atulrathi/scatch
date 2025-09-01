const express = require("express");
const { islogin, isadminlogin } = require("../middlewair/islogin");
const { registeradmin, adminloginUser } = require("../controler/Authcontrol");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/owner");
  } else {
    res.render("adminlogin");
  }
});

router.post("/createadmin", registeradmin);
router.post("/loginadmin", adminloginUser);

module.exports = router;
