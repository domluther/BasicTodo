import express from 'express';
import getIndex from '../controllers/root.js';

const router = express.Router();

// GET / -> return index.html
router.get('/', getIndex);

// Export the router
export default router;
