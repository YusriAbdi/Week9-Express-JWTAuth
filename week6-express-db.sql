CREATE DATABASE `week6-express-db`;
USE `week6-express-db`;

CREATE TABLE obat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama varchar(50),
    kategori varchar(50),
    dosis varchar(50),
    harga INT,
    exp year
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(100) UNIQUE,
    password varchar(255)
);