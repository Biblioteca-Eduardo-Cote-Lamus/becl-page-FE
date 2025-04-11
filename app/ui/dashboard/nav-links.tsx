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
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-secondaries_red-900 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-secondaries_red-900': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
