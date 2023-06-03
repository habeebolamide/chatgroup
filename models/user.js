const mongoose =  require('mongoose')
const Joi = require("joi")
  
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique : true
      },
      phone:{
        type : Number
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1112255,
      },
  }) 
  const User = mongoose.model('user', userSchema);

function validateRequest(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phone: Joi.string().min(11).max(11).required(),
        password: Joi.string().min(5).max(1112255).required(),
      };
    
      return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateRequest;