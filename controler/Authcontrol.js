//require dependencies
const usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");

//export registeruser to index.js to create user
module.exports.registeruser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    // checking user is already existing or not with their email
    if (user) {
      req.flash("error", "user already exist, Please Login");
      return res.redirect("/");
    } else {
      //checking user fill all the reqired input field
      if (fullname && email && password) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.send(err.message);
            let user = await usermodel.create({
              fullname,
              email,
              password: hash,
            });
            // set cookie with JWT (jsonwebtoken)  which contain user email and unique id for making user logedin or checking user is logout or not
            let token = generatetoken(user);
            res.cookie("token", token);
            res.redirect("/user");
          });
        });
      } else {
        // if input field is not  filled
        res.redirect("/");
      }
    }
  } catch (err) {
    //checking error
    console.log(err.message);
  }
};

//checking and login the user
module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (!user) {
      req.flash("notuser", "Invalid Email or Password");
      return res.redirect("/");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        req.flash("wentwrong", err.message);
        return res.redirect("/");
      }
      // set cookie with JWT (jsonwebtoken)  which contain user email and unique id for making user logedin or checking user is logout or not
      if (result) {
        let token = generatetoken(user);
        res.cookie("token", token);
        res.redirect("/user");
      }else{
       req.flash("notuser", "Invalid Email or Password");
       return res.redirect("/");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

