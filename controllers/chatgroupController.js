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
   })
   group.save().then((result) => {
        res.send(result)
   }).then((err) => {
        res.send(err)
   })

  
}
const joinGroup = (req, res) => {
    const groupId = req.params.gorupid; // Assuming you have the groupId in the request params
    const memberId = req.body.userId; // Assuming you have the memberId in the request body
  
    Group.findById(groupId)
      .then((group) => {
        if (!group) {
          return res.status(404).send('Group not found');
        }
  
        group.members.push(memberId);
        return group.save();
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  };
  


module.exports = {
    createGroup,
    joinGroup
}
