# 🚨 ANÁLISE DO PROJETO vs ROTEIRO DA PROVA

## CONCLUSÃO

O projeto atual **NÃO ATENDE** o roteiro da prova. Ele foi desenvolvido como uma **API Backend**, mas a prova pede um **Full Stack Next.js com Frontend + Backend**.

---

## 📊 COMPARAÇÃO LADO A LADO

| Aspecto | O Que Foi Feito | O Que A Prova Pede |
|---------|-----------------|-------------------|
| **Framework** | Node.js + Express | ✅ Next.js + React |
| **TypeScript** | ✅ Sim | ✅ Sim |
| **Banco** | PostgreSQL + TypeORM | ✅ PostgreSQL + SQL Puro |
| **Dependências** | Express, TypeORM, bcryptjs, cors | ✅ Só postgres |
| **Interface Gráfica** | ❌ Não (só API) | ✅ Sim (Tailwind) |
| **Scripts SQL** | Via TypeORM Migrations | ✅ levanta.sql + popula.sql |
| **Execução** | Controllers/Services/Routes | ✅ App Router + API Routes |
| **Banco Inicial** | Com tabelas | ✅ Vazio |

---

## 🎯 O QUE FAZER

### OPÇÃO 1: Refazer Tudo (Recomendado) ⭐
- **Tempo:** ~5-6 horas
- **Risco:** Baixo
- **Resultado:** Projeto correto conforme roteiro

### OPÇÃO 2: Adaptar projeto atual
- **Tempo:** ~8-10 horas
- **Risco:** Alto (pode não atender requisitos)
- **Não recomendado**

---

## 📋 TAREFAS CRÍTICAS (ORDEM)

### Fase 1: Setup (65 min)
```bash
# 1. Criar novo projeto
npx create-next-app@latest oficina --ts --app --tailwind \
  --no-eslint --import-alias "@/*"

# 2. Instalar postgres
npm i postgres

# 3. Criar banco vazio
createdb oficina_db

# 4. Arquivos necessários
- .env.local (DATABASE_URL)
- db/levanta.sql (DDL)
- db/popula.sql (DML)
- db/roda.mts (executor)
- lib/db.ts (conexão)
```

### Fase 2: Frontend (85 min)
- [ ] Página LOGIN
- [ ] Página DASHBOARD
- [ ] Página CLIENTES
- [ ] Página VEÍCULOS
- [ ] Página ORDENS SERVIÇO

### Fase 3: API Routes (50 min)
- [ ] /api/auth/login
- [ ] /api/auth/logout
- [ ] /api/clientes
- [ ] /api/veiculos
- [ ] /api/ordensdeservico

### Fase 4: Segurança (50 min)
- [ ] Criptografia (node:crypto)
- [ ] Hash de senha
- [ ] Middleware autenticação
- [ ] Expiração de sessão

### Fase 5: Validações (18 min)
- [ ] Login com erro
- [ ] Busca clientes
- [ ] Associação veículo-cliente
- [ ] Ordenação ordens

### Fase 6: Documentação (40 min)
- [ ] Gerar DER
- [ ] Criar documentação.pdf
- [ ] Criar oficina_db.sql
- [ ] Compactar em ZIP

---

## ✅ CHECKLIST FINAL DE ENTREGA

Conforme especificado no roteiro:

```
┌─ ENTREGA FINAL (ZIP com nome completo) ─┐
│                                          │
│ 1. documentacao.pdf                      │
│ 2. DER.pdf ou DER.png                   │
│ 3. oficina_db.sql                       │
│ 4. Pasta "sistema" com:                 │
│    - Código-fonte completo              │
│    - Login funcional                    │
│    - Dashboard principal                │
│    - Gerenciamento Clientes             │
│    - Gerenciamento Veículos             │
│    - Gerenciamento Ordens de Serviço    │
│                                          │
└──────────────────────────────────────────┘
```

---

## 📚 REFERÊNCIA RÁPIDA

### .env.local
```env
DATABASE_URL=postgres://postgres:senha@localhost:5432/oficina_db
CHAVE_CRIPTO=uma-frase-longa-e-secreta
SESSAO_SEGREDO=outra-frase-longa-e-secreta
```

### package.json scripts
```json
"db:levanta": "node --env-file=.env.local db/roda.mts db/levanta.sql",
"db:popula" : "node --env-file=.env.local db/roda.mts db/popula.sql"
```

### db/roda.mts
```typescript
import postgres from 'postgres';

const arquivo = process.argv[2];
const sql = postgres(process.env.DATABASE_URL!, { onnotice: () => {} });

await sql.file(arquivo).simple();
console.log('✔', arquivo);
await sql.end();
```

### lib/db.ts
```typescript
import postgres from 'postgres';
export const sql = postgres(process.env.DATABASE_URL!);
```

---

## 🔗 ESTRUTURA ESPERADA

```
oficina/
├── .env.local
├── package.json
├── tsconfig.json
├── .gitignore
├── db/
│   ├── levanta.sql
│   ├── popula.sql
│   └── roda.mts
├── lib/
│   └── db.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── clientes/
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── veiculos/
│   │   ├── page.tsx
│   │   └── [id]/
│   ├── ordensdeservico/
│   │   ├── page.tsx
│   │   └── [id]/
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── logout/route.ts
│       ├── clientes/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── veiculos/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       └── ordensdeservico/
│           ├── route.ts
│           └── [id]/route.ts
├── components/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   └── ...
└── public/
```

---

## ⏱️ TIMELINE SUGERIDA

- **Hora 0-1:** Setup (banco, scripts, arquivo básicos)
- **Hora 1-2:** Frontend Login + Dashboard
- **Hora 2-3:** Frontend Clientes + Veículos
- **Hora 3-4:** Frontend Ordens + API Routes
- **Hora 4-5:** Segurança + Validações
- **Hora 5-6:** Testes e Documentação
- **Hora 6:** Compactar e Entregar

---

## 🚀 COMECE AGORA!

1. Abra `LISTA_REFATORACAO.md` para ver todas as 39 tarefas
2. Siga a ordem de prioridade
3. Use SQL para rastrear progresso:

```sql
UPDATE tarefas_refatoracao SET status = 'in_progress' WHERE id = 1;
UPDATE tarefas_refatoracao SET status = 'done' WHERE id = 1;
SELECT COUNT(*) as total, status FROM tarefas_refatoracao GROUP BY status;
```

---

**Data:** 2024-09-29  
**Status:** Requer refatoração completa  
**Estimativa:** 5-6 horas  
**Prioridade:** 🔴 CRÍTICO
