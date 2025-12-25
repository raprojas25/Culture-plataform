
/*
import { Router } from 'express';
import { login, register } from './auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;
*/
/*
import { Router } from 'express';
import { login, register } from './auth.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from './auth.validation.js';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
// refresh tokens
router.post('/refresh', refresh);
router.delete('/logout', logout);
export default router;
*/

import { Router } from 'express';
import {
  login,
  register,
  refresh,
  logout,
} from './auth.controller.js';

import {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} from '../../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/login', loginLimiter, login);
router.post('/register', registerLimiter, register);
router.post('/refresh', refreshLimiter, refresh);
router.delete('/logout', logout);

export default router;
