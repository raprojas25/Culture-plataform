import pool from '../../config/db.js';

export const createUser = async ({
  username,
  email,
  passwordHash,
  roleId,
}) => {
  const query = `
    INSERT INTO users (username, email, password_hash, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email
  `;

  const values = [username, email, passwordHash, roleId];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findByEmail = async (email) => {
  const query = `
    SELECT 
      u.id,
      u.username,
      u.email,
      u.password_hash,
      r.name AS role
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.email = $1
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

// muevos  metodos 
export const findAll = async () => {
  const { rows } = await pool.query(`
    SELECT u.id, u.username, u.email, r.name AS role, u.is_active
    FROM users u
    JOIN roles r ON r.id = u.role_id
    ORDER BY u.created_at DESC
  `);
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT u.id, u.username, u.email, r.name AS role, u.is_active
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.id = $1
    `,
    [id]
  );
  return rows[0];
};

export const createUserAdmin = async ({
  username,
  email,
  passwordHash,
  roleId,
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO users (username, email, password_hash, role_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email
    `,
    [username, email, passwordHash, roleId]
  );
  return rows[0];
};

export const updateUser = async (id, { username, email, roleId }) => {
  const { rows } = await pool.query(
    `
    UPDATE users
    SET username = $1, email = $2, role_id = $3, updated_at = NOW()
    WHERE id = $4
    RETURNING id, username, email
    `,
    [username, email, roleId, id]
  );
  return rows[0];
};

export const deactivateUser = async (id) => {
  await pool.query(
    `UPDATE users SET is_active = false WHERE id = $1`,
    [id]
  );
};

export const updateLoginAudit = async (id, ip, agent) => {
  await pool.query(
    `
    UPDATE users
    SET last_login = NOW(),
        last_ip = $2,
        user_agent = $3
    WHERE id = $1
    `,
    [id, ip, agent]
  );
};  

