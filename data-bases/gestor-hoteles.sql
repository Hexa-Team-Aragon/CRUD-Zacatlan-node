SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS gestorHotelesV2;
CREATE DATABASE IF NOT EXISTS gestorHotelesV2 DEFAULT CHARACTER SET UTF8MB4;
USE gestorHotelesV2;

CREATE TABLE hoteles(
id_ht                           INTEGER NOT NULL AUTO_INCREMENT,
nombre                          VARCHAR(40) NOT NULL,
direccion                       VARCHAR(100) NOT NULL,
telefono                        VARCHAR(10) NOT NULL,
correo                    		VARCHAR(50) NOT NULL,
PRIMARY KEY(id_ht)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE img_hoteles(
id_img							INTEGER NOT NULL AUTO_INCREMENT,
id_ht							INTEGER NOT NULL,
nombreImagen					VARCHAR(100) NOT NULL,
PRIMARY KEY(id_img),
UNIQUE(id_ht, nombreImagen),
FOREIGN KEY(id_ht) REFERENCES hoteles(id_ht) ON DELETE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE gerentes(
id_gr                           INTEGER NOT NULL AUTO_INCREMENT,
id_ht							INTEGER NOT NULL,
nombre                          VARCHAR(40) NOT NULL,
apellido_paterno                VARCHAR(20) NOT NULL,
apellido_materno                VARCHAR(20) NOT NULL,
telefono                   		VARCHAR(10) NOT NULL,
PRIMARY KEY(id_gr),
UNIQUE(id_ht),
FOREIGN KEY(id_ht) REFERENCES hoteles(id_ht) ON DELETE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE img_gerentes(
id_img							INTEGER NOT NULL AUTO_INCREMENT,
id_gr                           INTEGER NOT NULL,
nombreImagen					VARCHAR(100) NOT NULL,
PRIMARY KEY (id_img),
UNIQUE(id_gr),
FOREIGN KEY(id_gr) REFERENCES gerentes(id_gr) ON DELETE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE categorias(
id_cat							INTEGER NOT NULL AUTO_INCREMENT,
nombre							VARCHAR (150) NOT NULL,
PRIMARY KEY (id_cat),
UNIQUE(nombre)
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE habitaciones(
id_hbt                          INTEGER NOT NULL AUTO_INCREMENT,
id_ht 							INTEGER NOT NULL,
id_cat                          INTEGER NOT NULL,
PRIMARY KEY(id_hbt),
UNIQUE (id_cat),
FOREIGN KEY (id_ht) REFERENCES hoteles(id_ht) ON DELETE CASCADE,
FOREIGN KEY (id_cat) REFERENCES categorias(id_cat) ON DELETE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

CREATE TABLE img_habitaciones (
id_img							INTEGER NOT NULL AUTO_INCREMENT,
id_hbt 							INTEGER NOT NULL,
nombreImagen 					VARCHAR(100) NOT NULL,
PRIMARY KEY (id_img),
UNIQUE(id_hbt, nombreImagen),
FOREIGN KEY (id_hbt) REFERENCES habitaciones(id_hbt) ON DELETE CASCADE
)DEFAULT CHARACTER SET UTF8MB4;

