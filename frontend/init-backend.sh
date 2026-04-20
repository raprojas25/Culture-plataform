#!/bin/bash

echo "🚀 Creando estructura backend..."

# Directorios
mkdir -p backend/src/{config,modules/{auth,users,roles},middlewares,utils}
mkdir -p backend/{migrations,seeds}

# Archivos principales
touch backend/src/{app.js,server.js,index.js,routes.js}
touch backend/.env backend/.env.example backend/package.json backend/README.md

# Config
touch backend/src/config/{db.js,env.js,jwt.js}

# Auth
touch backend/src/modules/auth/{auth.routes.js,auth.controller.js,auth.service.js,auth.validation.js}

# Users
touch backend/src/modules/users/{user.routes.js,user.controller.js,user.service.js,user.model.js}

# Roles
touch backend/src/modules/roles/{role.routes.js,role.controller.js,role.service.js,role.model.js}

# Middlewares
touch backend/src/middlewares/{auth.middleware.js,role.middleware.js,error.middleware.js}

# Utils
touch backend/src/utils/{hash.js,response.js,logger.js}

echo "📦 Escribiendo contenido base..."

# =========================
# index.js
# =========================
cat << 'EOF' > backend/src/index.js
import 'dotenv/config';
import './server.js';
EOF

# =========================
# server.js
# =========================
cat << 'EOF' > backend/src/server.js
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en puerto ${PORT}`);
});
EOF

# =========================
# app.js
# =========================
cat << 'EOF' > backend/src/app.js
import express from 'express';
import routes from './routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorMiddleware);

export default app;
EOF

# =========================
# routes.js
# =========================
cat << 'EOF' > backend/src/routes.js
import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import roleRoutes from './modules/roles/role.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
EOF

# =========================
# db.js
# =========================
cat << 'EOF' > backend/src/config/db.js
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
EOF

# =========================
# env.js
# =========================
cat << 'EOF' > backend/src/config/env.js
export const env = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
EOF

# =========================
# jwt.js
# =========================
cat << 'EOF' > backend/src/config/jwt.js
export const jwtConfig = {
  expiresIn: '1d',
};
EOF

# =========================
# AUTH MODULE
# =========================
cat << 'EOF' > backend/src/modules/auth/auth.routes.js
import { Router } from 'express';
import { login } from './auth.controller.js';

const router = Router();

router.post('/login', login);

export default router;
EOF

cat << 'EOF' > backend/src/modules/auth/auth.controller.js
import * as authService from './auth.service.js';

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
EOF

cat << 'EOF' > backend/src/modules/auth/auth.service.js
export const login = async ({ email, password }) => {
  return {
    message: 'Login OK (pendiente lógica)',
    email,
  };
};
EOF

cat << 'EOF' > backend/src/modules/auth/auth.validation.js
export const loginSchema = {
  email: 'required',
  password: 'required',
};
EOF

# =========================
# USERS MODULE
# =========================
cat << 'EOF' > backend/src/modules/users/user.routes.js
import { Router } from 'express';
import { getUsers } from './user.controller.js';

const router = Router();

router.get('/', getUsers);

export default router;
EOF

cat << 'EOF' > backend/src/modules/users/user.controller.js
import * as userService from './user.service.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
EOF

cat << 'EOF' > backend/src/modules/users/user.service.js
import * as userModel from './user.model.js';

export const getUsers = async () => {
  return userModel.findAll();
};
EOF

cat << 'EOF' > backend/src/modules/users/user.model.js
import pool from '../../config/db.js';

export const findAll = async () => {
  const { rows } = await pool.query('SELECT id, email FROM users');
  return rows;
};
EOF

# =========================
# ROLES MODULE
# =========================
cat << 'EOF' > backend/src/modules/roles/role.routes.js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([]);
});

export default router;
EOF

cat << 'EOF' > backend/src/modules/roles/role.controller.js
// pendiente
EOF

cat << 'EOF' > backend/src/modules/roles/role.service.js
// pendiente
EOF

cat << 'EOF' > backend/src/modules/roles/role.model.js
// pendiente
EOF

# =========================
# MIDDLEWARES
# =========================
cat << 'EOF' > backend/src/middlewares/auth.middleware.js
export const authMiddleware = (req, res, next) => {
  next();
};
EOF

cat << 'EOF' > backend/src/middlewares/role.middleware.js
export const roleMiddleware = (role) => (req, res, next) => {
  next();
};
EOF

cat << 'EOF' > backend/src/middlewares/error.middleware.js
export default (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};
EOF

# =========================
# UTILS
# =========================
cat << 'EOF' > backend/src/utils/hash.js
export const hashPassword = async (password) => password;
EOF

cat << 'EOF' > backend/src/utils/response.js
export const success = (data) => ({ success: true, data });
EOF

cat << 'EOF' > backend/src/utils/logger.js
export const logger = console;
EOF

# =========================
# ENV
# =========================
cat << 'EOF' > backend/.env.example
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=database
JWT_SECRET=secret
EOF

echo "✅ Backend creado con éxito"
