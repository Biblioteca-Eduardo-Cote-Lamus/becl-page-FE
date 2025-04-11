"use client";

import React, { useState } from "react";
import { createUser, updateUser } from "@/app/actions/users";
import { User } from "@/app/lib/definitions";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserFormProps {
  user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = user
        ? await updateUser(user.id, formData)
        : await createUser(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(user ? "Usuario actualizado" : "Usuario creado");
        router.push("/dashboard/usuarios");
        router.refresh();
      }
    } catch {
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user?.name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user?.email}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {user ? "Nueva Contraseña (opcional)" : "Contraseña"}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required={!user}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isSubmitting
            ? "Procesando..."
            : user
              ? "Actualizar Usuario"
              : "Crear Usuario"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default UserForm;
