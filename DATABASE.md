# 📊 Banco de Dados - SGC Oficina

## 📁 Estrutura de Arquivos

```
database/
├── schema.sql          # Script para criar tabelas
└── seed.sql            # Script para inserir dados iniciais

src/seeds/
└── seed.ts             # Script TypeORM para popular dados
```

## 🚀 Como Usar

### 1. Criar o banco de dados no PostgreSQL

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE sgc_oficina_dev;

# Sair
\q
```

### 2. Executar o Schema (Criar Tabelas)

**Opção A: Via SQL Script**
```bash
psql -U postgres -d sgc_oficina_dev -f database/schema.sql
```

**Opção B: Via TypeORM (dentro da aplicação)**
```bash
npm run dev
```

### 3. Popular Dados Iniciais (3 registros por tabela)

**Opção A: Via SQL Script**
```bash
psql -U postgres -d sgc_oficina_dev -f database/seed.sql
```

**Opção B: Via TypeORM (recomendado)**
```bash
npm run seed
```

## 📋 Dados Inseridos

### Clientes (3)
- João Silva - CPF: 12345678901
- Maria Santos - CPF: 98765432100
- Carlos Oliveira - CPF: 55555555555

### Veículos (3)
- Honda Civic (ABC1234) - Do João
- Volkswagen Gol (XYZ9876) - Da Maria
- Toyota Corolla (MNO5555) - Do Carlos

### Ordens de Serviço (3) - ORDENADAS POR DATA
- 2024-09-20 08:00 - Troca de óleo (João) - **CONCLUÍDA**
- 2024-09-25 09:30 - Revisão geral (Maria) - **EM ANDAMENTO**
- 2024-09-29 10:15 - Alinhamento (Carlos) - **PENDENTE**

### Usuários (3) - Para Autenticação
- admin@oficina.com
- gerente@oficina.com
- mecanico@oficina.com

## ⚙️ Configuração

### Arquivo `.env`
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sgc_oficina_dev
```

### Scripts Disponíveis
```bash
npm run dev           # Iniciar servidor em desenvolvimento
npm run seed          # Popular dados iniciais
npm run build         # Compilar TypeScript
npm run start         # Executar versão compilada
npm run migrate       # Executar migrações
```

## 📝 Estrutura das Tabelas

### cliente
- id_cliente (PK)
- nome
- cpf (UNIQUE)
- telefone
- created_at
- updated_at

### veiculo
- id_veiculo (PK)
- id_cliente (FK)
- modelo
- marca
- placa (UNIQUE)
- created_at
- updated_at

### ordem_de_servico
- id_ordem (PK)
- id_veiculo (FK)
- id_cliente (FK)
- data_entrada
- data_saida
- servicos
- status
- observacoes
- created_at
- updated_at

### usuario
- id_usuario (PK)
- nome
- email (UNIQUE)
- senha
- ativo
- created_at
- updated_at

## 🔐 Integridade Referencial

✅ Veículos precisam estar associados a um cliente (FK)
✅ Ordens de serviço referenciam veículo e cliente (FK)
✅ Ordens ordenadas por data_entrada DESC
✅ Deletar cliente deleta seus veículos e ordens (CASCADE)

## 💡 Próximas Melhorias

- [ ] Criptografia de CPF e Telefone
- [ ] Autenticação JWT
- [ ] Validação de duplicatas de clientes
- [ ] Middleware de autenticação
