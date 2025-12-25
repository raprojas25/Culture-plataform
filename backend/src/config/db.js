/*
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
*/
/*
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

export default pool;
*/
//claude
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
