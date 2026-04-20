import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { validateCategory } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

// Rutas protegidas (solo admin)
router.use(authenticateToken, authorizeRoles(1));

router.post('/', validateCategory, CategoryController.createCategory);
router.put('/:id', validateCategory, CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.patch('/:id/status', CategoryController.toggleStatus);

export default router;

