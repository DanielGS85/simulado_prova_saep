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