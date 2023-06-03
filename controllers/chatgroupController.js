const bcrypt = require('bcrypt')
const lodash = require('lodash')
const mongoose =  require('mongoose')
const {Group, validate} = require('../models/group')
const { User } = require('../models/user')

const createGroup =  (req , res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send (error.details[0].message)
    }
    
  let group = new Group ({
        name : req.body.name,
        description : req.body.description,
        members: req.user._id
   })
   group.save().then((result) => {
      res.json({
        message:"Group Created Successfully",
        result
      })
        // res.send(result)
   }).then((err) => {
        res.send(err)
   })
}

const joinGroup = async(req, res) => {
    const groupId = req.params.groupid; // Assuming you have the groupId in the request params
    let user = await User.findOne({_id:req.body.userId})
    if (!user) {
      res.status(404).json({
        message : "User Not Foud"
      })
    }
    const memberId = req.body.userId; // Assuming you have the memberId in the request body
    Group.findById(groupId)
      .then((group) => {
        if (!group) {
          return res.status(404).json({
            message :'Group not found'
          });
        }
        group.members.push(memberId);
        group.save();
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error.message);
      });
  };
  
const getMembers = (req,res)=>{
  const groupId = req.params.groupid

    Group.findOne({_id:groupId})
    .select('members')
    .populate('members')
    .then((members) =>{
      if (!members) {
        return res.status(404).json({message:'Group not found'});
      }
        res.json({
          members
        })
    })
    .catch((err) =>{
        res.json({
          error: "Group doesn't exist 😒😒😒😒"
        })
    })
}


module.exports = {
    createGroup,
    joinGroup,
    getMembers
}
