import express from 'express';
import * as TodoController from '../controllers/todo.js';
import * as AuthMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', AuthMiddleware.ensureAuth, TodoController.getTodo);

// POST / -> create a new todo
router.post('/', AuthMiddleware.ensureAuth, TodoController.createTodo);

// GET /todo/random -> return a random todo item
router.get(
  '/random',
  AuthMiddleware.ensureAuth,
  TodoController.returnRandomTodo,
);

// PUT /todo/id -> update text
router.put('/:id', AuthMiddleware.ensureAuth, TodoController.updateTodo);

// PUT /todo/complete/id -> toggle complete of the todo identified by id
router.put(
  '/complete/:id',
  AuthMiddleware.ensureAuth,
  TodoController.toggleComplete,
);

// PUT /todo/priority/id -> toggle complete of the todo identified by id
router.put(
  '/priority/:id',
  AuthMiddleware.ensureAuth,
  TodoController.togglePriority,
);

// DELETE /todo/id -> remove the todo identified by the id
router.delete('/:id', AuthMiddleware.ensureAuth, TodoController.deleteTodo);

export default router;
