import express from 'express';
import * as rootController from '../controllers/root.js';

const router = express.Router();

// GET / -> return index.html
router.get('/', rootController.getIndex);

// Export the router
export default router;
