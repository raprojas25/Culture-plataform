import pool from '../../config/db.js';

export const findRoleByName = async (name) => {
  const { rows } = await pool.query(
    'SELECT id FROM roles WHERE name = $1 LIMIT 1',
    [name]
  );

  return rows[0];
};
