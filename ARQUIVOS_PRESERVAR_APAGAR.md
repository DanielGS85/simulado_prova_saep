# 📋 Arquivos para Preservar vs Apagar (Começar do Zero)

## 🟢 PRESERVAR (Guardar Antes de Apagar)

### 📄 Documentação Estratégica

#### ✅ ROTEIRO_4HORAS.md
- **Por que guardar:** Seu roteiro passo-a-passo completo (ESSENCIAL!)
- **Ação:** Copie para desktop ou pendrive
- **Uso:** Seguir durante toda a prova

#### ✅ LISTA_REFATORACAO.md
- **Por que guardar:** Referência se tiver dúvida sobre tarefas
- **Ação:** Copie como backup
- **Uso:** Consultar se precisar de detalhes adicionais

#### ✅ ANALISE_ROTEIRO.md
- **Por que guardar:** Explica por que tudo mudou e o que foi aprendido
- **Ação:** Copie como documentação
- **Uso:** Entender a lógica das decisões tomadas

#### ✅ DATABASE.md
- **Por que guardar:** Referência rápida das tabelas e estrutura
- **Ação:** Copie para consulta rápida
- **Uso:** Lembrar nomes de colunas e relacionamentos

### 💾 Configuração do Banco

#### ✅ .env (Arquivo Atual)
- **Por que guardar:** Contém valores de configuração
- **Valores importantes:**
  ```
  DATABASE_URL=postgres://postgres:postgres@localhost:5432/oficina_db
  JWT_SECRET=sua_chave_secreta_super_segura_aqui_123456
  ```
- **Ação:** ANOTE OS 3 VALORES PRINCIPAIS (veja abaixo)
- **Uso:** Reutilizar no novo projeto (.env.local)

### 📋 Rastreamento de Tarefas

#### ✅ Banco de Dados SQL da Sessão
- **Tabela:** `tarefas_refatoracao` (39 tarefas)
- **Ação:** Se quiser continuar rastreando progresso
- **Uso:** Opcional - só se estiver acompanhando status das tarefas

---

## 🔴 APAGAR (Começar do Zero)

### 📁 Diretórios a Remover

| Diretório | Por que apagar | O que fazer |
|-----------|----------------|-----------|
| `node_modules/` | Será recriado por `npm install` | Seguro deletar |
| `src/` | Estrutura antiga (Express/TypeORM) | Será substituída por `app/` (Next.js) |
| `database/` | Scripts SQL antigos (parcialmente corretos) | Será recriado como `db/` |
| `documentacao/` | Se existir (não precisa) | Seguro deletar |

### 📄 Arquivos a Remover

| Arquivo | Por que apagar | O que fazer |
|---------|----------------|-----------|
| `package.json` | Será recriado por `npx create-next-app` | Seguro deletar |
| `package-lock.json` | Será recriado automaticamente | Seguro deletar |
| `tsconfig.json` | Será recriado por `npx create-next-app` | Seguro deletar |
| `ESTRUTURA_API.md` | Documentação da arquitetura antiga | Seguro deletar |
| `QUICKSTART.md` | Guia da API antiga | Seguro deletar |
| `.git/` | Histórico git do projeto antigo | Seguro deletar |
| `readme.md` | README da API antiga | Seguro deletar |

---

## 📋 Passo-a-Passo para Começar do Zero

### 1️⃣ GUARDAR (Antes de Apagar)

```
1. Crie uma pasta "BACKUP_ARQUIVOS" em Desktop
2. Copie para lá:
   - ROTEIRO_4HORAS.md
   - LISTA_REFATORACAO.md
   - ANALISE_ROTEIRO.md
   - DATABASE.md
   - Arquivo .env (anote os valores)
```

### 2️⃣ APAGAR PROJETO ATUAL

```
Opção A: Deletar tudo
  • Feche VS Code
  • Abra explorador de arquivos
  • Navegue até: c:\Users\CIN0235882\simulado_saep_estacionamento_api\simulado_prova_saep
  • Selecione TUDO e delete (Shift + Delete)

Opção B: Renomear (mais seguro)
  • Feche VS Code
  • Renomeie a pasta para: simulado_prova_saep_old
  • (Você pode recuperar depois se precisar)
```

### 3️⃣ COMEÇAR DO ZERO

```
1. Abra terminal (PowerShell)
2. Navegue para: c:\Users\CIN0235882\simulado_saep_estacionamento_api
3. Comande: cd simulado_saep_estacionamento_api (se não estiver lá)
4. Execute FASE 1 do ROTEIRO_4HORAS.md
```

---

## 🎯 Valores do .env que Você Vai Precisar Reutilizar

