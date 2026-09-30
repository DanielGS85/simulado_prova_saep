# 🎯 ROTEIRO PROVA - 4 HORAS (DO ZERO)

## ⏱️ DISTRIBUIÇÃO DE TEMPO
- **00-15min:** Setup Inicial
- **15-50min:** Scripts SQL (banco)
- **50-120min:** Frontend (páginas)
- **120-170min:** API Routes (backend)
- **170-210min:** Segurança + Validações
- **210-240min:** Testes + Entrega

---

## FASE 1: SETUP INICIAL (15 MIN)

### 1.1 Criar projeto Next.js
```bash
npx create-next-app@latest oficina --ts --app --tailwind \--no-eslint --import-alias "@/*"

cd oficina
```

### 1.2 Instalar única dependência
```bash
npm i postgres
```
ou instale a extencao postgres e crie o banco

### 1.3 Criar banco vazio
```bash
createdb oficina_db
ou
dierto pela extencao do psotgres

CREATE DATABASE oficina_db;
```
### 1.4 Teste o banco
```banch
node --env-file=.env.local -e "import postgres from 'postgres'; const sql = postgres(process.env.DATABASE_URL); const result = await sql`SELECT NOW() AS agora, current_database() AS banco`; console.log(result[0]); await sql.end();"
```
### retorno do teste

{ agora: 2026-09-29T..., banco: 'oficina_db' }

### 1.4 Criar .env.local
```env
DATABASE_URL=postgres://postgres:senha@localhost:5432/oficina_db
CHAVE_CRIPTO=chave-secreta-super-longa-123456789
SESSAO_SEGREDO=outra-chave-secreta-muito-longa-987654321
```

### 1.5 Criar pastas necessárias
```bash
mkdir -p db lib
```

---

## FASE 2: SCRIPTS SQL (35 MIN)

### 2.1 Criar db/roda.mts
```typescript
import postgres from 'postgres';

const arquivo = process.argv[2];
const sql = postgres(process.env.DATABASE_URL!, { onnotice: () => {} });

await sql.file(arquivo).simple();
console.log('✔', arquivo);
await sql.end();
```

### 2.2 Criar db/levanta.sql
```sql
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
```

### 2.3 Criar db/popula.sql
```sql
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
```

### 2.4 Atualizar package.json (scripts)
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "db:levanta": "node --env-file=.env.local --loader ts-node/esm db/roda.mts db/levanta.sql",
  "db:popula": "node --env-file=.env.local --loader ts-node/esm db/roda.mts db/popula.sql"
}
```

### 2.5 Executar scripts
```bash
npm run db:levanta
npm run db:popula
```

---

## FASE 3: FRONTEND (70 MIN)

### 3.1 Criar lib/db.ts (conexão única)
```typescript
import postgres from 'postgres';

export const sql = postgres(process.env.DATABASE_URL!);

export async function criptografar(texto: string): Promise<string> {
  const { createCipheriv, randomBytes } = await import('crypto');
  const chave = process.env.CHAVE_CRIPTO!.slice(0, 32).padEnd(32, '0');
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(chave), iv);
  
  let criptografado = cipher.update(texto, 'utf8', 'hex');
  criptografado += cipher.final('hex');
  
  return iv.toString('hex') + ':' + criptografado;
}

export async function descriptografar(hash: string): Promise<string> {
  const { createDecipheriv } = await import('crypto');
  const chave = process.env.CHAVE_CRIPTO!.slice(0, 32).padEnd(32, '0');
  const [ivHex, criptografado] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(chave), iv);
  let descriptografado = decipher.update(criptografado, 'hex', 'utf8');
  descriptografado += decipher.final('utf8');
  
  return descriptografado;
}

export async function hashSenha(senha: string): Promise<string> {
  const { scryptSync } = await import('crypto');
  const salt = process.env.SESSAO_SEGREDO!.slice(0, 16);
  return scryptSync(senha, salt, 64).toString('hex');
}
```

### 3.2 Criar app/lib/auth.ts (cookies de sessão)
```typescript
import { cookies } from 'next/headers';
import { sql } from '@/lib/db';

