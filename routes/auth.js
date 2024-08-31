import express from 'express';
import * as AuthController from '../controllers/auth.js';
import { ensureAuth, ensureGuest } from '../middleware/auth.js';

const router = express.Router();

router.post('/logout', ensureAuth, AuthController.logout);
router.post('/login', ensureGuest, AuthController.login);
router.post('/signup', ensureGuest, AuthController.signup);

export default router;
