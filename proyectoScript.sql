-- -----------------------------------------------------
-- Schema parcial2
-- -----------------------------------------------------
CREATE DATABASE parcial2;
USE parcial2 ;

-- -----------------------------------------------------
-- Table usuarios
-- -----------------------------------------------------
CREATE TABLE usuarios (
  id_usuarios INT(10) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  username VARCHAR(45) NOT NULL,
  clave VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_usuarios)
);


-- -----------------------------------------------------
-- Table videojuego
-- -----------------------------------------------------
CREATE TABLE videojuego (
  id_videojuego INT(10) NOT NULL,
  titulo VARCHAR(45) NOT NULL,
  descripcion VARCHAR(100) NULL,
  calificacion INT(5) NOT NULL,
  precio DECIMAL(9,2) NOT NULL,
  PRIMARY KEY (id_videojuego)
);


-- -----------------------------------------------------
-- Table actividades_usuarios
-- -----------------------------------------------------
CREATE TABLE actividades_usuarios (
  id_actividad INT(10) NOT NULL,
  nombre_actividad VARCHAR(45) NOT NULL,
  usuarios_id INT(10) NOT NULL,
  PRIMARY KEY (id_actividad),
  CONSTRAINT fk_actividades_usuarios
    FOREIGN KEY (usuarios_id)
    REFERENCES usuarios (id_usuarios)
);


-- -----------------------------------------------------
-- Table juegos_vendidos
-- -----------------------------------------------------
CREATE TABLE juegos_vendidos (
  id_usuario INT(10) NOT NULL,
  id_videojuego INT(10) NOT NULL,
  PRIMARY KEY (id_usuario, id_videojuego),
  CONSTRAINT fk_usuarios_videojuego_idx
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuarios),
  CONSTRAINT fk_videojuego_usuarios_idx
    FOREIGN KEY (id_videojuego)
    REFERENCES videojuego (id_videojuego)
);


-- -----------------------------------------------------
-- Table administradores
-- -----------------------------------------------------
CREATE TABLE administradores (
  id_admin INT(10) NOT NULL,
  usuario VARCHAR(45) NOT NULL,
  clave VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_admin)
);


-- -----------------------------------------------------
-- Table actividades_admin
-- -----------------------------------------------------
CREATE TABLE actividades_admin (
  id_actividad INT(10) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  id_admin INT(10) NOT NULL,
  PRIMARY KEY (id_actividad),
  CONSTRAINT fk_actividades_admin_administradores1
    FOREIGN KEY (id_admin)
    REFERENCES parcial2.administradores (id_admin)
);

-- ----------------------------------------------------
-- CAMBIOS POSTERIORES
-- ----------------------------------------------------
ALTER TABLE `usuarios` 
ADD `correo` VARCHAR( 100 ) NOT NULL AFTER `nombre` ,
ADD `telefono` INT( 10 ) NULL AFTER `correo`;
ALTER TABLE `usuarios` CHANGE `id_usuarios` `id_usuarios` INT( 10 ) NOT NULL AUTO_INCREMENT;

ALTER TABLE `actividades_admin` ADD `enlace` VARCHAR( 50 ) NOT NULL DEFAULT '/' AFTER `id_admin`;

DROP TABLE actividades_admin;
DROP TABLE actividades_usuarios;
DROP TABLE administradores;

CREATE TABLE actividades (
  id_actividad INT(10) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  enlace VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_actividad)
);

CREATE TABLE gest_actividades(
  id_gest INT(10) NOT NULL,
  id_act INT(10) NOT NULL,
  id_usuario INT(10) NOT NULL,
  PRIMARY KEY (id_gest),
  CONSTRAINT fk_gest_actividades_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuarios),
  CONSTRAINT fk_gest_actividades_actividades
    FOREIGN KEY (id_act)
    REFERENCES actividades (id_actividad)
);

-- Insertando actividades
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (101,"Cerrar sesion","/logout");
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (102,"Lista de usuarios","/");
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (103,"Lista de videojuegos","/");
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (104,"Ver perfil","/");
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (105,"Ver videojuegos","/");
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (106,"Gestionar actividades","/");
INSERT INTO `actividades`(`id_actividad`, `nombre`, `enlace`) VALUES (107,"Menu principal","/dashboard");

-- Gestionando las actividades del ADMIN
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (1001, 101, 10);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (1002, 102, 10);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (1003, 103, 10);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (1004, 106, 10);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (1005, 107, 10);

-- Añadiendo la actividad CERRAR SESION a todos los usuarios
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2001, 101, 2);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2002, 101, 3);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2003, 101, 5);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2004, 101, 6);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2005, 101, 7);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2006, 101, 8);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2007, 107, 2);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2008, 107, 3);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2009, 107, 5);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2010, 107, 6);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2011, 107, 7);
INSERT INTO `gest_actividades`(`id_gest`, `id_act`, `id_usuario`) VALUES (2012, 107, 8);