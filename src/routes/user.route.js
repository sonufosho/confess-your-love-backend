import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { userProfile, confess } from '../controllers/user.controller.js';

const router = Router();

router.post('/:username', authenticateUser, userProfile);
router.get('/:username/confess', confess);

export default router;