export async function setSessionCookie(usuarioId: number) {
  const cookieStore = await cookies();
  const expira = new Date(Date.now() + 3600000); // 1 hora
  cookieStore.set('sessionId', usuarioId.toString(), { 
    expires: expira,
    httpOnly: true 
  });
}

export async function getSessionUsuarioId() {
  const cookieStore = await cookies();
  return cookieStore.get('sessionId')?.value;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('sessionId');
}
```

### 3.3 Criar app/layout.tsx
```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oficina Sistema',
  description: 'Sistema de Gerenciamento de Oficina',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
```

### 3.4 Criar app/page.tsx (redirect para login)
```typescript
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
}
```

### 3.5 Criar app/login/page.tsx
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      setErro('Email ou senha inválidos');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Oficina Sistema</h1>
        
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          
          {erro && <p className="text-red-500 mb-4">{erro}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Teste: admin@oficina.com
        </p>
      </div>
    </div>
  );
}
```

### 3.6 Criar app/dashboard/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const [usuario, setUsuario] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => {
      if (!data.usuario) router.push('/login');
      setUsuario(data.usuario);
    });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Bem-vindo, {usuario?.nome}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Opciones do Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/clientes"
            className="p-6 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Clientes
          </Link>
          
          <Link
            href="/veiculos"
            className="p-6 bg-green-500 text-white rounded shadow hover:bg-green-600"
          >
            Veículos
          </Link>
          
          <Link
            href="/ordensdeservico"
            className="p-6 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
          >
            Ordens de Serviço
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### 3.7 Criar app/clientes/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [termo, setTermo] = useState('');
  const router = useRouter();

  useEffect(() => {
    buscarClientes();
  }, []);

  const buscarClientes = async (searchTerm = '') => {
    const url = searchTerm 
      ? `/api/clientes?search=${searchTerm}`
      : '/api/clientes';
    
    const res = await fetch(url);
    if (res.status === 401) {
      router.push('/login');
      return;
    }
    const data = await res.json();
    setClientes(data);
  };

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    buscarClientes(termo);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link href="/dashboard" className="text-blue-600 mb-4 inline-block">
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Clientes</h1>

      <form onSubmit={handleBusca} className="mb-6">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">CPF</th>
              <th className="p-4 text-left">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente: any) => (
              <tr key={cliente.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{cliente.id}</td>
                <td className="p-4">{cliente.nome}</td>
                <td className="p-4">***</td>
                <td className="p-4">***</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### 3.8 Criar app/veiculos/page.tsx e app/ordensdeservico/page.tsx
(Seguir padrão similar ao de clientes - REDUZIDO para economizar tempo)

---

## FASE 4: API ROUTES (50 MIN)

### 4.1 Criar app/api/auth/login/route.ts
```typescript
import { sql, hashSenha } from '@/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    const usuarios = await sql`
      SELECT * FROM usuario WHERE email = ${email}
    `;

    if (usuarios.length === 0) {
      return NextResponse.json({ erro: 'Inválido' }, { status: 401 });
    }

    const usuario = usuarios[0];
    const senhaHash = await hashSenha(senha);

    if (usuario.senha_hash !== senhaHash) {
      return NextResponse.json({ erro: 'Inválido' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set('sessionId', usuario.id.toString(), {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    });

    return NextResponse.json({ sucesso: true });
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro servidor' }, { status: 500 });
  }
}
```

### 4.2 Criar app/api/auth/logout/route.ts
```typescript
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('sessionId');
  return NextResponse.json({ sucesso: true });
}
```

### 4.3 Criar app/api/auth/me/route.ts
```typescript
import { sql } from '@/lib/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;

    if (!sessionId) {
      return NextResponse.json({ usuario: null });
    }

    const usuarios = await sql`
      SELECT id, nome, email FROM usuario WHERE id = ${parseInt(sessionId)}
    `;

    return NextResponse.json({ usuario: usuarios[0] || null });
  } catch (erro) {
    return NextResponse.json({ usuario: null });
  }
}
```

### 4.4 Criar app/api/clientes/route.ts
```typescript
import { sql, criptografar, descriptografar } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    let clientes;

    if (search) {
      clientes = await sql`
        SELECT id, nome, cpf_enc, telefone_enc FROM cliente
        WHERE nome ILIKE ${`%${search}%`}
        ORDER BY nome
      `;
    } else {
      clientes = await sql`
        SELECT id, nome, cpf_enc, telefone_enc FROM cliente
        ORDER BY nome
      `;
    }

    return NextResponse.json(clientes);
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome, cpf, telefone } = await request.json();

    const cpf_enc = await criptografar(cpf);
    const telefone_enc = await criptografar(telefone);

    const resultado = await sql`
      INSERT INTO cliente (nome, cpf_enc, telefone_enc)
      VALUES (${nome}, ${cpf_enc}, ${telefone_enc})
      RETURNING id, nome
    `;

    return NextResponse.json(resultado[0], { status: 201 });
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro' }, { status: 400 });
  }
}
```

### 4.5 Criar app/api/veiculos/route.ts
```typescript
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const veiculos = await sql`
      SELECT v.id, v.modelo, v.marca, v.placa, c.nome as cliente_nome
      FROM veiculo v
      JOIN cliente c ON v.id_cliente = c.id
      ORDER BY v.marca
    `;
    return NextResponse.json(veiculos);
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id_cliente, modelo, marca, placa } = await request.json();

    const resultado = await sql`
      INSERT INTO veiculo (id_cliente, modelo, marca, placa)
      VALUES (${id_cliente}, ${modelo}, ${marca}, ${placa})
      RETURNING *
    `;

    return NextResponse.json(resultado[0], { status: 201 });
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro' }, { status: 400 });
  }
}
```

### 4.6 Criar app/api/ordensdeservico/route.ts
```typescript
import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ordensdeservico = await sql`
      SELECT 
        o.id, o.data_entrada, o.data_saida, o.status,
        c.nome as cliente_nome,
        v.modelo, v.marca, v.placa
      FROM ordem_servico o
      JOIN cliente c ON o.id_cliente = c.id
      JOIN veiculo v ON o.id_veiculo = v.id
      ORDER BY o.data_entrada DESC
    `;
    return NextResponse.json(ordensdeservico);
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id_veiculo, id_cliente, data_entrada, servicos, status } = 
      await request.json();

    const resultado = await sql`
      INSERT INTO ordem_servico 
      (id_veiculo, id_cliente, data_entrada, servicos, status)
      VALUES (${id_veiculo}, ${id_cliente}, ${data_entrada}, ${servicos}, ${status})
      RETURNING *
    `;

    return NextResponse.json(resultado[0], { status: 201 });
  } catch (erro) {
    return NextResponse.json({ erro: 'Erro' }, { status: 400 });
  }
}
```

---

## FASE 5: TESTES E ENTREGA (40 MIN)

### 5.1 Testar na browser
```bash
npm run dev
# Acessa http://localhost:3000
# Login: admin@oficina.com / admin123
```

### 5.2 Gerar DER (DBeaver)
- Conectar no banco
- Ferramentas → ER Diagram
- Exportar como PNG/PDF

### 5.3 Criar documentacao.pdf
Incluir:
- Requisitos Funcionais/Não Funcionais
- Arquitetura
- Como usar

### 5.4 Criar oficina_db.sql (dump)
```bash
pg_dump oficina_db > oficina_db.sql
```

### 5.5 Compactar para entrega
```bash
zip -r "SeuNome.zip" oficina/ documentacao.pdf DER.png oficina_db.sql
```

---

## ⏰ CHECKLIST FINAL

- [ ] Next.js criado
- [ ] Banco vazio criado
- [ ] db/levanta.sql executado
- [ ] db/popula.sql executado
- [ ] 5 páginas front criadas
- [ ] 5 API routes criadas
- [ ] Login funcionando
- [ ] Busca de clientes funcionando
- [ ] Ordens ordenadas por data
- [ ] DER gerado
- [ ] Documentação pronta
- [ ] Arquivo ZIP pronto

---

## 🎯 RESULTADO ESPERADO

✅ Projeto Next.js full stack  
✅ Banco PostgreSQL com dados  
✅ Interface funcional com Tailwind  
✅ API routes com segurança  
✅ Arquivos de entrega  

**Total: 4 horas - pronto para entregar! 🚀**
