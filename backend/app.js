const express = require('express')
const pool = require('./db')
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
/*
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
*/
// app.use(express.json())
/*
app.get('/', (req, res) => {
  res.send('Backend activo')
})
*/
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

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos' })
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [email, password]
    )

    res.json({
      message: 'Usuario registrado',
      user: result.rows[0]
    })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El usuario ya existe' })
    }

    console.error(err)
    res.status(500).json({ error: 'Error del servidor' })
  }
})

