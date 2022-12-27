CREATE TABLE categoria (
    codigo BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO categoria (nome) VALUES ('Lazer');
INSERT INTO categoria (nome) VALUES ('Alimentação');
INSERT INTO categoria (nome) VALUES ('Supermecado');
INSERT INTO categoria (nome) VALUES ('Outros');
