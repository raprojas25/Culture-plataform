import express from 'express';
import { RoleController } from '../controllers/roleController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { validateRole } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Rutas públicas (algunas pueden ser protegidas según necesidad)
router.get('/', RoleController.getAllRoles);
router.get('/default', RoleController.getDefaultRoles);
router.get('/:id', RoleController.getRoleById);
router.get('/:id/permissions', RoleController.getRolePermissions);

// Rutas protegidas (solo admin)
router.use(authenticateToken, authorizeRoles(1));

router.post('/', validateRole, RoleController.createRole);
router.put('/:id', validateRole, RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;

