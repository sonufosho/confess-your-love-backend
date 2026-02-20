import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { status, registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';

const router = Router();

router.get('/status', authenticateUser, status);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;