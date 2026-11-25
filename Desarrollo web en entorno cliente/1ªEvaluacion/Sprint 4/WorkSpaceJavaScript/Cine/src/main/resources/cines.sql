-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2026 a las 21:17:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cines`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `idPelicula` int(10) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `sinopsis` varchar(1000) NOT NULL,
  `duracion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`idPelicula`, `titulo`, `sinopsis`, `duracion`) VALUES
(1, 'Scrooge y los fantasmas de la Navidad', 'Reimaginación del clásico literario, una historia de fantasmas ambientada en el Londres de Dickens que sigue el viaje sobrenatural de un hombre para enfrentarse a su pasado, presente y futuro y luchar por una segunda oportunidad.', '1h 57min'),
(2, 'La bola negra', 'La bola negra narra las vidas interconectadas de tres hombres en tres épocas distintas. Tres existencias íntimamente ligadas por la sexualidad y el deseo, el dolor y la herencia; y una de las últimas obras, inacabada, de Federico García Lorca', '2h 39min'),
(3, 'Cómo robar un banco', 'En Cómo robar un banco, una banda de ladrones experta en redes sociales retransmite sus atrevidos atracos sin saber que su creciente fama viral los ha puesto en el punto de mira de un veterano agente del FBI y una brillante ingeniera de software. Mientras este improbable dúo se acerca cada vez más a ellos, la organización criminal lleva sus límites al extremo, arriesgándolo todo por sus ideales y por el golpe más ambicioso de sus vidas.', '2h 1min'),
(4, 'Wild Horse Nine', 'Poco antes del golpe de Estado chileno de 1973, los agentes de la CIA Chris (John Malkovich) y Lee (Sam Rockwell) son enviados desde Santiago a la Isla de Pascua por su jefe de oficina, MJ (Steve Buscemi). Entre las emblemáticas estatuas de la isla, y mientras los veteranos compañeros se enfrentan a sus oscuros pasados y a las conspiraciones del presente, el nuevo vínculo de Chris con dos estudiantes rebeldes (Mariana di Girolamo y Ailín Salas) amenaza con dar un giro inesperado al viaje de todos a este remoto paraíso.', '1h 56min');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `pwdUsuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `pwdUsuario`) VALUES
(1, 'Mark', 'Mark'),
(2, 'Jacob', 'Jacob'),
(3, 'Larry', 'Larry'),
(4, 'Steve', 'Steve'),
(5, 'Ramon', 'Ramon'),
(6, 'Pepe', 'Pepe'),
(7, 'Encarni', 'Encarni'),
(8, 'Samuel', 'Samuel'),
(9, 'Emma', 'Emma'),
(10, 'Martina', 'Martina');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`idPelicula`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
