-- Script de base de datos para la API REST de usuarios
-- Ejecutar en pgAdmin (Query Tool) dentro de la base de datos que vayas a usar

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  edad INT
);

INSERT INTO usuarios (nombre, correo, edad) VALUES
('Carlos Pérez', 'carlos@mail.com', 22),
('María López', 'maria@mail.com', 20)
ON CONFLICT (correo) DO NOTHING;

SELECT * FROM usuarios;
