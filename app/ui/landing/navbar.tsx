"use client";

import { useState, useEffect } from "react";
import AcmeLogo from "../becl-logo";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

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
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto lg:flex lg:justify-between lg:items-center lg:h-20 px-4">
        <div className="flex items-center justify-between h-16 lg:h-auto">
          <Link
            href="/"
            className="transition-transform duration-200 hover:scale-105"
          >
            <AcmeLogo />
          </Link>

          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-secondaries_red-800 transition-colors"
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
        <div className="hidden lg:flex items-center space-x-4 lg:space-x-8">
          {/* Biblioteca Digital Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-all duration-200 px-3 py-2 rounded-md hover:bg-secondaries_red-800 flex items-center gap-1">
              Biblioteca Digital
              <ChevronDown className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
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
            <button className="text-white group-hover:text-gray-300 transition-all duration-200 px-3 py-2 rounded-md hover:bg-secondaries_red-800 flex items-center gap-1">
              Servicios
              <ChevronDown className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
              <DropdownLink href="/servicios">Servicios Digitales</DropdownLink>
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
              <DropdownLink href="/prestamos">
                Préstamo de Auditorio y Sala de Semilleros
              </DropdownLink>
              <DropdownLink href="/estadisticas">Estadísticas</DropdownLink>
              <DropdownLink href="https://pqrsdf.ufps.edu.co/" external>
                PQRSDF
              </DropdownLink>
            </div>
          </div>

          {/* Nosotros Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-colors px-2 py-2 rounded-md group-hover:bg-secondaries_red-800 text-sm lg:text-base lg:px-3">
              Nosotros
              <ChevronDown className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <DropdownLink href="/info">Historia</DropdownLink>
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
        className={`lg:hidden fixed left-0 right-0 top-16 transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } bg-secondaries_red-800 shadow-lg`}
        style={{
          maxHeight: "calc(100vh - 4rem)",
          overflowY: "auto",
        }}
      >
        <div className="px-4 py-2 space-y-1">
          {/* Biblioteca Digital Mobile */}
          <div className="border-b border-secondaries_red-700/30">
            <button
              onClick={() => toggleMobileDropdown("bibliotecaDigital")}
              className="w-full flex justify-between items-center text-white/90 hover:text-white px-3 py-2.5 hover:bg-secondaries_red-700/50 transition-all duration-200 rounded-md"
            >
              Biblioteca Digital
              <ChevronDown
                className={`transition-transform duration-300 ${
                  dropdownOpen.bibliotecaDigital ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                dropdownOpen.bibliotecaDigital
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
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
              className="w-full flex justify-between items-center text-white/90 hover:text-white px-3 py-2.5 hover:bg-secondaries_red-700/50 transition-all duration-200 rounded-md"
            >
              Servicios
              <ChevronDown
                className={`transition-transform duration-300 ${
                  dropdownOpen.servicios ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                dropdownOpen.servicios
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
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
              <MobileDropdownLink href="/prestamos">
                Préstamo de Auditorio y Sala de Semilleros
              </MobileDropdownLink>
              <MobileDropdownLink href="/estadisticas">
                Estadisticas
              </MobileDropdownLink>
              <MobileDropdownLink href="https://pqrsdf.ufps.edu.co/" external>
                PQRSDF
              </MobileDropdownLink>
            </div>
          </div>

          {/* Nosotros Mobile */}
          <div className="border-b border-secondaries_red-700">
            <button
              onClick={() => toggleMobileDropdown("nosotros")}
              className="w-full flex justify-between items-center text-white/90 hover:text-white px-3 py-2.5 hover:bg-secondaries_red-700/50 transition-all duration-200 rounded-md"
            >
              Nosotros
              <ChevronDown
                className={`transition-transform duration-300 ${
                  dropdownOpen.nosotros ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                dropdownOpen.nosotros
                  ? "max-h-72 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <MobileDropdownLink href="/info#historia">
                Historia
              </MobileDropdownLink>
              <MobileDropdownLink href="/info#mision-vision">
                Misión y Visión
              </MobileDropdownLink>
              <MobileDropdownLink href="/bio">Biografía</MobileDropdownLink>
              <MobileDropdownLink href="/politicas">
                Políticas de Calidad
              </MobileDropdownLink>
              <MobileDropdownLink href="/equipo">
                Talento Humano
              </MobileDropdownLink>
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
    className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-secondaries_red-900 transition-all duration-200 first:rounded-t-md last:rounded-b-md border-b border-gray-100 last:border-0"
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    {children}
  </Link>
);

const MobileDropdownLink = ({
  href,
  children,
  external = false,
}: LinkProps) => (
  <Link
    href={href}
    className="block px-6 py-2.5 text-white/90 hover:text-white hover:bg-secondaries_red-700 transition-all duration-200 border-b border-secondaries_red-700/30"
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
    className="text-white hover:text-white transition-all duration-200 px-2 py-2 rounded-md hover:bg-secondaries_red-800 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-200 after:bg-white/30 text-sm lg:text-base lg:px-3"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="block px-3 py-2.5 text-white/90 hover:text-white hover:bg-secondaries_red-700 transition-all duration-200 rounded-md"
  >
    {children}
  </Link>
);
