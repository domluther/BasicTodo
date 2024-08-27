import express from 'express';
const router = express.Router();
import * as rootController from '../controllers/root.js';

// GET / -> return index.html
router.get('/', rootController.getIndex);
router.get('/todo/', rootController.getTodo);

// Export the router
export default router;
