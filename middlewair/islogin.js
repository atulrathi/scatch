const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

module.exports.islogin = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.redirect("/");
  }
  try {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await usermodel
      .findOne({ email: decode.email })
      .select("password");
    req.user = user;
    next();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/user");
};
