/*
import express from 'express'
import cors from 'cors'
import pkg from 'pg'

const { Pool } = pkg

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

const pool = new Pool({
  user: 'u0_a562',
  host: 'localhost',
  database: 'cultura_db',
  password: '',
  port: 5432
})

app.get('/api/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users')
  res.json(result.rows)
})

app.post('/api/register', async (req, res) => {

 const { fullName, email, password } = req.body

await pool.query(
  `INSERT INTO users (full_name, email, password)
   VALUES ($1, $2, $3)`,
  [fullName, email, password]
)

  res.json({ ok: true })
})

app.listen(3000, () => {
  console.log('✅ Backend corriendo en http://localhost:3000')
})
*/

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from './db.js'

const app = express()
const PORT = 3000

// CLAVE JWT (en producción va en .env)
const JWT_SECRET = 'super_secreta_123'

// Middlewares
app.use(cors())
app.use(express.json())

/* =========================
   REGISTER (ya lo tienes)
========================= */
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(
      `INSERT INTO users (full_name, email, password)
       VALUES ($1, $2, $3)`,
      [fullName, email, hashedPassword]
    )

    res.status(201).json({ message: 'Usuario registrado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar' })
  }
})

/* =========================
   LOGIN
========================= */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Buscar usuario
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    const user = result.rows[0]

    // 2. Comparar password
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // 3. Crear JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    // 4. Responder
    res.json({
      message: 'Login correcto',
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en login' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
