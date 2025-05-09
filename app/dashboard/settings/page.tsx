import { openSans } from "@/app/ui/fonts";
import {User, Bell, Shield, Database} from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className={`${openSans.className} text-2xl md:text-3xl font-bold text-gray-900`}>
          Configuración del Sistema
        </h1>
        <p className="text-gray-600 mt-2">
          Gestiona la configuración general del sistema y personaliza su comportamiento.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Configuración de Perfil */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Perfil de Usuario</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de Usuario
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu nombre de usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Configuración de Notificaciones */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Notificaciones</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificaciones por Email</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notificaciones Push</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Configuración de Seguridad */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Seguridad</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cambiar Contraseña
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                placeholder="Nueva contraseña"
              />
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirmar contraseña"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Actualizar Contraseña
            </button>
          </div>
        </div>

        {/* Configuración del Sistema */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold">Sistema</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zona Horaria
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idioma
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 