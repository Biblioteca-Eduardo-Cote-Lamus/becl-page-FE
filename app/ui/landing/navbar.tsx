"use client";

import { useState, useEffect } from "react";
import AcmeLogo from "../becl-logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      }`}
    >
      <div className="md:container md:mx-auto md:flex md:justify-between md:items-center md:h-20 px-4">
        <div className="flex items-center justify-between h-16 md:h-auto">
          <a
            href="/"
            className="transition-transform duration-200 hover:scale-105"
          >
            <AcmeLogo />
          </a>

          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-secondaries_red-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={mobileMenuOpen ? faXmark : faBars}
              className="text-2xl transition-transform duration-200"
            />
          </button>
        </div>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Biblioteca Digital Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-colors px-3 py-2 rounded-md group-hover:bg-secondaries_red-800">
              Biblioteca Digital
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
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
              <DropdownLink
                href="http://biblioteca.ufps.edu.co/biblioteca-digital/"
                external
              >
                Biblioteca 3D
              </DropdownLink>
            </div>
          </div>

          {/* Servicios Dropdown */}
          <div className="dropdown-container relative group">
            <button className="text-white group-hover:text-gray-300 transition-colors px-3 py-2 rounded-md group-hover:bg-secondaries_red-800">
              Servicios
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
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
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
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
        className={`md:hidden transition-all duration-300 ${
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
              <FontAwesomeIcon
                icon={dropdownOpen.bibliotecaDigital ? faAngleUp : faAngleDown}
                className="transition-transform duration-200"
              />
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
              <MobileDropdownLink
                href="http://biblioteca.ufps.edu.co/biblioteca-digital/"
                external
              >
                Biblioteca 3D
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
              <FontAwesomeIcon
                icon={dropdownOpen.servicios ? faAngleUp : faAngleDown}
                className="transition-transform duration-200"
              />
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
              <FontAwesomeIcon
                icon={dropdownOpen.nosotros ? faAngleUp : faAngleDown}
                className="transition-transform duration-200"
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                dropdownOpen.nosotros ? "max-h-64" : "max-h-0"
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

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-white hover:text-gray-300 px-3 py-2 rounded-md hover:bg-secondaries_red-800 transition-colors"
  >
    {children}
  </a>
);

const DropdownLink = ({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => (
  <a
    href={href}
    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="block text-white px-3 py-2 hover:bg-secondaries_red-700 transition-colors"
  >
    {children}
  </a>
);

const MobileDropdownLink = ({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => (
  <a
    href={href}
    className="block text-white hover:bg-secondaries_red-700 px-3 py-2 pl-6 transition-colors"
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
  >
    {children}
  </a>
);
