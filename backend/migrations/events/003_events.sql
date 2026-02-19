CREATE TABLE events (
  id SERIAL PRIMARY KEY,

  title VARCHAR(255) NOT NULL,
  description TEXT,

  category_id INT
    REFERENCES categories(id)
    ON DELETE SET NULL,

  organizer_id UUID
    REFERENCES users(id)
    ON DELETE CASCADE,

  start_datetime TIMESTAMP NOT NULL,
  end_datetime TIMESTAMP,

  district_id INT
    REFERENCES districts(id)
    ON DELETE SET NULL,

  address VARCHAR(255),

  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),

  price_type VARCHAR(20)
    CHECK (price_type IN ('free','paid'))
    DEFAULT 'free',

  price_amount NUMERIC(10,2),

  featured_level SMALLINT DEFAULT 0
    CHECK (featured_level BETWEEN 0 AND 3),

  status VARCHAR(20)
    CHECK (status IN ('draft','published','cancelled','completed'))
    DEFAULT 'draft',

  main_image TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
