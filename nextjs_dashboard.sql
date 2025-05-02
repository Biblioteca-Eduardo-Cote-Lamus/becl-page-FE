-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2025 a las 21:53:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nextjs_dashboard`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrusel_landing`
--

CREATE TABLE `carrusel_landing` (
  `imagen` text DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrusel_landing`
--

INSERT INTO `carrusel_landing` (`imagen`, `id`) VALUES
('1.webp', 1),
('2.webp', 2),
('3.webp', 3),
('4.webp', 4),
('5.webp', 5),
('6.webp', 6),
('8.webp', 8),
('10.webp', 10),
('11.webp', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `image_url`, `created_at`) VALUES
(1, 'Usuario Demo', 'demo@example.com', 'https://example.com/avatar1.jpg', '2025-03-14 16:00:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desarrolladores`
--

CREATE TABLE `desarrolladores` (
  `nombre` text DEFAULT NULL,
  `cargo` text DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `id` int(11) NOT NULL,
  `linkedin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `desarrolladores`
--

INSERT INTO `desarrolladores` (`nombre`, `cargo`, `imagen`, `id`, `linkedin`) VALUES
('Marcos Mejía', 'Creador y Desarrollador', 'marcos.webp', 1, 'https://www.linkedin.com/in/marcos-david-mejia-gomez-120b55338'),
('Anderson Patiño', 'Creador y Desarrollador', 'patino.webp', 2, 'https://www.linkedin.com/in/anderson-david-pati%C3%B1o-caicedo/'),
('Joel Lizarazo', 'Desarrollador', 'joel.jpeg', 3, 'https://www.linkedin.com/in/joellizarazo/'),
('Kevin Tarazona', 'Desarrollador', 'kevin.webp', 4, 'https://www.linkedin.com/in/kevin-alejandro-tarazona-botello-b8544b24b/');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos_importancia`
--

CREATE TABLE `documentos_importancia` (
  `id` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documentos_importancia`
--

INSERT INTO `documentos_importancia` (`id`, `descripcion`, `url`) VALUES
(1, 'Presentación Trabajo de Grado BECL', 'https://drive.google.com/file/d/15v5JNq7b8tqjDz39we4rhRFvixdaKN9P/view?usp=drive_link'),
(2, 'Normatividad', 'https://drive.google.com/file/d/1LX-LxYKQU48KjM147OnRB_6U2rpi3CEy/view?usp=drive_link'),
(3, 'Norma APA BECL', 'https://drive.google.com/file/d/1cf3cQhXt2VNaNiINJMctc0LyYVcILAyk/view?usp=drive_link'),
(4, 'Esquema hoja de resumen', 'https://drive.google.com/file/d/1tiB9xb9vK4nYl1HvvP02xalsk149cedj/view?usp=drive_link'),
(5, 'Reglamento Biblioteca Actualizado 2016', 'https://drive.google.com/file/d/1ylCj0VlhjJodVhOlvQbD1yg3m1QMVorm/view?usp=drive_link'),
(6, 'Reproducción Total Parcial del Trabajo de Grado', 'https://drive.google.com/file/d/1ceGzzAiGLYIEcN7VmvZGSniMRbRiEsPI/view?usp=drive_link');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `lugar_id` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `enlace_facebook` text DEFAULT NULL,
  `enlace_youtube` text DEFAULT NULL,
  `enlace_google_meet` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `titulo`, `lugar_id`, `fecha`, `hora`, `enlace_facebook`, `enlace_youtube`, `enlace_google_meet`) VALUES
(1, 'Jueves de Cultura', 1, '2024-11-30', '17:00:00', NULL, NULL, 'https://meet.google.com/xxn-cadm-uoc'),
(2, 'Capacitación BD', 2, '2024-11-29', '02:00:00', 'https://meet.google.com/xxn-cadm-uoc', NULL, 'https://meet.google.com/xxn-cadm-uoc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

CREATE TABLE `experiencia` (
  `id` int(11) NOT NULL,
  `imagen_qr` text NOT NULL,
  `enlace` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `experiencia`
--

INSERT INTO `experiencia` (`id`, `imagen_qr`, `enlace`) VALUES
(1, 'QR.png', 'https://forms.gle/gBAhjbZvb1Ztwrrt8');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionarios_becl`
--

CREATE TABLE `funcionarios_becl` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `cargo` text NOT NULL,
  `imagen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `funcionarios_becl`
--

INSERT INTO `funcionarios_becl` (`id`, `nombre`, `cargo`, `imagen`) VALUES
(1, 'PhD. Eduard Puerto', 'Director de Biblioteca', 'puerto.jpg'),
(2, 'Inés Vera', 'Secretaria de Biblioteca', 'ines.jpg'),
(3, 'Bradys Monterroza', 'Administrador Sistema de Información de Biblioteca', 'bradys.jpeg'),
(4, 'Fabio Duarte', 'Personal de Planta, Procesos Técnicos', 'fabio.jpeg'),
(5, 'Patricia Guevara', 'Préstamos y Devoluciones', 'patricia.jpg'),
(6, 'Luis Carreño', 'Personal de Planta, Préstamos y Devoluciones', 'alberto.jpg'),
(7, 'Alirio Moreno', 'Personal de Planta, Sala de Cómputo', 'alirio.jpeg'),
(8, 'Zulma Castellanos', 'Personal ATF, Auxiliar de Biblioteca', 'zulma.jpeg'),
(9, 'Belsy Rangel', 'Personal ATF, Auxiliar de Biblioteca', 'belsy.jpeg'),
(10, 'Efrain Vega', 'Personal ATF, Auxiliar de Biblioteca', 'leonardo.jpeg'),
(11, 'William Caballero', 'Personal ATF, Auxiliar de Biblioteca', 'william.jpeg'),
(12, 'Claudia Martines', 'Personal ATF, Auxiliar de Biblioteca', 'celis.jpeg'),
(13, 'Bertha Sanchez', 'Personal ATF, Auxiliar de Biblioteca', 'bertha.jpeg'),
(14, 'Cesar Mazabel', 'Personal ATF, Auxiliar de Biblioteca', 'cesar.jpeg'),
(15, 'Nancy Vera', 'Personal ATF, Auxiliar de Biblioteca', 'nancy.jpg'),
(16, 'Joan Melano', 'Personal ATF, Auxiliar de Biblioteca', 'joan.jpg'),
(17, 'Sandra Sosa', 'Personal ATF, Auxiliar de Biblioteca', 'sosa.jpeg'),
(18, 'Sandra Monsalve', 'Personal ATF, Auxiliar de Biblioteca', 'sandra.jpeg'),
(19, 'Jenner Sepulveda', 'Personal ATF, Auxiliar de Biblioteca', 'alex.jpeg'),
(20, 'Oscar Rivera', 'Personal ATF, Auxiliar de Biblioteca', 'oscar.jpeg'),
(21, 'José García', 'Personal ATF, Auxiliar de Biblioteca', 'joseluis.jpeg'),
(22, 'Monica Figueredo', 'Personal ATF, Auxiliar de Biblioteca', 'monica.jpeg'),
(23, 'Aleyda Sinisterra', 'Personal ATF, Auxiliar de Biblioteca', 'aleyda.jpeg'),
(24, 'Jessica Flechas', 'Personal ATF, Auxiliar de Biblioteca', 'jessica.jpeg'),
(25, 'Joel Lizarazo', 'Personal ATF, Auxiliar de Biblioteca', 'joel.jpeg'),
(26, 'Isabel Mandón', 'Personal ATF, Préstamos y Devoluciones', 'mariaisabel.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hitos`
--

CREATE TABLE `hitos` (
  `id` int(11) NOT NULL,
  `anio` year(4) NOT NULL,
  `imagen` text NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hitos`
--

INSERT INTO `hitos` (`id`, `anio`, `imagen`, `descripcion`) VALUES
(1, '1967', 'acta-42.png', 'El 27 de julio, se crea el acta #42 en la cuál se plantea la creación de la Biblioteca'),
(2, '1969', 'infraestructura.png', 'Se da inicio a la construcción de la primera infraestructura de la Biblioteca'),
(3, '1972', 'nacimiento.png', 'El 14 de enero nace la biblioteca con la dirección de Alfredo Osorio Jácome, como primer director de la Biblioteca'),
(4, '1998', 'traslado.png', 'En noviembre la Biblioteca se traslada a la casona por motivos de renovación por motivos de expansión y renovación de su infraestructura'),
(5, '2000', 'renovacion.jpg', 'En marzo se inauguró la renovación física de la Biblioteca'),
(6, '2010', 'inauguracion.jpg', 'Se inaugura la totalidad de la planta física de la Biblioteca, la cual comprende 14 salas de lectura, una, sala de hemeroteca, un auditorio y una sala de computo y sus diversas oficinas'),
(7, '2022', 'BECL-2022.png', 'La Biblioteca ha seguido su mejoramiento continuo tanto en su infraestructura física como digital para brindar el mejor servicio y acompañamiento a toda la comunidad UFPS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_carrusel`
--

CREATE TABLE `imagenes_carrusel` (
  `id` int(11) NOT NULL,
  `imagen` text NOT NULL,
  `visible` tinyint(1) DEFAULT 1,
  `enlace` text DEFAULT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes_carrusel`
--

INSERT INTO `imagenes_carrusel` (`id`, `imagen`, `visible`, `enlace`, `descripcion`) VALUES
(1, 'EBSCO.png', 1, 'https://login.intelproxy.com/v2/inicio?cuenta=PMmT9Q5hVsBj3Atu&amp;url=ezp.2aHR0cHM6Ly9zZWFyY2guZWJzY29ob3N0LmNvbS9sb2dpbi5hc3B4P2F1dGh0eXBlPWlwLHVpZCZjdXN0aWQ9bnMwODA2NDMmZ3JvdXBpZD1tYWluJnByb2ZpbGU9ZWhvc3QmZGVmYXVsdGRiPWUwODZ0d3c-', 'EBSCOhost'),
(2, 'ieee-1.png', 1, 'https://login.intelproxy.com/v2/inicio?cuenta=PMmT9Q5hVsBj3Atu&url=ezp.2aHR0cHM6Ly9pZWVleHBsb3JlLmllZWUub3JnLw--', 'IEEE'),
(3, 'NNN.png', 1, 'https://www-nnnconsult-com.bdbiblioteca.ufps.edu.co/?_gl=1*146mguz*_ga*MTgyOTE0NDg3MC4xNjgzNzI5OTU3*_ga_TDT0FKWR34*MTcyODcwNjc0Ni40Ny4xLjE3Mjg3MDg1NjYuMC4wLjA.', 'NNNConsult'),
(4, 'Legis.png', 1, 'https://login.bdbiblioteca.ufps.edu.co/login?url=https://www.gestionhumana.com/legis-sso-openid-connect/legis_sso/&_gl=1*gthb5h*_ga*MTgyOTE0NDg3MC4xNjgzNzI5OTU3*_ga_TDT0FKWR34*MTcyODcwNjc0Ni40Ny4xLjE3Mjg3MDg1NjYuMC4wLjA.', 'Legis'),
(5, 'ClinicalKey.png', 1, 'https://www-clinicalkey-com.bdbiblioteca.ufps.edu.co/student/nursing/login?target=%2Fstudent%2Fnursing&_gl=1*gthb5h*_ga*MTgyOTE0NDg3MC4xNjgzNzI5OTU3*_ga_TDT0FKWR34*MTcyODcwNjc0Ni40Ny4xLjE3Mjg3MDg1NjYuMC4wLjA.', 'ClinicalKey'),
(6, 'Wolfram.png', 1, 'https://acortar.link/b9e1i1', 'Wolfram'),
(7, 'Micromedex.png', 1, 'https://www-micromedexsolutions-com.bdbiblioteca.ufps.edu.co/home/dispatch/?_gl=1*pjvipv*_ga*MTgyOTE0NDg3MC4xNjgzNzI5OTU3*_ga_TDT0FKWR34*MTcyODcwNjc0Ni40Ny4xLjE3Mjg3MDg1NjYuMC4wLjA.', 'Micromedex');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_mision_vision`
--

CREATE TABLE `info_mision_vision` (
  `id` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `info_mision_vision`
--

INSERT INTO `info_mision_vision` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Misión', 'La biblioteca de la Universidad Francisco de Paula Santander tiene como misión recopilar, clasificar, preservar y poner a disposición de la comunidad universitaria y regional toda la Información posible de las diferentes áreas del conocimiento en diversos formatos, para el mejoramiento de la formación profesional de los estudiantes y su comunidad académica.'),
(2, 'Visión', 'La biblioteca de la Universidad Francisco de Paula Santander tiene como visión ser líderes en el uso de las nuevas tecnologías de la información para conectarnos con el mundo científico y cultural; poniendo al alcance de la comunidad universitaria todo el conocimiento de punta en las distintas áreas del saber.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugares`
--

CREATE TABLE `lugares` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lugares`
--

INSERT INTO `lugares` (`id`, `nombre`) VALUES
(1, 'Auditorio Biblioteca Eduardo Cote Lamus'),
(2, 'Sala de cómputo'),
(3, 'Sala de semilleros de investigación'),
(4, 'Sala de hemeroteca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `titular` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` text NOT NULL,
  `importante` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_tutorial`
--

CREATE TABLE `servicios_tutorial` (
  `id` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `tutorial` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios_tutorial`
--

INSERT INTO `servicios_tutorial` (`id`, `nombre`, `tutorial`) VALUES
(1, 'Catálogo en línea', 'https://drive.google.com/file/d/1OLinVYvaPDodtG77RJqivANUlznvKkE2/view?usp=sharing'),
(2, 'Bibliotecas Digitales', 'https://drive.google.com/file/d/1OPoatvMTayezkF6NEsOXddojKLUy_Otz/view?usp=sharing');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `role` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `created_at`, `updated_at`, `last_login`, `is_active`, `role`) VALUES
('5e3780ee-c9e4-41c3-a4a0-e4c429667ba5', 'marcosd9669@gmail.com', '$2b$10$0aINVz2Q/883ZcJnqjdT/O7Z6kJC1pRbEuiy6I/Djc8XJzOUjLcG2', 'Marcos Mejia', '2025-04-10 20:55:59', '2025-04-22 19:32:35', '2025-04-22 19:32:35', 1, 'admin'),
('e3300fd9-1721-11f0-819a-bce92fb93ce9', 'pancho@gmail.com', '$2a$10$6S3dt2yPNArfMDPv2wdsEugrQP2isLdeTvKF9lrZEeoGZ2El2as1G', 'pancho', '2025-04-11 22:11:16', '2025-04-11 22:11:16', NULL, 1, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrusel_landing`
--
ALTER TABLE `carrusel_landing`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `desarrolladores`
--
ALTER TABLE `desarrolladores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `documentos_importancia`
--
ALTER TABLE `documentos_importancia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lugar_id` (`lugar_id`);

--
-- Indices de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `funcionarios_becl`
--
ALTER TABLE `funcionarios_becl`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hitos`
--
ALTER TABLE `hitos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes_carrusel`
--
ALTER TABLE `imagenes_carrusel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `info_mision_vision`
--
ALTER TABLE `info_mision_vision`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lugares`
--
ALTER TABLE `lugares`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios_tutorial`
--
ALTER TABLE `servicios_tutorial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrusel_landing`
--
ALTER TABLE `carrusel_landing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `desarrolladores`
--
ALTER TABLE `desarrolladores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `documentos_importancia`
--
ALTER TABLE `documentos_importancia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `funcionarios_becl`
--
ALTER TABLE `funcionarios_becl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `hitos`
--
ALTER TABLE `hitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `imagenes_carrusel`
--
ALTER TABLE `imagenes_carrusel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `info_mision_vision`
--
ALTER TABLE `info_mision_vision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `lugares`
--
ALTER TABLE `lugares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios_tutorial`
--
ALTER TABLE `servicios_tutorial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`lugar_id`) REFERENCES `lugares` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
