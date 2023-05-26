const bcrypt = require('bcrypt')
const lodash = require('lodash')
const mongoose =  require('mongoose')
const {User, validate} = require('../models/user')

const createUser =  (req , res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send (error.details[0].message)
    }
    
   User.findOne({ email : req.body.email}).then((result) => {
    if(result) {
        return res.status(400).send ("User With Given Email ALready Exist")
        }
   })
   
 
  let user = new User ({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
   })

   bcrypt.genSalt(10).then((salt) => {
    return bcrypt.hash(user.password, salt);
  }).then((hashedPassword) => {
    user.password = hashedPassword;
    user.save()
     return res.send(lodash.pick( user, ['id', 'name' , 'email',]));
  }).then((savedUser) => {
    // Handle the saved user or send a response
  }).catch((error) => {
    // Handle the error
  });
}

module.exports = {
    createUser
}
