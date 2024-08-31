import express from 'express';
import * as AuthController from '../controllers/auth.js';

const router = express.Router();

// Passport says this should be a post request
router.get('/logout', AuthController.logout);
router.get('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

export default router;
