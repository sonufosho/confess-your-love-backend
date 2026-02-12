import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { profile } from '../controllers/user.controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('User endpoint');
});

router.post('/:username', authenticate, profile);

router.get('/:username/confess', (req, res) => {
  res.send('Confess endpoint');
});

export default router;