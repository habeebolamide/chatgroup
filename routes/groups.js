const express = require( 'express' )
const router = express.Router();
router.use(express.json())
const chatGroupContropller = require('../controllers/chatgroupController')


router.post('/', chatGroupContropller.createGroup)

router.post('/:gorupid/joingroup', chatGroupContropller.joinGroup)

module.exports = router