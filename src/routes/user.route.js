import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { profile, confess } from '../controllers/user.controller.js';

const router = Router();

router.post('/:username', authenticate, profile);
router.get('/:username/confess', confess);

export default router;