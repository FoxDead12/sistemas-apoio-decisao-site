CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE parks (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE params (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE params_parks (
  id SERIAL PRIMARY KEY,
  id_param INT NOT NULL REFERENCES params(id),
  id_park INT NOT NULL REFERENCES parks(id),
  value INT NOT NULL
);

CREATE TABLE weight_params (
  id SERIAL PRIMARY KEY,
  id_compare INT NOT NULL REFERENCES params(id),
  id_to INT NOT NULL REFERENCES params(id),
  value INT NOT NULL
);

INSERT INTO params (id, name) VALUES
(1,'Preço'),
(2,'Local'),
(3,'Tamanho'),
(4,'Serviços'),
(5,'Parque Estacionamento'),
(6,'Segurança'),
(7,'Flexibilidade de Contrato'),
(8,'Arquitetura');

INSERT INTO parks (id, name) VALUES
(1, 'Avepark'),
(2, 'Sanjotc'),
(3, 'Tecmaia'),
(4, 'RegiaDouro'),
(5, 'Brigantia'),
(6, 'Iparque'),
(7, 'UAlg'),
(8, 'Lispolis');


INSERT INTO weight_params (id_compare, id_to, value) VALUES
(1, 2, 4),
(1, 3, 7),
(1, 4, 6),
(1, 5, 3),
(1, 6, 4),
(1, 7, 7),
(1, 8, 5),

(2, 3, 8),
(2, 4, 7),
(2, 5, 7),
(2, 6, 5),
(2, 7, 8),
(2, 8, 7),

(3, 4, 9),
(3, 5, 6),
(3, 6, 3),
(3, 7, 7),
(3, 8, 2),

(4, 5, 6),
(4, 6, 1),
(4, 7, 5),
(4, 8, 1),

(5, 6, 4),
(5, 7, 8),
(5, 8, 4),

(6, 7, 8),
(6, 8, 6),

(7, 8, 1)
;

INSERT INTO params_parks (id_param, id_park, value) VALUES
(1, 1, 2),
(2, 1, 9),
(3, 1, 7),
(4, 1, 5),
(5, 1, 7),
(6, 1, 6),
(7, 1, 2),
(8, 1, 1),

(1, 2, 5),
(2, 2, 1),
(3, 2, 9),
(4, 2, 7),
(5, 2, 6),
(6, 2, 5),
(7, 2, 4),
(8, 2, 7),

(1, 3, 2),
(2, 3, 3),
(3, 3, 8),
(4, 3, 7),
(5, 3, 9),
(6, 3, 2),
(7, 3, 7),
(8, 3, 7),

(1, 4, 7),
(2, 4, 2),
(3, 4, 3),
(4, 4, 8),
(5, 4, 9),
(6, 4, 1),
(7, 4, 5),
(8, 4, 6),

(1, 5, 2),
(2, 5, 8),
(3, 5, 9),
(4, 5, 1),
(5, 5, 3),
(6, 5, 5),
(7, 5, 6),
(8, 5, 2),

(1, 6, 8),
(2, 6, 1),
(3, 6, 8),
(4, 6, 6),
(5, 6, 5),
(6, 6, 4),
(7, 6, 1),
(8, 6, 2),

(1, 7, 8),
(2, 7, 6),
(3, 7, 5),
(4, 7, 4),
(5, 7, 3),
(6, 7, 9),
(7, 7, 8),
(8, 7, 1),

(1, 8, 5),
(2, 8, 6),
(3, 8, 4),
(4, 8, 2),
(5, 8, 8),
(6, 8, 9),
(7, 8, 9),
(8, 8, 5);

-- 7+6+5+4+3+2+1 = 28


