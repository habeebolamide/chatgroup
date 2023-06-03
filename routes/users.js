const express = require( 'express' )
const router = express.Router();
router.use(express.json())
const userController = require('../controllers/userController')


router.post('/register', userController.createUser)
router.post('/login', userController.login)


module.exports = router