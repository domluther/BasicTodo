import express from 'express';
const router = express.Router();
import * as rootController from '../controllers/root.js';

// GET / -> return index.html
router.get('/', rootController.getIndex);

// Export the router
export default router;
