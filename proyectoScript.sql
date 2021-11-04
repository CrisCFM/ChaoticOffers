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
