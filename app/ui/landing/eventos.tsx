import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Eventos } from "@/app/lib/definitions";
import {
  faCalendar,
  faClock,
  faMapPin,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

const EventosList = ({ eventos }: { eventos: Eventos[] }) => {
  const isToday = (dateStr: string) => {
    const today = new Date();
    const eventDate = new Date(dateStr + "T00:00:00");
    return today.toDateString() === eventDate.toDateString();
  };

  const isBefore = (dateStr: string, timeStr: string) => {
    const now = new Date();
    const eventDateTime = new Date(dateStr + "T" + timeStr);
    return eventDateTime < now;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const filteredEventos = eventos.filter(
    (evento) => !isBefore(evento.fecha, evento.hora) || isToday(evento.fecha)
  );

  const getEventoClass = (fecha: string) => {
    return isToday(fecha)
      ? "bg-blue-100 border-blue-500"
      : "bg-white border-gray-200";
  };

  return (
    <div className="space-y-4 h-auto">
      {filteredEventos.map((evento) => (
        <div
          key={evento.id}
          className={`p-4 rounded-lg border h-auto ${getEventoClass(
            evento.fecha
          )} 
                     shadow-sm transition-all hover:shadow-md`}
        >
          <h3 className="text-xl font-semibold text-gray-800">
            {evento.titulo}
          </h3>

          <div className="mt-2 space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
              <span>{formatDate(evento.fecha)}</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
              <span>{evento.hora}</span>
            </div>

            {evento.lugar && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
                <span>{evento.lugar.nombre}</span>
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-3">
            {evento.enlace_facebook && (
              <a
                href={evento.enlace_facebook}
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              </a>
            )}
            {evento.enlace_youtube && (
              <a
                href={evento.enlace_youtube}
                className="text-secondaries_red-700 hover:text-secondaries_red-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
              </a>
            )}
            {evento.enlace_google_meet && (
              <a
                href={evento.enlace_google_meet}
                className="text-green-600 hover:text-green-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faVideo} className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

import { fetchEventos } from "@/app/lib/data";

const EventosComponent = async () => {
  const eventos = await fetchEventos();
  return <EventosList eventos={eventos} />;
};

export default EventosComponent;
