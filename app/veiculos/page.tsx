'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [termo, setTermo] = useState('');
  const router = useRouter();

  useEffect(() => {
    buscarVeiculos();
  }, []);

  const buscarVeiculos = async (searchTerm = '') => {
    const url = searchTerm ? `/api/veiculos?search=${searchTerm}` : '/api/veiculos';

    const res = await fetch(url);
    if (res.status === 401) {
      router.push('/login');
      return;
    }

    const data = await res.json();
    setVeiculos(data);
  };

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault();
    buscarVeiculos(termo);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link href="/dashboard" className="text-blue-600 mb-4 inline-block">
        ← Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Veículos</h1>

      <form onSubmit={handleBusca} className="mb-6">
        <input
          type="text"
          placeholder="Buscar veículo..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Buscar
        </button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Cliente</th>
              <th className="p-4 text-left">Marca</th>
              <th className="p-4 text-left">Modelo</th>
              <th className="p-4 text-left">Placa</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo: any) => (
              <tr key={veiculo.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{veiculo.id}</td>
                <td className="p-4">{veiculo.cliente_nome || '—'}</td>
                <td className="p-4">{veiculo.marca}</td>
                <td className="p-4">{veiculo.modelo}</td>
                <td className="p-4">{veiculo.placa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
