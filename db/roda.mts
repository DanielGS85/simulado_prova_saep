import postgres from 'postgres';

const arquivo = process.argv[2];
const sql = postgres(process.env.DATABASE_URL!, { onnotice: () => {} });

await sql.file(arquivo).simple();
console.log('✔', arquivo);
await sql.end();