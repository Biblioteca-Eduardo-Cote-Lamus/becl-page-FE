import Link from "next/link";
import { Users, Newspaper, Calendar, FileText, Settings, HelpCircle } from "lucide-react";

const quickLinks = [
  {
    title: "Usuarios",
    href: "/dashboard/usuarios",
    icon: <Users className="h-6 w-6" />,
    description: "Gestionar usuarios del sistema"
  },
  {
    title: "Noticias",
    href: "/dashboard/noticias",
    icon: <Newspaper className="h-6 w-6" />,
    description: "Administrar noticias y publicaciones"
  },
  {
    title: "Eventos",
    href: "/dashboard/eventos",
    icon: <Calendar className="h-6 w-6" />,
    description: "Gestionar eventos y calendario"
  },
  {
    title: "Documentos",
    href: "/dashboard/documentos",
    icon: <FileText className="h-6 w-6" />,
    description: "Administrar documentos y archivos"
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: <Settings className="h-6 w-6" />,
    description: "Configuración del sistema"
  },
  {
    title: "Ayuda",
    href: "/dashboard/help",
    icon: <HelpCircle className="h-6 w-6" />,
    description: "Centro de ayuda y soporte"
  }
];

export default function QuickLinks() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Accesos Rápidos</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-4">
              {link.icon}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{link.title}</h3>
              <p className="text-sm text-gray-500">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 