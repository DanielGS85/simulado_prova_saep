# 📋 LISTA DE REFATORAÇÃO - PROJETO PROVA

## 🚨 SITUAÇÃO ATUAL
- ❌ Projeto atual: **Node.js + Express + TypeORM** (Backend API apenas)
- ✅ Projeto esperado: **Next.js + React + TypeScript + Tailwind** (Full Stack)

## 📊 PRIORIDADES

### 🔴 CRÍTICO (DEVE SER FEITO PRIMEIRO)

| Ordem | Tarefa | Descrição | Tempo |
|-------|--------|-----------|-------|
| 1 | Deletar projeto Express | O projeto inteiro deve ser refeito como Next.js | 5 min |
| 2 | Criar novo Next.js + React + TS + Tailwind | `npx create-next-app@latest oficina --ts --app --tailwind --no-eslint` | 10 min |
| 3 | Remover dependências desnecessárias | Remover Express, TypeORM, bcryptjs, etc | 5 min |
| 4 | Instalar apenas postgres | `npm i postgres` - única dependência runtime | 2 min |
| 5 | Criar banco VAZIO | `createdb oficina_db` - sem tabelas ainda | 2 min |
| 6 | Criar .env.local com DATABASE_URL | Arquivo de configuração para conexão | 3 min |
| 7 | Criar pasta db/ com levanta.sql | DDL: DROP + CREATE TABLE com FK | 15 min |
| 8 | Criar pasta db/ com popula.sql | DML: INSERT com 3 registros por tabela | 10 min |
| 9 | Criar db/roda.mts | Executor SQL (5 linhas) | 5 min |
| 10 | Criar lib/db.ts | Conexão única com postgres | 5 min |
| 11 | Adicionar scripts npm | `db:levanta` e `db:popula` em package.json | 3 min |

**Subtotal: ~65 minutos**

### 🟠 ALTO (CORE DO SISTEMA)

| Ordem | Tarefa | Descrição | Tempo |
|-------|--------|-----------|-------|
| 12 | Página LOGIN | Componente de autenticação com validação | 20 min |
| 13 | Página DASHBOARD | Nome do usuário, botões de acesso, logout | 15 min |
| 14 | Página CLIENTES | Listagem com busca por termo | 20 min |
| 15 | Página VEÍCULOS | CRUD com associação a cliente | 20 min |
| 16 | Página ORDENS DE SERVIÇO | Listagem ordenada por data | 20 min |
| 17 | API Route: POST /api/auth/login | Autenticação com sessão | 15 min |
| 18 | API Route: POST /api/auth/logout | Finalizador de sessão | 10 min |
| 19 | API Route: /api/clientes | GET, POST, PUT, DELETE, SEARCH | 20 min |
| 20 | API Route: /api/veiculos | GET, POST, PUT, DELETE | 15 min |
| 21 | API Route: /api/ordensdeservico | GET, POST, PUT, DELETE | 15 min |

**Subtotal: ~170 minutos**

### 🟡 MÉDIO (SEGURANÇA)

| Ordem | Tarefa | Descrição | Tempo |
|-------|--------|-----------|-------|
| 22 | Implementar criptografia (node:crypto) | Para CPF e telefone | 15 min |
| 23 | Implementar hash de senha | Usar crypto para hash seguro | 10 min |
| 24 | Middleware de autenticação | Verificar sessão em rotas protegidas | 15 min |
| 25 | Expiração de sessão | Timer configurável no .env | 10 min |

**Subtotal: ~50 minutos**

### 🟢 VALIDAÇÕES

| Ordem | Tarefa | Descrição | Tempo |
|-------|--------|-----------|-------|
| 26 | Validar login com erro | Mostrar mensagem de falha | 5 min |
| 27 | Validar busca de clientes | Filtro dinâmico | 5 min |
| 28 | Validar associação veículo-cliente | FK na tabela | 5 min |
| 29 | Validar ordenação de ordens | ORDER BY data_entrada DESC | 3 min |

**Subtotal: ~18 minutos**

### 📚 DOCUMENTAÇÃO E ENTREGA

