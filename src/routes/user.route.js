import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('User endpoint');
});

router.get('/:username', (req, res) => {
  const { username } = req.params;

  res.send(`${username} endpoint`);
});

router.get('/:username/confess', (req, res) => {
  res.send('Confess endpoint');
});

export default router;