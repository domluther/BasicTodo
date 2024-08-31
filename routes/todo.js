import express from 'express';
import * as TodoController from '../controllers/todo.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', ensureAuth, TodoController.getTodo);

// POST / -> create a new todo
router.post('/', ensureAuth, TodoController.createTodo);

// GET /todo/random -> return a random todo item
router.get('/random', ensureAuth, TodoController.returnRandomTodo);

// PUT /todo/id -> update text
router.put('/:id', ensureAuth, TodoController.updateTodo);

// PUT /todo/complete/id -> toggle complete of the todo identified by id
router.put('/complete/:id', ensureAuth, TodoController.toggleComplete);

// PUT /todo/priority/id -> toggle complete of the todo identified by id
router.put('/priority/:id', ensureAuth, TodoController.togglePriority);

// DELETE /todo/id -> remove the todo identified by the id
router.delete('/:id', ensureAuth, TodoController.deleteTodo);

export default router;
