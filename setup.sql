-- Drop existing tables if they exist
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS servicios_tutorial;
DROP TABLE IF EXISTS noticias;
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS lugares;
DROP TABLE IF EXISTS info_mision_vision;
DROP TABLE IF EXISTS imagenes_carrusel;
DROP TABLE IF EXISTS hitos;
DROP TABLE IF EXISTS funcionarios_becl;
DROP TABLE IF EXISTS experiencia;
DROP TABLE IF EXISTS documentos_importancia;

-- Create tables
CREATE TABLE documentos_importancia (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    url         TEXT NOT NULL
);

CREATE TABLE experiencia (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    imagen_qr TEXT NOT NULL,
    enlace    TEXT NOT NULL
);

CREATE TABLE funcionarios_becl (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT NOT NULL,
    cargo  TEXT NOT NULL,
    imagen TEXT NOT NULL
);

CREATE TABLE hitos (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    anio        YEAR NOT NULL,
    imagen      TEXT NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE imagenes_carrusel (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    imagen      TEXT NOT NULL,
    visible     TINYINT(1) DEFAULT 1,
    enlace      TEXT,
    descripcion TEXT NOT NULL
);

CREATE TABLE info_mision_vision (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    nombre      TEXT,
    descripcion TEXT
);

CREATE TABLE lugares (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE eventos (
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    titulo             VARCHAR(255) NOT NULL,
    lugar_id           INT,
    fecha              DATE NOT NULL,
    hora               TIME NOT NULL,
    enlace_facebook    TEXT,
    enlace_youtube     TEXT,
    enlace_google_meet TEXT,
    FOREIGN KEY (lugar_id) REFERENCES lugares(id)
);

CREATE TABLE noticias (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titular     VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen      TEXT NOT NULL,
    importante  TINYINT(1) DEFAULT 0
);

CREATE TABLE servicios_tutorial (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    nombre   TEXT,
    tutorial TEXT
);

CREATE TABLE usuarios (
    id     INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email  VARCHAR(255) NOT NULL UNIQUE,
    clave  VARBINARY(255) NOT NULL
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