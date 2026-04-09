const mongoose = require("mongoose")
const authSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true, 
    unique: true
  },
  email:{
    type: String, 
    required: true,
    unique: true,
    index: true
  },
  password:{
    type: String,
    required: true
  }
}, {
  timestamps: true
})
const authModel = mongoose.model('auth', authSchema)
module.exports = authModel;