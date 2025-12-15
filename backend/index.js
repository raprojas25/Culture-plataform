const express = require('express')
const pool = require('./db')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend activo')
})

// endpoint de prueba
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username FROM users')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error en BD' })
  }
})

app.listen(3000, () => {
  console.log('🚀 Backend en http://localhost:3000')
})
