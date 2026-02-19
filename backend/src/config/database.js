
/*import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Manejo de errores de conexión
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();

export default pool;
*/

import pkg from 'pg';
import { env } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
});

// Eventos del pool
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL:', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();


// Función para verificar la conexión
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('🔌 Prueba de conexión exitosa');
    console.log(`📊 Base de datos: ${env.db.name}`);
    console.log(`👤 Usuario: ${env.db.user}`);
    
    const result = await client.query('SELECT NOW()');
    console.log('⏰ Servidor DB:', result.rows[0].now);
    
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Error al conectar con PostgreSQL:');
    console.error('Host:', env.db.host);
    console.error('Port:', env.db.port);
    console.error('Database:', env.db.name);
    console.error('User:', env.db.user);
    console.error('Error:', err.message);
    throw err;
  }
};

export default pool;

