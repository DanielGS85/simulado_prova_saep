## 📦 Estrutura de Pastas - API Backend Modular (React Style)

Cada pasta de módulo é **autocontida** e possui seu próprio arquivo de **routes.ts**:

```
src/
├── app.ts                      # Configuração da aplicação Express (importa todas as rotas)
├── server.ts                   # Inicialização do servidor
├── config/
│   └── dataSource.ts           # Configuração do banco de dados (TypeORM)
├── modules/                    # Módulos de negócio
│   ├── clientes/               # Módulo Clientes
│   │   ├── routes.ts           # ⭐ ROTAS DO MÓDULO
│   │   ├── ClientesController.ts
│   │   ├── ClientesService.ts
│   │   └── Cliente.ts          # Entidade
│   ├── veiculos/               # Módulo Veículos
│   │   ├── routes.ts           # ⭐ ROTAS DO MÓDULO
│   │   ├── VeiculosController.ts
│   │   ├── VeiculosService.ts
│   │   └── Veiculo.ts          # Entidade
│   └── ordensdeservico/        # Módulo Ordens de Serviço
│       ├── routes.ts           # ⭐ ROTAS DO MÓDULO
│       ├── OrdensDeServicoController.ts
│       ├── OrdensDeServicoService.ts
│       └── OrdemDeServico.ts   # Entidade
├── middleware/                 # Middlewares globais
├── utils/                      # Utilitários
└── migrations/                 # Migrações do banco
```

## 🔄 Fluxo de Requisição

```
app.ts (registra todas as rotas)
   ↓
/api/clientes → modules/clientes/routes.ts
   ↓
ClientesController (recebe requisição)
   ↓
ClientesService (processa lógica)
   ↓
Cliente Entity (acessa dados)
   ↓
PostgreSQL Database
```

## 📋 Como Funciona

### 1. **app.ts** registra os módulos:
```typescript
app.use("/api/clientes", clientesRoutes);
app.use("/api/veiculos", veiculosRoutes);
app.use("/api/ordensdeservico", ordensdeservicoRoutes);
```

### 2. Cada módulo tem seu próprio **routes.ts**:
```typescript
// modules/clientes/routes.ts
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/busca/:termo", controller.buscarPorTermo);
```

### 3. Controller trata a requisição:
```typescript
async listar(req, res) {
  const clientes = await this.service.listar();
  res.json(clientes);
}
```

### 4. Service contém a lógica:
```typescript
async listar() {
  return await this.repository.find();
}
```

## 📚 Vantagens desta Estrutura

✅ **Modular**: Cada feature é independente  
✅ **Escalável**: Fácil adicionar novos módulos  
✅ **Organizado**: Tudo do módulo em um lugar  
✅ **Reutilizável**: Padrão usado em React (componentes) e Node.js  
✅ **Fácil manutenção**: Mudanças localizadas  

## 🚀 Para Adicionar um Novo Módulo

1. Criar pasta: `modules/novoModulo/`
2. Criar `routes.ts` com as rotas
3. Criar `NovoModuloController.ts`
4. Criar `NovoModuloService.ts`
5. Criar `NovoModulo.ts` (Entity)
6. Registrar em `app.ts`

Simples assim! 🎯


