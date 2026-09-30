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