### ✅ 1. DATABASE_URL
```
postgres://postgres:postgres@localhost:5432/oficina_db
```
- **Nota:** Mude `sgc_oficina_dev` para `oficina_db`
- **Uso:** Conexão ao PostgreSQL no novo projeto

### ✅ 2. CHAVE_CRIPTO (Para Criptografar CPF/Telefone)
```
sua-chave-cripto-32-caracteres-minimo-aqui-1234
```
- **Nota:** Pode ser a mesma do JWT_SECRET ou criar nova
- **Tamanho:** Mínimo 32 caracteres
- **Uso:** Criptografar dados sensíveis no banco

### ✅ 3. SESSAO_SEGREDO (Para Gerenciar Sessão)
```
sua-chave-sessao-32-caracteres-minimo-aqui-5678
```
- **Nota:** Pode ser a mesma do JWT_SECRET ou criar nova
- **Tamanho:** Mínimo 32 caracteres
- **Uso:** Gerenciar cookies de sessão

---

## ⚠️ PONTOS IMPORTANTES

### Sobre o Banco de Dados
```
✅ O banco de dados "oficina_db" será criado NOVO (vazio)
✅ Você vai rodar:
   • npm run db:levanta  (cria as tabelas)
   • npm run db:popula   (insere dados de teste)
✅ Não precisa guardar dados do banco antigo (sgc_oficina_dev)
```

### Sobre o Novo Projeto
```
✅ Será criado via: npx create-next-app@latest oficina
✅ Terá estrutura completamente diferente (Next.js, não Express)
✅ Usará app/ directory (não src/)
✅ Usará .env.local (não .env)
```

### Sobre Chaves de Criptografia
```
⚠️ Anote ANTES de apagar!
✅ Use valores diferentes se possível (CHAVE_CRIPTO ≠ SESSAO_SEGREDO)
✅ Mínimo 32 caracteres cada
✅ Nunca commit no git (já no .gitignore)
```

---

## ✅ Checklist Antes de Começar

```
☐ Copiei ROTEIRO_4HORAS.md para local seguro (Desktop/Pendrive)
☐ Anotei o DATABASE_URL completo (postgres://...)
☐ Anotei CHAVE_CRIPTO (32+ caracteres)
☐ Anotei SESSAO_SEGREDO (32+ caracteres)
☐ Copiei arquivos .md de referência (LISTA, ANALISE, DATABASE)
☐ Deletei ou renomeei pasta simulado_prova_saep
☐ Criei pasta backup com todos os arquivos preservados
☐ Abri terminal na pasta simulado_saep_estacionamento_api
☐ Tenho ROTEIRO_4HORAS.md à mão para seguir
☐ Pronto para começar FASE 1!
```

---

## 📝 Template .env.local para o Novo Projeto

Quando você criar o novo projeto (FASE 1), crie um arquivo `.env.local` com:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/oficina_db
CHAVE_CRIPTO=sua-chave-cripto-32-caracteres-minimo-aqui-1234
SESSAO_SEGREDO=sua-chave-sessao-32-caracteres-minimo-aqui-5678
```

**Substitua os valores acima pelos valores que você anotou!**

---

## 💡 Dicas Finais

### Organização de Backup
```
Desktop/
└── BACKUP_ARQUIVOS/
    ├── ROTEIRO_4HORAS.md
    ├── LISTA_REFATORACAO.md
    ├── ANALISE_ROTEIRO.md
    ├── DATABASE.md
    └── env_valores.txt (valores anotados)
```

### Velocidade na Prova
```
✅ Copie node_modules pronto se tiver USB (economiza 5-10 min)
✅ Tenha ROTEIRO_4HORAS.md sempre aberto
✅ Siga as FASES na ordem (1 → 2 → 3 → 4 → 5)
✅ Use o checklist para rastrear progresso
```

### Se Algo Der Errado
```
✅ Você tem pasta simulado_prova_saep_old (se renomeou)
✅ ROTEIRO_4HORAS.md tem instruções de recuperação
✅ Banco oficina_db pode ser recriado a qualquer momento
✅ Basta rodar npm run db:levanta e npm run db:popula novamente
```

---

## 🚀 Próximo Passo

**Quando tiver tudo guardado e deletado, abra ROTEIRO_4HORAS.md e comece a FASE 1!**

Tempo estimado até estar pronto:
- Guardar arquivos: **5 min**
- Deletar projeto: **2 min**
- Total: **7 min**

**Boa sorte na prova! 🍀**

---

*Arquivo gerado em: 2026-09-29 20:00*
*Para: Simulado SAEP - Oficina Mecânica*
*Prova: 4 horas | Next.js + React + PostgreSQL*
