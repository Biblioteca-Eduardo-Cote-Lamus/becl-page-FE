'use client';

import { useState } from 'react';

export default function AddPersonForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tipo, setTipo] = useState<'personal' | 'desarrollador'>('personal');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const cargo = formData.get('cargo') as string;
    const imagen = formData.get('imagen') as File;

    if (!nombre || !cargo || !imagen) {
      setError('Todos los campos son requeridos');
      setLoading(false);
      return;
    }

    try {
      const endpoint = tipo === 'personal' ? '/api/personal' : '/api/desarrolladores';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al agregar el miembro');
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar el miembro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Tipo de Miembro
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tipo"
              value="personal"
              checked={tipo === 'personal'}
              onChange={() => setTipo('personal')}
              className="form-radio h-4 w-4 text-secondaries_red-900"
            />
            <span className="ml-2">Personal de la Biblioteca</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="tipo"
              value="desarrollador"
              checked={tipo === 'desarrollador'}
              onChange={() => setTipo('desarrollador')}
              className="form-radio h-4 w-4 text-secondaries_red-900"
            />
            <span className="ml-2">Desarrollador</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cargo" className="block text-gray-700 text-sm font-bold mb-2">
          {tipo === 'personal' ? 'Cargo' : 'Rol'}
        </label>
        <input
          type="text"
          id="cargo"
          name="cargo"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {tipo === 'desarrollador' && (
        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-gray-700 text-sm font-bold mb-2">
            LinkedIn (opcional)
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="https://linkedin.com/in/usuario"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="imagen" className="block text-gray-700 text-sm font-bold mb-2">
          Imagen
        </label>
        <input
          type="file"
          id="imagen"
          name="imagen"
          accept="image/*"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Miembro agregado exitosamente
        </div>
      )}

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`bg-secondaries_red-900 hover:bg-secondaries_red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Agregando...' : 'Agregar Miembro'}
        </button>
      </div>
    </form>
  );
} 