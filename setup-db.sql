-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS nextjs_dashboard;

-- Switch to the database
USE nextjs_dashboard;

-- Drop tables if they exist to ensure clean setup
DROP TABLE IF EXISTS noticias;
DROP TABLE IF EXISTS imagenes_carrusel;
DROP TABLE IF EXISTS experiencia;
DROP TABLE IF EXISTS customers;

-- Create noticias table
CREATE TABLE noticias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  imagen VARCHAR(255),
  orden INT DEFAULT 0
);

-- Create imagenes_carrusel table
CREATE TABLE imagenes_carrusel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  titulo VARCHAR(255),
  descripcion TEXT,
  orden INT DEFAULT 0
);

-- Create experiencia table
CREATE TABLE experiencia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen VARCHAR(255),
  orden INT DEFAULT 0
);

-- Create customers table
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO noticias (titulo, descripcion, fecha, imagen, orden) VALUES
('Bienvenidos a la Biblioteca', 'Descubre todos nuestros servicios', NOW(), 'https://example.com/image1.jpg', 1),
('Nuevos Recursos Digitales', 'Accede a nuestra colección digital', NOW(), 'https://example.com/image2.jpg', 2);

INSERT INTO imagenes_carrusel (url, titulo, descripcion, orden) VALUES
('https://example.com/slide1.jpg', 'Biblioteca Digital', 'Accede a recursos digitales', 1),
('https://example.com/slide2.jpg', 'Espacios de Estudio', 'Conoce nuestras instalaciones', 2);

INSERT INTO experiencia (titulo, descripcion, imagen, orden) VALUES
('Ambiente de Estudio', 'Espacios cómodos para estudiar', 'https://example.com/exp1.jpg', 1),
('Recursos Digitales', 'Acceso a bases de datos académicas', 'https://example.com/exp2.jpg', 2);

INSERT INTO customers (name, email, image_url) VALUES
('Usuario Demo', 'demo@example.com', 'https://example.com/avatar1.jpg'); 