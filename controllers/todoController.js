const Todo = require("../models/todoModels");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');



exports.getAllTodos =catchAsync( async (req, res,next) => {
    const todos =await Todo.find({userID:req.user.id})  
    res.status(200).json({
      status: "success",
      result: todos.length,
      data: { todos },
    });
  })

exports.createTodo =catchAsync( async (req, res,next) => {
    const newTodo = await Todo.create({...req.body,userID:req.user._id});
    res.status(201).json({
      status: "success",
      data: newTodo,
    });
  });

exports.findTodo =catchAsync( async (req, res,next) => {
    const todo = await Todo.findById(req.params.id);
  if(!todo)return next(new AppError("todo not found !",404))
  res.status(200).json({
status: "success",
data: { todo },
});
});

exports.updateTodo =catchAsync( async (req, res,next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if(!todo)return next(new AppError("todo not found !",404))
  res.status(200).json({
status: "success",
data: {
  todo,
},
});
});

exports.deleteTodo =catchAsync( async (req, res,next) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if(!todo)return next(new AppError("todo not found !",404))
    res.status(204).json({
      status: "success",
      data: {
        tour: null,
      },
    });
});
