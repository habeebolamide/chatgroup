const mongoose =  require('mongoose')
const Joi = require("joi")
const Group = mongoose.model('group', mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      description: { 
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
    members :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    messages :{
        type: Array
    }
    
})
) 

function validateRequest(group) {
    const schema = {
        name:  Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(50).required(),
    };
      return Joi.validate(group, schema);
}

exports.Group = Group;
exports.validate = validateRequest;
 