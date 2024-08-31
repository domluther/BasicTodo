import express from 'express';
import * as AuthController from '../controllers/auth.js';
import * as AuthMiddleware from '../middleware/auth.js';

const router = express.Router();

// Passport says this should be a post request
router.get('/logout', AuthMiddleware.ensureAuth, AuthController.logout);
router.post('/login', AuthMiddleware.ensureGuest, AuthController.login);
router.post('/signup', AuthMiddleware.ensureGuest, AuthController.signup);

export default router;
