import { Event } from '../models/Event.js';
import { EventLike } from '../models/EventLike.js';
import { EventImage } from '../models/EventImage.js';
import { Category } from '../models/Category.js';
import { District } from '../models/District.js';

export class EventController {
  static async getAllEvents(req, res) {
    try {
      const filters = {
        category_id: req.query.category_id,
        organizer_id: req.query.organizer_id,
        district_id: req.query.district_id,
        status: req.query.status,
        price_type: req.query.price_type,
        start_date: req.query.start_date,
        end_date: req.query.end_date,
        featured_level: req.query.featured_level
      };

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await Event.findAll(filters, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEventById(req, res) {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      // Incrementar vistas (si el usuario no es el organizador)
      if (req.user && event.organizer_id !== req.user.id) {
        await Event.incrementViews(req.params.id);
      }

      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createEvent(req, res) {
    try {
      // Si no se especifica organizador, usar el usuario autenticado
      const eventData = {
        ...req.body,
        organizer_id: req.body.organizer_id || req.user.id
      };

      // Verificar que la categoría existe
      const category = await Category.findById(eventData.category_id);
      if (!category) {
        return res.status(400).json({ error: 'Categoría no encontrada' });
      }

      // Verificar que el distrito existe (si se especifica)
      if (eventData.district_id) {
        const district = await District.findById(eventData.district_id);
        if (!district) {
          return res.status(400).json({ error: 'Distrito no encontrado' });
        }
      }

      const event = await Event.create(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateEvent(req, res) {
    try {
      // Verificar que el evento existe
      const existingEvent = await Event.findById(req.params.id);
      if (!existingEvent) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      // Verificar permisos (solo organizador o admin)
      if (existingEvent.organizer_id !== req.user.id && req.user.role_id !== 1) {
        return res.status(403).json({ error: 'No tienes permisos para editar este evento' });
      }

      const event = await Event.update(req.params.id, req.body);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateEventStatus(req, res) {
    try {
      const { status } = req.body;
      const validStatuses = ['draft', 'published', 'cancelled', 'completed'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Estado inválido' });
      }

      const event = await Event.updateStatus(req.params.id, status);
      if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      res.json({ message: `Evento \${status}`, event });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteEvent(req, res) {
    try {
      // Verificar que el evento existe
      const existingEvent = await Event.findById(req.params.id);
      if (!existingEvent) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      // Verificar permisos (solo organizador o admin)
      if (existingEvent.organizer_id !== req.user.id && req.user.role_id !== 1) {
        return res.status(403).json({ error: 'No tienes permisos para eliminar este evento' });
      }

      await Event.delete(req.params.id);
      res.json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async likeEvent(req, res) {
    try {
      const eventId = req.params.id;
      const userId = req.user.id;

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      const like = await EventLike.likeEvent(eventId, userId);
      res.status(201).json({ message: 'Evento liked', like });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async unlikeEvent(req, res) {
    try {
      const eventId = req.params.id;
      const userId = req.user.id;

      const unlike = await EventLike.unlikeEvent(eventId, userId);
      if (!unlike) {
        return res.status(404).json({ error: 'Like no encontrado' });
      }

      res.json({ message: 'Like eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserLikes(req, res) {
    try {
      const userId = req.params.userId || req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await EventLike.getUserLikes(userId, page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUpcomingEvents(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const events = await Event.getUpcomingEvents(limit);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getFeaturedEvents(req, res) {
    try {
      const events = await Event.getFeaturedEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addEventImages(req, res) {
    try {
      const eventId = req.params.id;
      
      // Verificar que el evento existe
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }

      // Verificar permisos
      if (event.organizer_id !== req.user.id && req.user.role_id !== 1) {
        return res.status(403).json({ error: 'No tienes permisos para añadir imágenes' });
      }

      const images = Array.isArray(req.body) ? req.body : [req.body];
      const imagesWithEventId = images.map(img => ({
        ...img,
        event_id: eventId
      }));

      const createdImages = await EventImage.createMultiple(imagesWithEventId);
      res.status(201).json(createdImages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getEventImages(req, res) {
    try {
      const images = await EventImage.findByEventId(req.params.id);
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

