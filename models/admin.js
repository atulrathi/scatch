const { name } = require("ejs");
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("admin", adminSchema);
