const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel");
const admin = require("../models/admin");

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

module.exports.isadminlogin = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.redirect("/");
  }
  try {
    let decode = jwt.verify(req.cookies.token, "secret");
    let user = await admin.findOne({ email: decode.email }).select("password");
    req.admin = user;
    next();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/user");
};
