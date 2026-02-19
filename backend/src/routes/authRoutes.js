import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { validateLogin, validateUser } from '../middlewares/validationMiddleware.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLogin, AuthController.login);
router.post('/register', validateUser, AuthController.register);
router.post('/refresh-token', authenticateToken, AuthController.refreshToken);
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;
