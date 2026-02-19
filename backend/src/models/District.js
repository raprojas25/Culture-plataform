import { query } from '../config/database.js';

export class District {
  static async findAll(filters = {}) {
    let whereClauses = [];
    let queryParams = [];
    let paramIndex = 1;

    // Filtros opcionales
    if (filters.province) {
      whereClauses.push(`province ILIKE ${paramIndex}`);
      queryParams.push(`%${filters.province}%`);
      paramIndex++;
    }

    if (filters.region) {
      whereClauses.push(`region ILIKE ${paramIndex}`);
      queryParams.push(`%${filters.region}%`);
      paramIndex++;
    }

    if (filters.search) {
      whereClauses.push(`(name ILIKE ${paramIndex} OR province ILIKE ${paramIndex} OR region ILIKE ${paramIndex})`);
      queryParams.push(`%${filters.search}%`);
      paramIndex++;
    }

    const whereClause = whereClauses.length > 0 
      ? `WHERE ${whereClauses.join(' AND ')}` 
      : '';

    const result = await query(
      `SELECT d.*, 
              COUNT(e.id) as events_count
       FROM districts d
       LEFT JOIN events e ON d.id = e.district_id AND e.status = 'published'
       ${whereClause}
       GROUP BY d.id
       ORDER BY d.name`,
      queryParams
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await query(
      `SELECT d.*, 
              COUNT(e.id) as events_count
       FROM districts d
       LEFT JOIN events e ON d.id = e.district_id AND e.status = 'published'
       WHERE d.id = $1
       GROUP BY d.id`,
      [id]
    );
    return result.rows[0];
  }

  static async findByName(name) {
    const result = await query('SELECT * FROM districts WHERE name = $1', [name]);
    return result.rows[0];
  }

  static async create(districtData) {
    const { name, province, region } = districtData;
    const result = await query(
      'INSERT INTO districts (name, province, region) VALUES ($1, $2, $3) RETURNING *',
      [name, province, region]
    );
    return result.rows[0];
  }

  static async update(id, districtData) {
    const { name, province, region } = districtData;
    const result = await query(
      'UPDATE districts SET name = $1, province = $2, region = $3 WHERE id = $4 RETURNING *',
      [name, province, region, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM districts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getProvinces() {
    const result = await query(
      'SELECT DISTINCT province FROM districts WHERE province IS NOT NULL ORDER BY province'
    );
    return result.rows.map(row => row.province);
  }

  static async getRegions() {
    const result = await query(
      'SELECT DISTINCT region FROM districts WHERE region IS NOT NULL ORDER BY region'
    );
    return result.rows.map(row => row.region);
  }

  static async getEventsCount(id) {
    const result = await query(
      'SELECT COUNT(*) FROM events WHERE district_id = $1 AND status = $2',
      [id, 'published']
    );
    return parseInt(result.rows[0].count);
  }

  static async getByProvince(province) {
    const result = await query(
      'SELECT * FROM districts WHERE province = $1 ORDER BY name',
      [province]
    );
    return result.rows;
  }

  static async getByRegion(region) {
    const result = await query(
      'SELECT * FROM districts WHERE region = $1 ORDER BY province, name',
      [region]
    );
    return result.rows;
  }
}

