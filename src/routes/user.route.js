import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { userProfile, updateProfile, confess } from '../controllers/user.controller.js';

const router = Router();

router.get('/:username', authenticateUser, userProfile);
router.post('/:username', authenticateUser, updateProfile);
router.get('/:username/confess', confess);

export default router;