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
      'UPDATE roles SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM roles WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getUsersCount(id) {
    const result = await query(
      'SELECT COUNT(*) FROM users WHERE role_id = $1',
      [id]
    );
    return parseInt(result.rows[0].count);
  }

  static async getPermissions(id) {
    // Esta función puede extenderse si agregas una tabla de permisos
    const result = await query(
      `SELECT 
        CASE 
          WHEN r.name = 'admin' THEN ARRAY['users:read', 'users:write', 'events:read', 'events:write', 'categories:read', 'categories:write', 'districts:read', 'districts:write', 'roles:read', 'roles:write']
          WHEN r.name = 'organizer' THEN ARRAY['events:read', 'events:write', 'categories:read', 'districts:read']
          WHEN r.name = 'user' THEN ARRAY['events:read', 'events:like']
          ELSE ARRAY[]::text[]
        END as permissions
       FROM roles r
       WHERE r.id = $1`,
      [id]
    );
    return result.rows[0]?.permissions || [];
  }
}

