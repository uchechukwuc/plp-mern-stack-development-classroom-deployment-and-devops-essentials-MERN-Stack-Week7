const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const router = express.Router();

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      // Return mock data if database is not connected
      return res.json([
        {
          _id: 'demo-1',
          title: 'Welcome to MERN Todo App!',
          description: 'This is a demo todo. Connect to MongoDB for full functionality.',
          completed: false,
          priority: 'high',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: 'demo-2',
          title: 'Set up MongoDB Atlas',
          description: 'Create a MongoDB Atlas account and configure the connection string.',
          completed: false,
          priority: 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    }

    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority: priority || 'medium'
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;