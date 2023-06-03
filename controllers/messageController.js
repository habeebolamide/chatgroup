const mongoose =  require('mongoose')
const {Message, validate} = require('../models/message')
const { User } = require('../models/user')
const { Group } = require('../models/group')


const sendMessage = async(req , res) =>{

    // Group.findOne({_id:req.params.groupid})
    // .then(() =>{
        
    // })
    // .catch((err) =>{
    //      res.json({
    //         error : err.message
    //     })
    // })
    try {
        let group = Group.findOne({_id:req.params.groupid})
    } catch (error) {
             res.json({
                error : error.message
            })
    }
//     const { error } = validate(req.body)

//     if (error) {
//         return res.status(400).send (error.details[0].message)
//     }
    
//   let message = new Message ({
//         content : req.body.content,
//         sender : req.body.sender,
//         group: req.params.groupid
//    })
//    message.save()
//    .then((result) =>{

//         res.json({
//             result
//         })
//    })
}

module.exports = {
    sendMessage
}
