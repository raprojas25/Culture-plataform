
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('super_admin'),
  (req, res) => {
    res.json({ message: 'Gestión de roles' });
  }
);

export default router;
