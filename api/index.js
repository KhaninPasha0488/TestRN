const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5050;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://pasha:pasha@cluster0.wavvqpk.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connectin to mongoDb', error);
  });

app.listen(port, () => {
  console.log('Server is running on port 5050');
});

const Todo = require('./models/todo');
app.get('/', async (req, res) => {
  const todo = await Todo.find({});
  res.status(200).json({message: 'Todo added successfully', todo: todo});
});
app.post('/todo/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = req.body.item;
    const todo = await Todo.findByIdAndUpdate(todoId, updatedTodo, {new: true});
    if (!todo) {
      return res.status(404).json({error: 'Todo not found'});
    }
    const todos = await Todo.find({});

    res.status(200).json({message: 'Todo updated successfully', todo: todos});
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'});
  }
});

app.post('/todo', async (req, res) => {
  try {
    const {title, description, is_done, is_important} = req.body.item;

    const newTodo = new Todo({
      title,
      description,
      is_done,
      is_important,
    });

    await newTodo.save();
    const todo = await Todo.find({}).exec();
    res.status(200).json({message: 'Todo added sucessfully', todo: todo});
  } catch (error) {
    res.status(200).json({message: 'Todo not added'});
  }
});
app.delete('/todo/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (deletedTodo) {
      const todos = await Todo.find({});

      res.status(200).json({message: 'Todo updated successfully', todo: todos});
    } else {
      res.status(404).json({error: 'Todo not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Something went wrong'});
  }
});
app.put('/todo/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const {is_done} = req.body.item;

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
      is_done: is_done,
    });

    if (updatedTodo) {
      const todos = await Todo.find({});

      res.status(200).json({message: 'Todo updated successfully', todo: todos});
    } else {
      res.status(404).json({error: 'Todo not found'});
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({error: 'Something went wrong'});
  }
});
