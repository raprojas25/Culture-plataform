import { query } from "../config/database.js";

export class User {
  static async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const result = await query(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       ORDER BY u.created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const countResult = await query("SELECT COUNT(*) FROM users");
    const total = parseInt(countResult.rows[0].count);

    return {
      users: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async findById(id) {
    const result = await query(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       WHERE u.id = $1`,
      [id],
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  }

  static async create(userData) {
    const {
      username,
      email,
      password_hash,
      role_id = 2,
      is_active = true,
    } = userData;

    const result = await query(
      `INSERT INTO users 
       (username, email, password_hash, role_id, is_active) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [username, email, password_hash, role_id, is_active],
    );
    return result.rows[0];
  }

  static async update(id, userData) {
    const { username, email, role_id, is_active } = userData;

    const result = await query(
      `UPDATE users 
       SET username = $1, email = $2, role_id = $3, 
           is_active = $4, updated_at = NOW() 
       WHERE id = $5 
       RETURNING *`,
      [username, email, role_id, is_active, id],
    );
    return result.rows[0];
  }

  static async updatePassword(id, passwordHash) {
    const result = await query(
      "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [passwordHash, id],
    );
    return result.rows[0];
  }

  static async updateLastLogin(id, lastIp, userAgent) {
    const result = await query(
      "UPDATE users SET last_login = NOW(), last_ip = $1, user_agent = $2 WHERE id = $3",
      [lastIp, userAgent, id],
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query("DELETE FROM users WHERE id = $1 RETURNING *", [
      id,
    ]);
    return result.rows[0];
  }

  static async deactivate(id) {
    const result = await query(
      "UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }
}
