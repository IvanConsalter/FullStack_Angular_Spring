CREATE TABLE pessoa (
	codigo BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL,
	logradouro VARCHAR(50),
    numero VARCHAR(30),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cep VARCHAR(30),
    cidade VARCHAR(100),
    estado VARCHAR(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('João Silva', true, 'Rua do Abacaxi', '10', null, 'Brasil', '38.400-12', 'Uberlândia', 'MG');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Maria Rita', true, 'Rua do Sabiá', '110', 'Apto 101', 'Colina', '11.400-12', 'Ribeirão Preto', 'SP');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Pedro Santos', true, 'Rua da Bateria', '23', null, 'Morumbi', '54.212-12', 'Goiânia', 'GO');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Ricardo Pereira', true, 'Rua do Motorista', '123', 'Apto 302', 'Aparecida', '38.400-12', 'Salvador', 'BA');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Josué Mariano', true, 'Av Rio Branco', '321', null, 'Jardins', '56.400-12', 'Natal', 'RN');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Pedro Barbosa', true, 'Av Brasil', '100', null, 'Tubalina', '77.400-12', 'Porto Alegre', 'RS');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Henrique Medeiros', true, 'Rua do Sapo', '1120', 'Apto 201', 'Centro', '12.400-12', 'Rio de Janeiro', 'RJ');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Carlos Santana', true, 'Rua da Manga', '433', null, 'Centro', '31.400-12', 'Belo Horizonte', 'MG');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Leonardo Oliveira', true, 'Rua do Músico', '566', null, 'Segismundo Pereira', '38.400-00', 'Uberlândia', 'MG');
INSERT INTO pessoa (nome, ativo, logradouro, numero, complemento, bairro, cep, cidade, estado) values ('Isabela Martins', true, 'Rua da Terra', '1233', 'Apto 10', 'Vigilato', '99.400-12', 'Manaus', 'AM');
