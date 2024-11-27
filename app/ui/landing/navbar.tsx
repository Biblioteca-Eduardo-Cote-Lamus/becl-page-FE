import { useState } from "react";
import AcmeLogo from "../becl-logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBars,
} from "@fortawesome/free-solid-svg-icons";



export default function Navbar() {
  // Estado para manejar los dropdowns de forma independiente
  type DropdownMenu = "bibliotecaDigital" | "servicios" | "nosotros";

  const [dropdownOpen, setDropdownOpen] = useState<
    Record<DropdownMenu, boolean>
  >({
    bibliotecaDigital: false,
    servicios: false,
    nosotros: false,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="bg-secondaries_red-900 fixed top-0 w-full z-50">
      <div className="md:container md:mx-auto md:flex md:justify-between md:items-center md:h-24">
        <a href="/" className="max-md:hidden">
          <AcmeLogo />
        </a>

        {/* Menú de escritorio */}
        <div className="hidden md:flex space-x-6">
          {/* Dropdown "Biblioteca Digital" */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen({
                  bibliotecaDigital: !dropdownOpen.bibliotecaDigital,
                  servicios: false,
                  nosotros: false,
                });
              }}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Biblioteca Digital
              <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
            </button>

            {dropdownOpen.bibliotecaDigital && (
              <div className="absolute right-0 mt-6 w-48 bg-white rounded-md shadow-lg">
                <a
                  href="https://catalogobiblioteca.ufps.edu.co/"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                  target="_blank"
                  rel="noopener"
                >
                  Catálogo en Línea
                </a>
                <a
                  href="https://login.bdbiblioteca.ufps.edu.co/public/menu.htm"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                  target="_blank"
                  rel="noopener"
                >
                  Bases de Datos
                </a>
                <a
                  href="http://biblioteca.ufps.edu.co/biblioteca-digital/"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                  target="_blank"
                  rel="noopener"
                >
                  Biblioteca 3D
                </a>
              </div>
            )}
          </div>

          {/* Dropdown "Servicios" */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen({
                  bibliotecaDigital: false,
                  servicios: !dropdownOpen.servicios,
                  nosotros: false,
                });
              }}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Servicios
              <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
            </button>

            {dropdownOpen.servicios && (
              <div className="absolute right-0 mt-6 w-48 bg-white rounded-md shadow-lg">
                <a
                  href="/servicios#digitales"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Servicios Digitales
                </a>
                <a
                  href="/servicios#presenciales"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Servicios Presenciales
                </a>
                <a
                  href="/servicios#especiales"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Servicios Especiales
                </a>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSehbsIU0_ZyR09Nq-EiYbJu_0ARjh1QMhIuToV-fYlKftn3Zw/viewform"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Préstamo Interbibliotecario SIES+
                </a>
              </div>
            )}
          </div>

          {/* Dropdown "Nosotros" */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen({
                  bibliotecaDigital: false,
                  servicios: false,
                  nosotros: !dropdownOpen.nosotros,
                });
              }}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              Nosotros
              <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
            </button>

            {dropdownOpen.nosotros && (
              <div className="absolute right-0 mt-6 w-48 bg-white rounded-md shadow-lg">
                <a
                  href="/info#historia"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Historia
                </a>
                <a
                  href="/info#mision-vision"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Misión y Visión
                </a>
                <a
                  href="/bio"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Biografía
                </a>
                <a
                  href="/politicas"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Políticas de Calidad
                </a>
                <a
                  href="/equipo"
                  className="block px-4 py-2 text-black hover:bg-gray-300 rounded-md"
                >
                  Talento Humano
                </a>
              </div>
            )}
          </div>

          <a href="/#documentos" className="text-white hover:text-gray-300">
            Documentos
          </a>
          <a href="/pazysalvo" className="text-white hover:text-gray-300">
            Paz y Salvo
          </a>
        </div>

        {/* Menú móvil (Ícono de hamburguesa) */}
        <div className="md:hidden flex items-center justify-around">
          <AcmeLogo />
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-secondaries_red-900 flex flex-col items-center h-auto">
          <a href="/" className="block py-2 px-4 text-white">
            Inicio
          </a>
          {/* Dropdown "Biblioteca Digital" en móvil */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen({
                  ...dropdownOpen,
                  bibliotecaDigital: !dropdownOpen.bibliotecaDigital,
                })
              }
              className="block py-2 px-4 text-white focus:outline-none"
            >
              Biblioteca Digital
              <FontAwesomeIcon
                icon={dropdownOpen.bibliotecaDigital ? faAngleUp : faAngleDown}
                className="ml-1"
              />
            </button>
            <div
              className={`transition-all duration-1000 ease-in-out ${
                dropdownOpen.bibliotecaDigital
                  ? "max-h-screen"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              {dropdownOpen.bibliotecaDigital && (
                <div className="text-center">
                  <a
                    href="https://catalogobiblioteca.ufps.edu.co/"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                    target="_blank"
                    rel="noopener"
                  >
                    Catálogo en Línea
                  </a>
                  <a
                    href="https://login.bdbiblioteca.ufps.edu.co/public/menu.htm"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                    target="_blank"
                    rel="noopener"
                  >
                    Bases de Datos
                  </a>
                  <a
                    href="http://biblioteca.ufps.edu.co/biblioteca-digital/"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                    target="_blank"
                    rel="noopener"
                  >
                    Biblioteca 3D
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* Dropdown "Servicios" en móvil */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen({
                  ...dropdownOpen,
                  servicios: !dropdownOpen.servicios,
                })
              }
              className="block py-2 px-4 text-white focus:outline-none"
            >
              Servicios
              <FontAwesomeIcon
                icon={dropdownOpen.servicios ? faAngleUp : faAngleDown}
                className="ml-1"
              />
            </button>
            <div
              className={`transition-all duration-1000 ease-in-out ${
                dropdownOpen.servicios
                  ? "max-h-screen"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              {dropdownOpen.servicios && (
                <div className="text-center">
                  <a
                    href="/servicios#digitales"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Servicios Digitales
                  </a>
                  <a
                    href="/servicios#presenciales"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Servicios Presenciales
                  </a>
                  <a
                    href="/servicios#especiales"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Servicos Especiales
                  </a>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSehbsIU0_ZyR09Nq-EiYbJu_0ARjh1QMhIuToV-fYlKftn3Zw/viewform"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Prestamo Interbibliotecario SIES+
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* Dropdown "Nosotros" en móvil */}
          <div className="relative">
            <button
              onClick={() =>
                setDropdownOpen({
                  ...dropdownOpen,
                  nosotros: !dropdownOpen.nosotros,
                })
              }
              className="block py-2 px-4 text-white focus:outline-none"
            >
              Nosotros
              <FontAwesomeIcon
                icon={dropdownOpen.nosotros ? faAngleUp : faAngleDown}
                className="ml-1"
              />
            </button>
            <div
              className={`transition-all duration-1000 ease-in-out ${
                dropdownOpen.nosotros
                  ? "max-h-screen"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              {dropdownOpen.nosotros && (
                <div className="text-center">
                  <a
                    href="/info#historia"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Historia
                  </a>
                  <a
                    href="/info#mision-vision"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Misión y Visión
                  </a>
                  <a
                    href="/bio"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Biografía
                  </a>
                  <a
                    href="/politicas"
                    className="block py-2 px-4 text-white hover:bg-gray-300"
                  >
                    Políticas de Calidad
                  </a>
                </div>
              )}
            </div>
          </div>
          <a href="/#documentos" className="block py-2 px-4 text-white">
            Documentos
          </a>
          <a href="/pazysalvo" className="block py-2 px-4 text-white">
            Paz y Salvo
          </a>
        </div>
      )}
    </nav>
  );
}
