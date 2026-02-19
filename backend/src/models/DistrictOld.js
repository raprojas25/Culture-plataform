import { query } from '../config/database.js';

export class District {
  static async findAll(includeInactive = false) {
    const sql = includeInactive
      ? 'SELECT * FROM districts ORDER BY city, name'
      : 'SELECT * FROM districts WHERE is_active = true ORDER BY city, name';
    const result = await query(sql);
    return result.rows;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM districts WHERE id = \$1', [id]);
    return result.rows[0];
  }

  static async findByCity(city) {
    const result = await query(
      'SELECT * FROM districts WHERE city = \$1 AND is_active = true ORDER BY name',
      [city]
    );
    return result.rows;
  }

  static async create(districtData) {
    const { name, city, province, country = 'Perú', is_active = true } = districtData;
    const result = await query(
      `INSERT INTO districts (name, city, province, country, is_active)
       VALUES (\$1, \$2, \$3, \$4, \$5) RETURNING *`,
      [name, city, province, country, is_active]
    );
    return result.rows[0];
  }

  static async update(id, districtData) {
    const { name, city, province, country, is_active } = districtData;
    const result = await query(
      `UPDATE districts 
       SET name = \$1, city = \$2, province = \$3, country = \$4, is_active = \$5
       WHERE id = \$6 RETURNING *`,
      [name, city, province, country, is_active, id]
    );
    return result.rows[0];
  }

  static async getCities() {
    const result = await query(
      'SELECT DISTINCT city FROM districts WHERE is_active = true ORDER BY city'
    );
    return result.rows.map(row => row.city);
  }

  static async getEventsCount(id) {
    const result = await query(
      'SELECT COUNT(*) FROM events WHERE district_id = \$1 AND status = \$2',
      [id, 'published']
    );
    return parseInt(result.rows[0].count);
  }
}

