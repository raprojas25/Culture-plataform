/*
import { Router } from 'express';
import { getUsers } from './user.controller.js';

const router = Router();

router.get('/', getUsers);

export default router;
/////////
import { Router } from 'express';
import { getUsers } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getUsers);

export default router;
*/
/*
import { Router } from 'express';
import { getUsers } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'super_admin'),
  getUsers
);

*/
/*
import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
} from './user.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', roleMiddleware('admin', 'super_admin'), getUsers);
router.get('/:id', roleMiddleware('admin', 'super_admin'), getUserById);
router.post('/', roleMiddleware('admin', 'super_admin'), createUser);
router.put('/:id', roleMiddleware('admin', 'super_admin'), updateUser);
router.delete('/:id', roleMiddleware('super_admin'), deactivateUser);

export default router;
*/


import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
} from './user.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createUserSchema,
  updateUserSchema,
} from './user.validation.js';

const router = Router();

router.use(authMiddleware);

router.get('/', roleMiddleware('admin', 'super_admin'), getUsers);
router.get('/:id', roleMiddleware('admin', 'super_admin'), getUserById);

router.post(
  '/',
  roleMiddleware('admin', 'super_admin'),
  validate(createUserSchema),
  createUser
);

router.put(
  '/:id',
  roleMiddleware('admin', 'super_admin'),
  validate(updateUserSchema),
  updateUser
);

router.delete('/:id', roleMiddleware('super_admin'), deactivateUser);

export default router;
