/*
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});
*/
import app from './app.js';
import { env } from './config/env.js';
import { testConnection } from './config/database.js';

const startServer = async () => {
  try {
    await testConnection();

    app.listen(env.port, () => {
      console.log(`🚀 Server corriendo en http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar:', err);
    process.exit(1);
  }
};

startServer();
