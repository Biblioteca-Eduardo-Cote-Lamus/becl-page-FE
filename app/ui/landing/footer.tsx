"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music,
} from "lucide-react";
import AcmeLogo from "../becl-logo";

export default function Footer() {
  return (
    <footer className="bg-secondaries_red-900 p-3 text-white">
      <div className="flex flex-col justify-around my-5 md:flex-row md:justify-items-center">
        <AcmeLogo/>
        <div className="text-center md:text-left">
          <p>Av. Gran Colombia # 12E-96 Barrio Colsag.</p>
          <p>San José de Cúcuta, Colombia.</p>
          <p>(60) (7) 5776655</p>
          <p>Ext. 133-136-252-295</p>
          <a
            className="hover:text-black"
            href="mailto:biblioteca@ufps.edu.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            biblioteca@ufps.edu.co
          </a>
        </div>
        <div className="flex flex-col items-center md:items-start mt-5 md:mt-0">
          <p className="font-bold text-2xl mb-3">Navega</p>
          <a className="hover:text-gray-300 transition-colors duration-200" href="#">
            Inicio
          </a>
          <a className="hover:text-gray-300 transition-colors duration-200" href="/info">
            Nosotros
          </a>
          <a className="hover:text-gray-300 transition-colors duration-200" href="/servicios">
            Servicios
          </a>
          <a className="hover:text-gray-300 transition-colors duration-200" href="#">
            Eventos
          </a>
        </div>
        <div className="flex flex-col items-center md:items-start mt-5 md:mt-0">
          <p className="font-bold text-2xl mb-3">Convenios</p>
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-black"
            href="https://docs.google.com/forms/d/e/1FAIpQLSehbsIU0_ZyR09Nq-EiYbJu_0ARjh1QMhIuToV-fYlKftn3Zw/viewform"
          >
            SIES+
          </a>
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-black"
            href="https://www.banrepcultural.org/bogota/biblioteca-luis-angel-arango"
          >
            Biblioteca Luis Angel Arango
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around border-t border-white pt-3 mt-5 md:mt-0">
        <p className="text-center text-white mb-3 md:mb-0">
          Copyright © Todos los derechos reservados Términos del Servicio UFPS
        </p>
        <div className="flex justify-center md:justify-start">
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-gray-300 transition-colors duration-200"
            href="https://www.facebook.com/biblioteca.ufps"
            title="Facebook"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-gray-300 transition-colors duration-200"
            href="https://www.instagram.com/biblioteca.ufps/"
            title="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-gray-300 transition-colors duration-200"
            href="https://twitter.com/biblioteca_ufps"
            title="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-gray-300 transition-colors duration-200"
            href="https://www.youtube.com/@biblioteca.ufps"
            title="YouTube"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            target="_blank"
            rel="noopener"
            className="hover:text-gray-300 transition-colors duration-200"
            href="https://open.spotify.com/show/0QZqXqXqXqXqXqXqXqXqXq"
            title="TikTok"
          >
            <Music className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
