const bcrypt = require('bcrypt')
const lodash = require('lodash')
const jwt = require('jsonwebtoken')
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
   
 
   bcrypt.hash(req.body.password, 10 , function(err, hashedPass) {
    if (err) {
       res.json({
        error :err
       })
    }
    let user = new User ({
        name:req.body.name,
        email:req.body.email,
        phone : req.body.phone,
        password:hashedPass
    })
    user.save()
    .then ( result => {
            res.json({
                message :"User Added Sucessfully"
            })
    })
    .catch(err => {
        res.json({
            error : "An Error Occured"
        })
    })
})
}

const login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            const token = jwt.sign({ _id: user._id}, 'A(56LDr', { expiresIn: '1h' });
            res.json({
              message: "Login Successful",
              token: token,
            });
          } else {
            res.json({
              message: "Invalid password",
            });
          }
        });
      } else {
        res.json({
          message: "No User Found",
        });
      }
    })
    .catch((err) => {
      res.json({
        error: "Invalid Credentials",
      });
    });
};

module.exports = {
    createUser,
    login
}
