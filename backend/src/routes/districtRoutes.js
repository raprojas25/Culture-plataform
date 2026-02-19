import express from 'express';
import { DistrictController } from '../controllers/districtController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { validateDistrict } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', DistrictController.getAllDistricts);
router.get('/provinces', DistrictController.getProvinces);
router.get('/regions', DistrictController.getRegions);
router.get('/province/:province', DistrictController.getDistrictsByProvince);
router.get('/region/:region', DistrictController.getDistrictsByRegion);
router.get('/:id', DistrictController.getDistrictById);
router.get('/:id/statistics', DistrictController.getStatistics);

// Rutas protegidas (solo admin)
router.use(authenticateToken, authorizeRoles(1));

router.post('/', validateDistrict, DistrictController.createDistrict);
router.put('/:id', validateDistrict, DistrictController.updateDistrict);
router.delete('/:id', DistrictController.deleteDistrict);

export default router;

