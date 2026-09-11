## CONTEXTUALIZAÇÃO

Uma oficina mecânica de pequeno porte enfrenta problemas em sua rotina de atendimento devido à ausência de um sistema informatizado. O controle manual das ordens de serviço e dos registros de clientes e veículos tem ocasionado atrasos na entrega, veículos atendidos fora da ordem de chegada, cadastros duplicados e perda do histórico de manutenção. Além disso, a falta de segurança no armazenamento dos dados, como o CPF e o telefone dos clientes, coloca a empresa em risco de descumprimento da Lei Geral de Proteção de Dados (LGPD).

Para resolver essa situação, o proprietário da oficina contratou sua equipe para desenvolver uma solução de software que organize o processo de agendamento de serviços e a gestão das informações. Durante a reunião inicial, o proprietário destacou a importância da autenticação dos usuários com tempo de expiração da sessão, da segurança dos dados sensíveis e da documentação técnica do sistema, incluindo requisitos funcionais e geração do diagrama entidade-relacionamento, a fim de garantir a manutenção futura do sistema.

Após a reunião com o proprietário da oficina, foram definidas algumas regras de negócio:

- No script do banco de dados devem existir pelo menos três registros para todas as tabelas criadas, respeitando os tipos de dados, chaves primárias e estrangeiras.
- Na funcionalidade de login, fazer validação em caso de falha na autenticação.
- Os dados sensíveis devem ser criptografados no banco de dados.
- A funcionalidade principal do sistema deve exibir: nome do usuário logado e uma forma de acessar os demais recursos, assim como uma maneira de sair do sistema.
- A funcionalidade de cliente deve conter: um recurso de busca para que o usuário possa inserir o termo, o qual, após inserção e confirmação, deverá exibir para o usuário a atualização da listagem dos valores da tabela com os registros que correspondem.
- A funcionalidade de ordem de serviço deve exibir: listagem das ordens de serviço cadastradas ordenada por data de entrada do veículo, trazendo todos os dados do cliente e do veículo.
- Ao cadastrar um novo veículo, o usuário deve associá-lo a um cliente.

## DESAFIO

Você, como desenvolvedor, deverá criar um sistema que permita o cadastro e gerenciamento de clientes, veículos e ordens de serviço, com autenticação de usuários e controle seguro de dados.

### atores
1- clinete
2- veiculo
3- ordem de servico

### realcionamento
brModel para modeloar o diagrama salve em formato pdf

cliente (1,1)------(1,n)veiculo(1,1)----------(1,n)ordem de servico

ver o documentacao DER na pasta doc


#### Requisitos Funcionais (RF)

> 1. Validar autenticação do usuário e exibir mensagem de erro em caso de falha.
>
> 2. Exibir o nome do usuário logado na tela principal e fornecer opção de logout e acesso aos recursos.
>
> 3. Fornecer recurso de busca de clientes por termo, atualizando a listagem com os resultados correspondentes.
>
> 4. Listar ordens de serviço ordenadas por data de entrada do veículo, mostrando os dados do cliente e do veículo.
>
> 5. Ao cadastrar um veículo, obrigatoriamente associá-lo a um cliente existente.
>
> 6. Registrar entrada, saída, status e observações nas ordens de serviço.

#### Requisitos Não Funcionais (RNF)

> 1. Criptografar dados sensíveis (CPF, telefone) no banco de dados.
>
> 2. Implementar expiração de sessão e controles de sessão para autenticação.
>
> 3. Garantir conformidade com a Lei Geral de Proteção de Dados (LGPD) e controles de acesso.

#### Regras de Negócio (RN)

> 1. O script do banco de dados deve inserir ao menos três registros em cada tabela criada, respeitando tipos, chaves primárias e estrangeiras.
>
> 2. Evitar cadastros duplicados de clientes (validações e/ou restrições únicas).
>
> 3. Garantir integridade referencial: veículos devem estar associados a clientes; ordens de serviço devem referenciar veículo e cliente.
>
> 4. As ordens de serviço devem ser apresentadas ordenadas por data de entrada do veículo.

### Preparação do ambiente

Esta seção descreve os passos mínimos para preparar o ambiente de desenvolvimento para este projeto em TypeScript com TypeORM e PostgreSQL (conexão local via extensão do VS Code ou DBeaver).

Pré-requisitos:

- Node.js (16+ recomendado) e npm ou yarn
- PostgreSQL (local)
- VS Code (recomendado) e extensão `PostgreSQL` (ou use DBeaver)

Passos rápidos:

1. Clone o repositório e instale dependências:

```bash
git clone <repo-url>
cd SGCSoficina
npm install
# ou
yarn
```

2. Crie um arquivo de ambiente `.env` na raiz com as variáveis mínimas (exemplo):

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=sgc_oficina_dev
JWT_SECRET=uma_chave_secreta
SESSION_EXPIRATION=3600
```

3. Criar o banco de dados PostgreSQL (opção local via psql):

```sql
CREATE DATABASE sgc_oficina_dev;
CREATE USER sgc_user WITH PASSWORD 'senha';
GRANT ALL PRIVILEGES ON DATABASE sgc_oficina_dev TO sgc_user;
```

4. Instalar e configurar TypeORM (dependências comuns):

```bash
npm install typeorm reflect-metadata pg
npm install -D typescript ts-node-dev
```

Adicione/ajuste o `ormconfig` ou a configuração do TypeORM no arquivo de configuração do projeto apontando para as variáveis do `.env`.

5. Migrations e seed (sugestão):

- Crie migrations para as tabelas `users`, `clients`, `vehicles`, `service_orders`.
- Implemente um script de seed que insira ao menos 3 registros em cada tabela, conforme regra de negócio.

Comandos típicos (ajuste conforme scripts do `package.json`):

```bash
# rodar migrations
npm run typeorm migration:run

# rodar seeds
npm run seed

# iniciar em modo desenvolvimento
npm run dev
```

6. Acesso ao banco (VS Code ou DBeaver):

- VS Code: instale a extensão `PostgreSQL`, crie uma nova conexão com as variáveis do `.env` e abra o browser de tabelas.
- DBeaver: crie uma nova conexão PostgreSQL usando host, porta, usuário, senha e banco.

Notas importantes:

- Garanta que os dados sensíveis no banco estejam criptografados (conforme RNF).
- O script de inicialização deve inserir ao menos 3 registros por tabela para testes (conforme regra de negócio).
- Se desejar, posso gerar um `seed` script base para acelerar o setup.
