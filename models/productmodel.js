const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  backgroundcolor: String,
  details: String,
  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
