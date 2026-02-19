import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar .env desde la raíz de backend/
const envPath = resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

console.log('📁 Cargando .env desde:', envPath);

export const env = {
  port: process.env.PORT || 3000,

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },

  jwtSecret: process.env.JWT_SECRET,
};

// Validar variables requeridas
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
const missing = requiredEnvVars.filter(varName => !process.env[varName]);

if (missing.length > 0) {
  console.error('❌ Faltan variables de entorno requeridas:');
  missing.forEach(varName => console.error(`   - ${varName}`));
  console.error('\n🔍 Variables disponibles:');
  console.error('   DB_NAME:', process.env.DB_NAME || '(vacío)');
  console.error('   DB_USER:', process.env.DB_USER || '(vacío)');
  console.error('   DB_PASSWORD:', process.env.DB_PASSWORD || '(vacío)');
  console.error('   JWT_SECRET:', process.env.JWT_SECRET || '(vacío)');
  process.exit(1);
}

// Debug: Mostrar configuración (sin password)
console.log('🔧 Configuración cargada:');
console.log('   PORT:', env.port);
console.log('   DB_HOST:', env.db.host);
console.log('   DB_PORT:', env.db.port);
console.log('   DB_NAME:', env.db.name);
console.log('   DB_USER:', env.db.user);
console.log('   DB_PASSWORD:', env.db.password ? '***' : '(vacío)');

