const { Pool } = require('pg')

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'cultura_db',
  password: '123456',
  port: 5432
})

// test rápido de conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL', err)
  } else {
    console.log('✅ PostgreSQL conectado:', res.rows[0].now)
  }
})

module.exports = pool
