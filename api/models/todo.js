const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  is_done: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_important: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
