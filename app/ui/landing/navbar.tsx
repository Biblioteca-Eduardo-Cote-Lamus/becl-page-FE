"use client";

import { useState, useEffect } from "react";
import AcmeLogo from "../becl-logo";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

export default function Navbar() {
  type DropdownMenu = "bibliotecaDigital" | "servicios" | "nosotros";

  const [dropdownOpen, setDropdownOpen] = useState<
    Record<DropdownMenu, boolean>
  >({
    bibliotecaDigital: false,
    servicios: false,
    nosotros: false,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Limpiar el timeout anterior si existe
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Crear un nuevo timeout para retrasar la acción
      const timeout = setTimeout(() => {
        // Solo ocultar/mostrar si el scroll es significativo (más de 50px)
        if (Math.abs(currentScrollY - lastScrollY) > 50) {
          if (currentScrollY > lastScrollY) {
            // Scroll hacia abajo
            setIsVisible(false);
          } else {
            // Scroll hacia arriba
            setIsVisible(true);
          }
        }
        
        // Actualizar el estado de scroll para el fondo
        setScrolled(currentScrollY > 20);
        setLastScrollY(currentScrollY);
      }, 150); // Retraso de 150ms

      setScrollTimeout(timeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  const toggleMobileDropdown = (menu: DropdownMenu) => {
    setDropdownOpen((prev) => ({
      bibliotecaDigital: false,
      servicios: false,
      nosotros: false,
      [menu]: !prev[menu],
    }));
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-secondaries_red-900/95 shadow-lg"
          : "bg-secondaries_red-900"
      } ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="md:container md:mx-auto md:flex md:justify-between md:items-center md:h-20 px-4">
        <div className="flex items-center justify-between h-16 md:h-auto">
          <Link
            href="/"
            className="transition-transform duration-200 hover:scale-105"
          >
            <AcmeLogo />
          </Link>

          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-secondaries_red-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="text-2xl transition-transform duration-200" />
            ) : (
              <Menu className="text-2xl transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Biblioteca Digital Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-colors px-3 py-2 rounded-md group-hover:bg-secondaries_red-800">
              Biblioteca Digital
              <ChevronDown className="ml-2 inline-block" />
            </button>
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <DropdownLink
                href="https://catalogobiblioteca.ufps.edu.co/"
                external
              >
                Catálogo en Línea
              </DropdownLink>
              <DropdownLink
                href="https://login.bdbiblioteca.ufps.edu.co/public/menu.htm"
                external
              >
                Bases de Datos
              </DropdownLink>
            </div>
          </div>

          {/* Servicios Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-colors px-3 py-2 rounded-md group-hover:bg-secondaries_red-800">
              Servicios
              <ChevronDown className="ml-2 inline-block" />
            </button>
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <DropdownLink href="/servicios#digitales">
                Servicios Digitales
              </DropdownLink>
              <DropdownLink href="/servicios#presenciales">
                Servicios Presenciales
              </DropdownLink>
              <DropdownLink href="/servicios#especiales">
                Servicios Especiales
              </DropdownLink>
              <DropdownLink
                href="https://docs.google.com/forms/d/e/1FAIpQLSehbsIU0_ZyR09Nq-EiYbJu_0ARjh1QMhIuToV-fYlKftn3Zw/viewform"
                external
              >
                Préstamo Interbibliotecario SIES+
              </DropdownLink>
            </div>
          </div>

          {/* Nosotros Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-colors px-3 py-2 rounded-md group-hover:bg-secondaries_red-800">
              Nosotros
              <ChevronDown className="ml-2 inline-block" />
            </button>
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <DropdownLink href="/info#historia">Historia</DropdownLink>
              <DropdownLink href="/info#mision-vision">
                Misión y Visión
              </DropdownLink>
              <DropdownLink href="/bio">Biografía</DropdownLink>
              <DropdownLink href="/politicas">
                Políticas de Calidad
              </DropdownLink>
              <DropdownLink href="/equipo">Talento Humano</DropdownLink>
            </div>
          </div>

          <NavLink href="/docs">Documentos</NavLink>
          <NavLink href="/pazysalvo">Paz y Salvo</NavLink>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden transition-all duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-secondaries_red-800 px-4 py-2 space-y-1">
          {/* Biblioteca Digital Mobile */}
          <div className="border-b border-secondaries_red-700">
            <button
              onClick={() => toggleMobileDropdown("bibliotecaDigital")}
              className="w-full flex justify-between items-center text-white px-3 py-2"
            >
              Biblioteca Digital
              {dropdownOpen.bibliotecaDigital ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                dropdownOpen.bibliotecaDigital ? "max-h-48" : "max-h-0"
              }`}
            >
              <MobileDropdownLink
                href="https://catalogobiblioteca.ufps.edu.co/"
                external
              >
                Catálogo en Línea
              </MobileDropdownLink>
              <MobileDropdownLink
                href="https://login.bdbiblioteca.ufps.edu.co/public/menu.htm"
                external
              >
                Bases de Datos
              </MobileDropdownLink>
            </div>
          </div>

          {/* Servicios Mobile */}
          <div className="border-b border-secondaries_red-700">
            <button
              onClick={() => toggleMobileDropdown("servicios")}
              className="w-full flex justify-between items-center text-white px-3 py-2"
            >
              Servicios
              {dropdownOpen.servicios ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                dropdownOpen.servicios ? "max-h-64" : "max-h-0"
              }`}
            >
              <MobileDropdownLink href="/servicios#digitales">
                Servicios Digitales
              </MobileDropdownLink>
              <MobileDropdownLink href="/servicios#presenciales">
                Servicios Presenciales
              </MobileDropdownLink>
              <MobileDropdownLink href="/servicios#especiales">
                Servicios Especiales
              </MobileDropdownLink>
              <MobileDropdownLink
                href="https://docs.google.com/forms/d/e/1FAIpQLSehbsIU0_ZyR09Nq-EiYbJu_0ARjh1QMhIuToV-fYlKftn3Zw/viewform"
                external
              >
                Préstamo Interbibliotecario SIES+
              </MobileDropdownLink>
            </div>
          </div>

          {/* Nosotros Mobile */}
          <div className="border-b border-secondaries_red-700">
            <button
              onClick={() => toggleMobileDropdown("nosotros")}
              className="w-full flex justify-between items-center text-white px-3 py-2"
            >
              Nosotros
              {dropdownOpen.nosotros ? (
                <ChevronUp className="transition-transform duration-200" />
              ) : (
                <ChevronDown className="transition-transform duration-200" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                dropdownOpen.nosotros ? "max-h-64" : "max-h-0"
              }`}
            >
              <MobileDropdownLink href="/info#historia">Historia</MobileDropdownLink>
              <MobileDropdownLink href="/info#mision-vision">
                Misión y Visión
              </MobileDropdownLink>
              <MobileDropdownLink href="/bio">Biografía</MobileDropdownLink>
              <MobileDropdownLink href="/politicas">
                Políticas de Calidad
              </MobileDropdownLink>
              <MobileDropdownLink href="/equipo">Talento Humano</MobileDropdownLink>
            </div>
          </div>

          <MobileNavLink href="/docs">Documentos</MobileNavLink>
          <MobileNavLink href="/pazysalvo">Paz y Salvo</MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const DropdownLink = ({ href, children, external = false }: LinkProps) => (
  <Link
    href={href}
    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    {children}
  </Link>
);

const MobileDropdownLink = ({ href, children, external = false }: LinkProps) => (
  <Link
    href={href}
    className="block px-6 py-2 text-white hover:bg-secondaries_red-700 transition-colors"
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    {children}
  </Link>
);

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="text-white hover:text-gray-300 transition-colors px-3 py-2 rounded-md hover:bg-secondaries_red-800"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block px-3 py-2 text-white hover:bg-secondaries_red-700 transition-colors"
  >
    {children}
  </Link>
);
