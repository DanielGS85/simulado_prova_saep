INSERT INTO usuario (nome, email, senha_hash) VALUES
('Admin', 'admin@oficina.com', '$2b$10$YourHashHere1'),
('Gerente', 'gerente@oficina.com', '$2b$10$YourHashHere2'),
('Mecânico', 'mecanico@oficina.com', '$2b$10$YourHashHere3');

INSERT INTO cliente (nome, cpf_enc, telefone_enc) VALUES
('João Silva', 'cpf_criptografado_1', 'tel_criptografado_1'),
('Maria Santos', 'cpf_criptografado_2', 'tel_criptografado_2'),
('Carlos Oliveira', 'cpf_criptografado_3', 'tel_criptografado_3');

INSERT INTO veiculo (id_cliente, modelo, marca, placa) VALUES
(1, 'Civic', 'Honda', 'ABC1234'),
(2, 'Gol', 'Volkswagen', 'XYZ9876'),
(3, 'Corolla', 'Toyota', 'MNO5555');

INSERT INTO ordem_servico (id_veiculo, id_cliente, data_entrada, data_saida, servicos, status) VALUES
(1, 1, '2024-09-20 08:00:00', '2024-09-20 12:00:00', 'Troca de óleo', 'concluído'),
(2, 2, '2024-09-25 09:30:00', NULL, 'Revisão geral', 'em_andamento'),
(3, 3, '2024-09-29 10:15:00', NULL, 'Alinhamento', 'pendente');