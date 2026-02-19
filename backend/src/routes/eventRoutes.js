import express from 'express';
import { EventController } from '../controllers/eventController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { validateEvent, validateEventFilters } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', validateEventFilters, EventController.getAllEvents);
router.get('/upcoming', EventController.getUpcomingEvents);
router.get('/featured', EventController.getFeaturedEvents);
router.get('/:id', EventController.getEventById);
router.get('/:id/images', EventController.getEventImages);

// Rutas protegidas
router.use(authenticateToken);

router.post('/', validateEvent, EventController.createEvent);
router.put('/:id', validateEvent, EventController.updateEvent);
router.patch('/:id/status', EventController.updateEventStatus);
router.delete('/:id', EventController.deleteEvent);

// Likes
router.post('/:id/like', EventController.likeEvent);
router.delete('/:id/like', EventController.unlikeEvent);
router.get('/user/likes', EventController.getUserLikes);
router.get('/user/:userId/likes', authorizeRoles(1), EventController.getUserLikes);

// Imágenes
router.post('/:id/images', EventController.addEventImages);

export default router;

