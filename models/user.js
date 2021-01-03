const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   name:{
      type: String,
      required:true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   profilepicture:{
       type:String,
       default: '/avatar.png'
   }
});

const User = mongoose.model('user', userSchema);

module.exports = User;