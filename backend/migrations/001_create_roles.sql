CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

INSERT INTO roles (name, description) VALUES
('user', 'Usuario normal'),
('admin', 'Administrador'),
('super_admin', 'Control total');
