const express=require('express')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router=express.Router()

router.post('/signup',authController.registerUser)
router.post('/login',authController.loginUser)

router
.route("/")
.get(authController.protect,userController.getAllUsers)
.post(authController.protect,userController.createUser);

router
.route("/:id")
.get(authController.protect, userController.findUser)
.patch(authController.protect,userController.updateUser)
.delete(authController.protect,userController.deleteUser);

module.exports=router
