"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/app/lib/definitions";
import Link from "next/link";
import { PlusSquare, PenSquare, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "@/app/actions/users";
import { CustomToast } from "@/app/ui/components/CustomToast";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error al cargar los usuarios");
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );
    if (confirmed) {
      try {
        await deleteUser(id);
        toast.success("Usuario eliminado exitosamente");
        setUsers(users.filter((u) => u.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error al eliminar el usuario");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondaries_red-700"></div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay usuarios disponibles.</p>
        <Link
          href="/dashboard/usuarios/create"
          className="mt-4 inline-block bg-secondaries_red-700 hover:bg-secondaries_red-800 text-white font-bold py-2 px-4 rounded"
        >
          <PlusSquare className="mr-1 inline-block" />
          Crear Usuario
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/dashboard/usuarios/create"
        className="bg-secondaries_red-700 hover:bg-secondaries_red-800 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
      >
        <PlusSquare className="mr-1 inline-block" />
        Crear Usuario
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-center">Nombre</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex space-x-2 justify-center">
                    <Link
                      href={`/dashboard/usuarios/${user.id}/edit`}
                      className="text-secondaries_red-700 hover:text-secondaries_red-800"
                    >
                      <PenSquare className="inline-block" />
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="inline-block" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomToast />
    </div>
  );
}
