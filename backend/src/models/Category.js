import { query } from "../config/database.js";

export class Category {
  // static async findAll(includeInactive = true) {
  //   const sql = includeInactive
  //     ? 'SELECT * FROM categories ORDER BY name'
  //     : 'SELECT * FROM categories WHERE is_active = true ORDER BY name';
  //   const result = await query(sql);
  //   return result.rows;
  // }
  static async findAll() {
    const sql = "SELECT * FROM categories ORDER BY name";
    const result = await query(sql);
    return result.rows;
  }

  static async findById(id) {
    const result = await query("SELECT * FROM categories WHERE id = \$1", [id]);
    return result.rows[0];
  }

  static async findByName(name) {
    const result = await query("SELECT * FROM categories WHERE name = \$1", [
      name,
    ]);
    return result.rows[0];
  }

  static async create(categoryData) {
    const { name, icon, color, description, is_active = true } = categoryData;
    const result = await query(
      `INSERT INTO categories (name, icon, color, description, is_active) 
       VALUES (\$1, \$2, \$3, \$4, \$5) 
       RETURNING *`,
      [name, icon, color, description, is_active],
    );
    return result.rows[0];
  }

  static async update(id, categoryData) {
    const { name, icon, color, description, is_active } = categoryData;
    const result = await query(
      `UPDATE categories 
       SET name = \$1, icon = \$2, color = \$3, 
           description = \$4, is_active = \$5 
       WHERE id = \$6 
       RETURNING *`,
      [name, icon, color, description, is_active, id],
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query(
      "DELETE FROM categories WHERE id = \$1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }

  static async getEventsCount(id) {
    const result = await query(
      "SELECT COUNT(*) FROM events WHERE category_id = \$1 AND status = \$2",
      [id, "published"],
    );
    return parseInt(result.rows[0].count);
  }

  // static async toggleStatus(id, is_active) {
  //   const result = await query(
  //     `UPDATE categories
  //      SET is_active = $1
  //      WHERE id = $2
  //      RETURNING *`,
  //     [is_active, id]
  //   );
  //   return result.rows[0];
  // }

  static async toggleStatus(id) {
    const result = await query(
      `UPDATE categories 
     SET is_active = NOT is_active
     WHERE id = $1
     RETURNING *`,
      [id],
    );
    return result.rows[0];
  }
}
