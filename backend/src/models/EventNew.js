import { query } from '../config/database.js';

export class Event {
  static async findAll(filters = {}, page = 1, limit = 10) {
    let whereClauses = [];
    let queryParams = [];
    let paramIndex = 1;

    // Construir filtros dinámicos
    if (filters.category_id) {
      whereClauses.push(`category_id = \$\${paramIndex}`);
      queryParams.push(filters.category_id);
      paramIndex++;
    }

    if (filters.organizer_id) {
      whereClauses.push(`organizer_id = \$\${paramIndex}`);
      queryParams.push(filters.organizer_id);
      paramIndex++;
    }

    if (filters.district_id) {
      whereClauses.push(`district_id = \$\${paramIndex}`);
      queryParams.push(filters.district_id);
      paramIndex++;
    }

    if (filters.status) {
      whereClauses.push(`status = \$\${paramIndex}`);
      queryParams.push(filters.status);
      paramIndex++;
    } else {
      whereClauses.push(`status = 'published'`);
    }

    if (filters.price_type) {
      whereClauses.push(`price_type = \$\${paramIndex}`);
      queryParams.push(filters.price_type);
      paramIndex++;
    }

    if (filters.start_date) {
      whereClauses.push(`DATE(start_datetime) >= \$\${paramIndex}`);
      queryParams.push(filters.start_date);
      paramIndex++;
    }

    if (filters.end_date) {
      whereClauses.push(`DATE(end_datetime) <= \$\${paramIndex}`);
      queryParams.push(filters.end_date);
      paramIndex++;
    }

    if (filters.featured_level) {
      whereClauses.push(`featured_level >= \$\${paramIndex}`);
      queryParams.push(filters.featured_level);
      paramIndex++;
    }

    // Construir WHERE
    const whereClause = whereClauses.length > 0 
      ? `WHERE \${whereClauses.join(' AND ')}` 
      : '';

    // Paginación
    const offset = (page - 1) * limit;
    queryParams.push(limit, offset);

    const result = await query(
      `SELECT e.*, 
              c.name as category_name,
              c.icon as category_icon,
              c.color as category_color,
              u.username as organizer_username,
              u.email as organizer_email,
              d.name as district_name,
              (SELECT COUNT(*) FROM event_likes WHERE event_id = e.id) as likes_count
       FROM events e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN users u ON e.organizer_id = u.id
       LEFT JOIN districts d ON e.district_id = d.id
       \${whereClause}
       ORDER BY e.featured_level DESC, e.created_at DESC
       LIMIT \$\${paramIndex} OFFSET \$\${paramIndex + 1}`,
      queryParams
    );

    // Contar total
    const countResult = await query(
      `SELECT COUNT(*) FROM events e \${whereClause}`,
      queryParams.slice(0, -2)
    );
    const total = parseInt(countResult.rows[0].count);

    return {
      events: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  static async findById(id) {
    const result = await query(
      `SELECT e.*, 
              c.name as category_name,
              c.icon as category_icon,
              c.color as category_color,
              u.username as organizer_username,
              u.email as organizer_email,
              d.name as district_name,
              d.city as district_city,
              (SELECT COUNT(*) FROM event_likes WHERE event_id = e.id) as likes_count,
              (SELECT JSON_AGG(images) FROM (
                SELECT id, image_url, alt_text, order_index 
                FROM event_images 
                WHERE event_id = e.id 
                ORDER BY order_index, created_at
              ) images) as images
       FROM events e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN users u ON e.organizer_id = u.id
       LEFT JOIN districts d ON e.district_id = d.id
       WHERE e.id = \$1`,
      [id]
    );
    return result.rows[0];
  }

  static async create(eventData) {
    const {
      title, description, category_id, organizer_id, start_datetime, end_datetime,
      district_id, address, latitude, longitude, price_type = 'free',
      price_amount = 0, featured_level = 0, status = 'draft', main_image
    } = eventData;

    const result = await query(
      `INSERT INTO events 
       (title, description, category_id, organizer_id, start_datetime, end_datetime,
        district_id, address, latitude, longitude, price_type, price_amount,
        featured_level, status, main_image)
       VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8, \$9, \$10, \$11, \$12, \$13, \$14, \$15)
       RETURNING *`,
      [
        title, description, category_id, organizer_id, start_datetime, end_datetime,
        district_id, address, latitude, longitude, price_type, price_amount,
        featured_level, status, main_image
      ]
    );
    return result.rows[0];
  }

  static async update(id, eventData) {
    const {
      title, description, category_id, start_datetime, end_datetime,
      district_id, address, latitude, longitude, price_type,
      price_amount, featured_level, status, main_image
    } = eventData;

    const result = await query(
      `UPDATE events 
       SET title = \$1, description = \$2, category_id = \$3, 
           start_datetime = \$4, end_datetime = \$5, district_id = \$6,
           address = \$7, latitude = \$8, longitude = \$9, price_type = \$10,
           price_amount = \$11, featured_level = \$12, status = \$13,
           main_image = \$14, updated_at = NOW()
       WHERE id = \$15
       RETURNING *`,
      [
        title, description, category_id, start_datetime, end_datetime,
        district_id, address, latitude, longitude, price_type,
        price_amount, featured_level, status, main_image, id
      ]
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await query(
      'UPDATE events SET status = \$1, updated_at = NOW() WHERE id = \$2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM events WHERE id = \$1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async incrementViews(id) {
    // Esta función asume que agregaste una columna 'views' a la tabla events
    const result = await query(
      'UPDATE events SET views = COALESCE(views, 0) + 1 WHERE id = \$1 RETURNING views',
      [id]
    );
    return result.rows[0];
  }

  static async getUpcomingEvents(limit = 5) {
    const result = await query(
      `SELECT e.*, c.name as category_name, u.username as organizer_username
       FROM events e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN users u ON e.organizer_id = u.id
       WHERE e.status = 'published' 
         AND e.start_datetime > NOW()
       ORDER BY e.start_datetime ASC
       LIMIT \$1`,
      [limit]
    );
    return result.rows;
  }

  static async getFeaturedEvents() {
    const result = await query(
      `SELECT e.*, c.name as category_name, u.username as organizer_username
       FROM events e
       LEFT JOIN categories c ON e.category_id = c.id
       LEFT JOIN users u ON e.organizer_id = u.id
       WHERE e.status = 'published' 
         AND e.featured_level > 0
         AND e.start_datetime > NOW()
       ORDER BY e.featured_level DESC, e.created_at DESC
       LIMIT 10`
    );
    return result.rows;
  }
}

