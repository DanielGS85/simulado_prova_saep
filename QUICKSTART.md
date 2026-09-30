# 🚀 Guia Rápido de Início - SGC Oficina

## ✅ Pré-requisitos
- Node.js 16+
- PostgreSQL instalado e rodando
- npm ou yarn

## 📦 Instalação

### 1. Instalar dependências (já feito ✓)
```bash
npm install
```

### 2. Configurar variáveis de ambiente (.env)
Arquivo `.env` já criado com:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sgc_oficina_dev
```

## 🗄️ Configurar Banco de Dados

### 1. Criar o banco no PostgreSQL
```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE sgc_oficina_dev;

# Sair
\q
```

### 2. Criar as tabelas (execute UM dos dois)

**Opção A: SQL Script (rápido)**
```bash
psql -U postgres -d sgc_oficina_dev -f database/schema.sql
```

**Opção B: Via TypeORM (quando iniciar a aplicação)**
```bash
npm run dev
```

### 3. Popular dados iniciais (3 registros por tabela)

**Opção A: Recommended (TypeORM)**
```bash
npm run seed
```

**Opção B: SQL Script**
```bash
psql -U postgres -d sgc_oficina_dev -f database/seed.sql
```

## 🚀 Iniciar a Aplicação

```bash
npm run dev
```

A API será inicializada em: `http://localhost:3000`

### Health Check
```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "API running",
  "timestamp": "2024-09-29T19:30:00.000Z"
}
```

## 📋 Testar os Endpoints

### Listar Clientes
```bash
curl http://localhost:3000/api/clientes
```

### Buscar Cliente por Termo
```bash
curl "http://localhost:3000/api/clientes/busca/João"
```

### Listar Veículos
```bash
curl http://localhost:3000/api/veiculos
```

### Listar Ordens de Serviço (ordenadas por data)
```bash
curl http://localhost:3000/api/ordensdeservico
```

### Buscar Ordens por Veículo
```bash
curl http://localhost:3000/api/ordensdeservico/veiculo/1
```

## 💾 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor em desenvolvimento |
| `npm run seed` | Popular dados iniciais |
| `npm run build` | Compilar TypeScript para JavaScript |
| `npm run start` | Executar versão compilada |
| `npm run migrate` | Executar migrações do banco |

## 📊 Dados Inseridos por Padrão

### Clientes (3)
- João Silva (CPF: 12345678901)
- Maria Santos (CPF: 98765432100)
- Carlos Oliveira (CPF: 55555555555)

### Veículos (3)
- Honda Civic (ABC1234) - João
- VW Gol (XYZ9876) - Maria
- Toyota Corolla (MNO5555) - Carlos

### Ordens de Serviço (3 - ORDENADAS POR DATA)
- 2024-09-20 08:00 → Troca de óleo (João) - CONCLUÍDA
- 2024-09-25 09:30 → Revisão geral (Maria) - EM ANDAMENTO
- 2024-09-29 10:15 → Alinhamento (Carlos) - PENDENTE

## 🏗️ Arquitetura

```
Request → Routes → Controller → Service → Entity → Database
```

### Estrutura Modular
Cada módulo é autocontido com:
- `routes.ts` - Define endpoints
- `Controller.ts` - Trata requisições HTTP
- `Service.ts` - Lógica de negócio
- `Entity.ts` - Modelo do banco

## 🐛 Troubleshooting

### Erro: "Banco de dados não encontrado"
```bash
psql -U postgres
CREATE DATABASE sgc_oficina_dev;
\q
```

### Erro: "Tabelas não existem"
```bash
# Executar schema
psql -U postgres -d sgc_oficina_dev -f database/schema.sql
```

### Erro: "Sem dados iniciais"
```bash
# Executar seed
npm run seed
```

### Erro de conexão PostgreSQL
Verificar variáveis em `.env`:
- DB_HOST (padrão: localhost)
- DB_PORT (padrão: 5432)
- DB_USERNAME (padrão: postgres)
- DB_PASSWORD (seu password)
- DB_DATABASE (padrão: sgc_oficina_dev)

## 📚 Documentação Completa

- 📄 `ESTRUTURA_API.md` - Explicação da arquitetura modular
- 📄 `DATABASE.md` - Detalhes do banco de dados
- 📄 `readme.md` - Especificação do projeto

## ✅ Checklist de Requisitos

- ✅ Estrutura modular (cada módulo com routes.ts)
- ✅ Mínimo 3 registros por tabela
- ✅ Integridade referencial (Foreign Keys)
- ✅ Ordens de serviço ordenadas por data
- ✅ Controllers, Services e Entities implementados
- ✅ Banco de dados PostgreSQL
- ✅ Variáveis de ambiente (.env)
- ⏳ Autenticação JWT (próximo passo)
- ⏳ Criptografia de dados sensíveis (próximo passo)

## 🎯 Próximos Passos

1. Implementar autenticação JWT
2. Adicionar criptografia de CPF/Telefone
3. Criar middleware de autenticação
4. Adicionar validações
5. Implementar tratamento de erros global

---

**Desenvolvido com ❤️ usando TypeScript, Express e TypeORM**
