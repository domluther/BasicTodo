import express from 'express';
import getIndex from '../controllers/root.js';
import * as AuthMiddleware from '../middleware/auth.js';

const router = express.Router();

// GET / -> return index.html
router.get('/', AuthMiddleware.ensureGuest, getIndex);

// Export the router
export default router;
