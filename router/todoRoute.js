const express =require('express')
const todoController = require('../controllers/todoController');
const authControllers=require('../controllers/authController')

const router=express.Router()
router
.route("/")
.get(todoController.getAllTodos)
.post(todoController.createTodo);

router
.route("/:id")
.get(todoController.findTodo)
.patch(todoController.updateTodo)
.delete(todoController.deleteTodo);

module.exports= router