const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true,"A todo must have an id "],
    },
    name: {
      type: String,
      required: [true, "A todo must have a name"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    isDone:{type:Boolean,
        default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  });



const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
