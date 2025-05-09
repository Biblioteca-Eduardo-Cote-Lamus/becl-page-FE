'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditPersonForm from './EditPersonForm';

interface Funcionario {
  id: number;
  nombre: string;
  cargo: string;
  imagen: string;
}

export default function PersonalList() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Funcionario | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('/api/personal');
      if (!response.ok) {
        throw new Error('Error al cargar el personal');
      }
      const data = await response.json();
      setFuncionarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el personal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (funcionario: Funcionario) => {
    setSelectedPerson(funcionario);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este miembro?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/personal?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el miembro');
      }

      router.refresh();
      fetchFuncionarios();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el miembro');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      {selectedPerson && (
        <EditPersonForm
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          type="personal"
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funcionarios.map((funcionario) => (
          <div key={funcionario.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={`/api/uploads/funcionarios/${funcionario.imagen}`}
                alt={funcionario.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(funcionario)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(funcionario.id)}
                  disabled={isDeleting}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{funcionario.nombre}</h3>
              <p className="text-gray-600">{funcionario.cargo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 