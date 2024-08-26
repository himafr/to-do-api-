const express=require('express')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router=express.Router()

router.post('/signup',authController.registerUser)
router.post('/login',authController.loginUser)
router
.route("/")
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route("/:id")
.get(userController.findUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);
module.exports=router
