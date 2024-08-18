const express = require('express');
const router = express.Router();

const {
  createTodo,
  deleteTodo,
  returnRandomTodo,
  returnTodos,
  toggleComplete,
  togglePriority,
} = require('../controllers/todos');

// POST / -> create a new todo
router.post('/', createTodo);

// GET /todo/ -> return JSON of all the items
router.get('/', returnTodos);

// GET /todo/random -> return a random todo item
router.get('/random', returnRandomTodo);

// PUT /todo/id -> toggle complete of the todo identified by id
router.put('/complete/:id', toggleComplete);

// PUT /todo/id -> toggle complete of the todo identified by id
router.put('/priority/:id', togglePriority);

// DELETE /todo/id -> remove the todo identified by the id
router.delete('/:id', deleteTodo);

module.exports = router;
