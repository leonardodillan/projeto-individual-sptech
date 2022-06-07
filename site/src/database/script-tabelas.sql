-- create database theyung;

-- use theyung;

-- create table usuario(
-- 	idUsuario int primary key auto_increment,
--     nome varchar(99),
--     email varchar(99),
--     senha varchar(20)
-- );

-- create table quiz (
-- idQuiz int auto_increment,
-- pontuacao int,
-- fkUsuario int,
-- foreign key (fkUsuario) references usuario(idUsuario),
-- primary key (idQuiz, fkUsuario)
-- );

create database theyung;

use theyung;

create table usuario(
    idUsuario int primary key auto_increment,
    nome varchar(99),
    email varchar(99),
    senha varchar(20)
);

create table quiz (
idQuiz int primary key auto_increment,
pontuacao int,
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario)
);

