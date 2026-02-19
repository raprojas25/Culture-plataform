import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

dotenv.config();

const app = express();

// Configuración de seguridad
app.use(helmet());

// Configuración de CORS
/*
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
*/
app.use(cors());
// Límite de peticiones
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por IP
});
app.use('/api/', limiter);

// Middleware para parsear JSON
app.use(express.json());
///////
// ... imports anteriores
import categoryRoutes from './routes/categoryRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import districtRoutes from './routes/districtRoutes.js';

// ... configuración anterior

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/districts', districtRoutes);

// ... resto del archivo

// Rutas
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/roles', roleRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Middleware para manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

export default app;
