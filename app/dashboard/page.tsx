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