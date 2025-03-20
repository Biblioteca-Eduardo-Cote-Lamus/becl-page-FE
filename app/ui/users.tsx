import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export async function fetchUsuarios() {
  try {
    const apiKey = process.env.API_KEY || ''; // Asegúrate de que apiKey no sea undefined
    // if (!apiKey) {
    //   throw new Error('API Key is not defined');
    // }
    // console.log('Sending API Key:', apiKey);
    // console.log('Fetching usuarios data...');
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulando un retraso
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      } as HeadersInit, // Type assertion to ensure correct type
    });
    if (!response.ok) {
      throw new Error('Failed to fetch usuarios data.');
    }
    const data = await response.json();
    console.log('Data fetch completed after 3 seconds.');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch usuarios data.');
  }
}

  
  

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export default function UsuariosComponent() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetchUsuarios().then(data => setUsuarios(data)).catch(error => console.error(error));
  }, []);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">
        Usuarios
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {usuarios.map((usuario, i) => (
            <div
              key={usuario.id}
              className={clsx(
                "flex flex-row items-center justify-between py-4",
                {
                  "border-t": i !== 0,
                }
              )}
            >
              <div className="flex items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {usuario.nombre}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {usuario.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20h-14c-1.104 0-1.99-.896-1.99-2L3 6c0-1.104.896-2 2-2h14c1.104 0 2 .896 2 2v12c0 1.104-.896 2-2 2zm-7-6h-4v-4m4 0H9m4 0h4M7 8h.01M3 3l18 18" /></svg>
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
