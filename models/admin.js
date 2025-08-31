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
  gstin:String
})

module.exports=mongoose.model('admin',adminSchema);