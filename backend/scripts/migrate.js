import pool from '../src/config/database.js';

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Crear tabla de roles
    await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
      );
    `);

    // Crear tabla de usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role_id INTEGER NOT NULL REFERENCES roles(id),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        last_login TIMESTAMP,
        last_ip VARCHAR(45),
        user_agent TEXT
      );
    `);

    // Insertar roles por defecto
    await client.query(`
      INSERT INTO roles (name, description) 
      VALUES 
        ('admin', 'Administrador del sistema'),
        ('user', 'Usuario regular'),
        ('moderator', 'Moderador')
      ON CONFLICT (name) DO NOTHING;
    `);

// Tablas existentes (roles, users)...

    // Crear tabla districts
    await client.query(`
      CREATE TABLE IF NOT EXISTS districts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        city VARCHAR(100),
        province VARCHAR(100),
        country VARCHAR(100) DEFAULT 'Perú',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Crear tabla categories
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        icon VARCHAR(100),
        color VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW(),
        description TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE
      );
    `);

    // Crear tabla events
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
        start_datetime TIMESTAMP NOT NULL,
        end_datetime TIMESTAMP,
        district_id INTEGER REFERENCES districts(id),
        address VARCHAR(255),
        latitude NUMERIC(9,6),
        longitude NUMERIC(9,6),
        price_type VARCHAR(20) DEFAULT 'free',
        price_amount NUMERIC(10,2),
        featured_level SMALLINT DEFAULT 0,
        status VARCHAR(20) DEFAULT 'draft',
        main_image TEXT,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Crear tabla event_likes
    await client.query(`
      CREATE TABLE IF NOT EXISTS event_likes (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(event_id, user_id)
      );
    `);

    // Crear tabla event_images
    await client.query(`
      CREATE TABLE IF NOT EXISTS event_images (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
        image_url TEXT NOT NULL,
        is_main BOOLEAN DEFAULT FALSE,
        alt_text VARCHAR(255),
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Insertar datos iniciales
    await client.query(`
      INSERT INTO districts (name, city, province) 
      VALUES 
        ('Miraflores', 'Lima', 'Lima'),
        ('Barranco', 'Lima', 'Lima'),
        ('San Isidro', 'Lima', 'Lima'),
        ('Cercado de Lima', 'Lima', 'Lima')
      ON CONFLICT DO NOTHING;
    `);

    await client.query(`
      INSERT INTO categories (name, icon, color, description) 
      VALUES 
        ('Conciertos', 'music', '#FF6B6B', 'Eventos musicales y conciertos'),
        ('Teatro', 'theater', '#4ECDC4', 'Obras de teatro y espectáculos'),
        ('Deportes', 'sports', '#45B7D1', 'Eventos deportivos y competencias'),
        ('Arte', 'art', '#96CEB4', 'Exposiciones de arte y galerías'),
        ('Gastronomía', 'food', '#FFEAA7', 'Eventos de comida y degustaciones'),
        ('Tecnología', 'tech', '#DDA0DD', 'Conferencias y meetups tecnológicos')
      ON CONFLICT (name) DO NOTHING;
    `);

    await client.query('COMMIT');
    console.log('✅ Tablas creadas exitosamente');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al crear tablas:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

createTables();

