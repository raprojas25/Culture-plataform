
/*import 'dotenv/config';
import './server.js';
*/
//claude
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { testConnection } from './config/db.js';

// Importar rutas
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a DB antes de iniciar
    console.log('\n🔍 Probando conexión a la base de datos...');
    await testConnection();
    
    app.listen(env.port, () => {
      console.log(`\n🚀 Servidor corriendo en puerto ${env.port}`);
      console.log(`📍 http://localhost:${env.port}`);
      console.log(`💚 Health check: http://localhost:${env.port}/health\n`);
    });
  } catch (error) {
    console.error('\n❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
