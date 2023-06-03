const express = require( 'express' )
const router = express.Router();
router.use(express.json())
const chatGroupContropller = require('../controllers/chatgroupController')
const messageController = require('../controllers/messageController')


router.post('/', chatGroupContropller.createGroup)
router.post('/:groupid/joingroup', chatGroupContropller.joinGroup)
router.get('/:groupid/members', chatGroupContropller.getMembers)
router.post('/:groupid/sendmessage', messageController.sendMessage)

module.exports = router