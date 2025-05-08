'use client';
import React from "react";
import {
  Users,
  FileText,
  Newspaper,
  Calendar,
  Briefcase,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: "Home", href: "/dashboard", icon: HomeIcon },
  // {
  //   name: "Invoices",
  //   href: "/dashboard/invoices",
  //   icon: DocumentDuplicateIcon,
  // },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Noticias", href: "/dashboard/noticias", icon: Newspaper },
  { name: "Eventos", href: "/dashboard/eventos", icon: Calendar },
  { name: "Servicios", href: "/dashboard/servicios", icon: Briefcase },
  { name: "Nosotros", href: "/dashboard/nosotros", icon: Users },
  { name: "Documentos", href: "/dashboard/documentos", icon: FileText },
  { name: "Gestión de Usuarios", href: "/dashboard/usuarios", icon: UserCog },
  { name: "Préstamos", href: "/dashboard/prestamos", icon: Calendar },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'group flex h-[48px] grow items-center justify-center gap-2 rounded-xl bg-white p-2 text-sm font-medium shadow-sm transition-all duration-300 hover:shadow-md md:flex-none md:justify-start md:px-3',
              {
                'bg-secondaries_red-950/5 text-secondaries_red-700': pathname === link.href,
                'hover:bg-secondaries_red-950/5': pathname !== link.href,
              },
            )}
          >
            <div className={clsx(
              'rounded-lg p-1.5 sm:p-2 transition-colors',
              {
                'bg-secondaries_red-950/10': pathname === link.href,
                'bg-secondaries_red-950/5 group-hover:bg-secondaries_red-950/10': pathname !== link.href,
              }
            )}>
              <LinkIcon className={clsx(
                'w-4 h-4 sm:w-5 sm:h-5',
                {
                  'text-secondaries_red-700': pathname === link.href,
                  'text-gray-600 group-hover:text-secondaries_red-700': pathname !== link.href,
                }
              )} />
            </div>
            <p className={clsx(
              'hidden text-xs sm:text-sm md:block',
              {
                'text-secondaries_red-700': pathname === link.href,
                'text-gray-600 group-hover:text-secondaries_red-700': pathname !== link.href,
              }
            )}>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
