import { query } from '../config/database.js';

export class Role {
  static async findAll() {
    const result = await query('SELECT * FROM roles ORDER BY id');
    return result.rows;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByName(name) {
    const result = await query('SELECT * FROM roles WHERE name = $1', [name]);
    return result.rows[0];
  }

  static async create(roleData) {
    const { name, description } = roleData;
    const result = await query(
      'INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  }

  static async update(id, roleData) {
    const { name, description } = roleData;
    const result = await query(
      'UPDATE roles SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM roles WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
