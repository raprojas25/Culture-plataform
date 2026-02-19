import { query } from '../config/database.js';

export class EventLike {
  static async likeEvent(eventId, userId) {
    try {
      const result = await query(
        `INSERT INTO event_likes (event_id, user_id) 
         VALUES (\$1, \$2) 
         ON CONFLICT (event_id, user_id) DO NOTHING
         RETURNING *`,
        [eventId, userId]
      );
      return result.rows[0];
    } catch (error) {
      if (error.code === '23503') { // Foreign key violation
        throw new Error('Evento o usuario no existe');
      }
      throw error;
    }
  }

  static async unlikeEvent(eventId, userId) {
    const result = await query(
      'DELETE FROM event_likes WHERE event_id = \$1 AND user_id = \$2 RETURNING *',
      [eventId, userId]
    );
    return result.rows[0];
  }

  static async getUserLikes(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const result = await query(
      `SELECT e.*, c.name as category_name
       FROM events e
       LEFT JOIN categories c ON e.category_id = c.id
       INNER JOIN event_likes el ON e.id = el.event_id
       WHERE el.user_id = \$1 AND e.status = 'published'
       ORDER BY el.created_at DESC
       LIMIT \$2 OFFSET \$3`,
      [userId, limit, offset]
    );

    const countResult = await query(
      'SELECT COUNT(*) FROM event_likes WHERE user_id = \$1',
      [userId]
    );

    return {
      events: result.rows,
      total: parseInt(countResult.rows[0].count)
    };
  }

  static async isLiked(eventId, userId) {
    const result = await query(
      'SELECT 1 FROM event_likes WHERE event_id = \$1 AND user_id = \$2',
      [eventId, userId]
    );
    return result.rowCount > 0;
  }

  static async getLikesCount(eventId) {
    const result = await query(
      'SELECT COUNT(*) FROM event_likes WHERE event_id = \$1',
      [eventId]
    );
    return parseInt(result.rows[0].count);
  }
}

