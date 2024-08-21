import express from 'express';
import * as TodoController from '../controllers/todo.js';

const router = express.Router();

// POST / -> create a new todo
router.post('/', TodoController.createTodo);

// GET /todo/ -> return JSON of all the items
router.get('/', TodoController.returnTodos);

// GET /todo/random -> return a random todo item
router.get('/random', TodoController.returnRandomTodo);

// PUT /todo/id -> toggle complete of the todo identified by id
router.put('/complete/:id', TodoController.toggleComplete);

// PUT /todo/id -> toggle complete of the todo identified by id
router.put('/priority/:id', TodoController.togglePriority);

// DELETE /todo/id -> remove the todo identified by the id
router.delete('/:id', TodoController.deleteTodo);

export default router;
