const mongoose =  require('mongoose')
const Joi = require("joi")
const Message = mongoose.model('message', mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true, 
        minlength: 1,
      },
    sender :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    group :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "group"
    },
    timestamp :{
        type: Date,
        default: Date.now()
    }
    
})
) 

function validateRequest(message) {
    const schema = {
        content:  Joi.string().min(1).required(),
    };
      return Joi.validate(message, schema);
}

exports.Message = Message;
exports.validate = validateRequest;
 