| Ordem | Tarefa | Descrição | Tempo |
|-------|--------|-----------|-------|
| 30 | Gerar DER (Diagrama) | Extrair do banco no DBeaver | 10 min |
| 31 | Criar documentação.pdf | Anexo 1: RF, RNF, RN, arquitetura | 20 min |
| 32 | Criar oficina_db.sql | Dump completo (schema + dados) | 5 min |
| 33 | Compactar em ZIP (nome completo) | Formato final de entrega | 5 min |

**Subtotal: ~40 minutos**

---

## ⏱️ RESUMO DE TEMPO

```
Crítico:        ~65 minutos
Alto:          ~170 minutos
Médio:          ~50 minutos
Validações:     ~18 minutos
Documentação:   ~40 minutos
────────────────────────
TOTAL:        ~343 minutos (~5-6 horas)
```

---

## 🎯 ESTRUTURA SQL ESPERADA

### Tabelas

#### usuario
```sql
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### cliente
```sql
CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf_enc VARCHAR(255) NOT NULL UNIQUE,  -- criptografado
  telefone_enc VARCHAR(255) NOT NULL,     -- criptografado
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### veiculo
```sql
CREATE TABLE veiculo (
  id SERIAL PRIMARY KEY,
  id_cliente INTEGER NOT NULL REFERENCES cliente(id),
  modelo VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL,
  placa VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### ordem_servico
```sql
CREATE TABLE ordem_servico (
  id SERIAL PRIMARY KEY,
  id_veiculo INTEGER NOT NULL REFERENCES veiculo(id),
  id_cliente INTEGER NOT NULL REFERENCES cliente(id),
  data_entrada TIMESTAMP NOT NULL,
  data_saida TIMESTAMP,
  servicos VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pendente',
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ DADOS DE TESTE (3 por tabela)

### Usuários
- admin@oficina.com / admin123
- gerente@oficina.com / gerente456
- mecanico@oficina.com / mecanico789

### Clientes
- João Silva (CPF criptografado)
- Maria Santos (CPF criptografado)
- Carlos Oliveira (CPF criptografado)

### Veículos
- Honda Civic (ABC1234) - João
- VW Gol (XYZ9876) - Maria
- Toyota Corolla (MNO5555) - Carlos

### Ordens de Serviço (ORDENADAS POR DATA)
- 2024-09-20 08:00 - Troca de óleo (João) - CONCLUÍDA
- 2024-09-25 09:30 - Revisão geral (Maria) - EM ANDAMENTO
- 2024-09-29 10:15 - Alinhamento (Carlos) - PENDENTE

---

## 📝 CHECKLIST DE ENTREGA

Conforme solicitado no roteiro, entregar em ZIP/RAR com:

- [ ] 1. documentacao.pdf (Anexo 1)
- [ ] 2. DER.pdf ou DER.png (Diagrama)
- [ ] 3. oficina_db.sql (Script completo)
- [ ] 4. Código-fonte (pasta "sistema")
  - [ ] 4.1 Funcionalidade LOGIN
  - [ ] 4.2 Funcionalidade DASHBOARD
  - [ ] 4.3 Gerenciamento CLIENTES
  - [ ] 4.4 Gerenciamento VEÍCULOS
  - [ ] 4.5 Gerenciamento ORDENS DE SERVIÇO

**Nome do arquivo:** `SeuNomeCompleto.zip` (espaços por sublinhado)

---

## 🔗 REFERÊNCIAS DO ROTEIRO

```bash
# Criar projeto
npx create-next-app@latest oficina --ts --app --tailwind \
  --no-eslint --import-alias "@/*"

# Instalar dependência
npm i postgres

# Criar banco vazio
createdb oficina_db

# Scripts no package.json
"db:levanta": "node --env-file=.env.local db/roda.mts db/levanta.sql"
"db:popula" : "node --env-file=.env.local db/roda.mts db/popula.sql"
```

---

**Data de Geração:** 2024-09-29  
**Status:** REQUER REFATORAÇÃO COMPLETA  
**Prioridade:** 🔴 CRÍTICO
