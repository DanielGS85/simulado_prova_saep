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