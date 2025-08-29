const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  nmae: String,
  email: String,
  password: String,
  product: {
    type: Array,
    default: [],
  },
  picture: String,

})

module.exports=mongoose.model('admin',adminSchema);