DROP TABLE IF EXISTS ordem_servico CASCADE;
DROP TABLE IF EXISTS veiculo CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL
);

CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf_enc VARCHAR(255) NOT NULL UNIQUE,
  telefone_enc VARCHAR(255) NOT NULL
);

CREATE TABLE veiculo (
  id SERIAL PRIMARY KEY,
  id_cliente INTEGER NOT NULL REFERENCES cliente(id),
  modelo VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL,
  placa VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE ordem_servico (
  id SERIAL PRIMARY KEY,
  id_veiculo INTEGER NOT NULL REFERENCES veiculo(id),
  id_cliente INTEGER NOT NULL REFERENCES cliente(id),
  data_entrada TIMESTAMP NOT NULL,
  data_saida TIMESTAMP,
  servicos VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pendente',
  observacoes TEXT
);

CREATE INDEX idx_veiculo_cliente ON veiculo(id_cliente);
CREATE INDEX idx_ordem_data ON ordem_servico(data_entrada DESC);