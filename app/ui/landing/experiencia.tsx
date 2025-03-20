import React, { Suspense } from "react";
import { openSans } from "../fonts";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ImagenSkeleton } from "../skeletons";
import { getExperiencia } from "@/app/actions/experiencia";

async function ExperienciaContent() {
  const experiencias = await getExperiencia();
  const experiencia = experiencias[0]; // Get the first experience

  if (!experiencia) {
    return null;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-center gap-8 max-w-6xl mx-auto p-4">
      <div className="flex-1">
        <h2
          className={`mb-4 text-3xl md:text-4xl text-center md:text-left text-secondaries_red-900 ${openSans.className}`}
        >
          ¡Califica tu experiencia usando los servicios!
        </h2>
        <p className="text-lg text-center md:text-left text-gray-700">
          Escanea el código QR y califica la experiencia que has tenido usando
          los servicios que ofrecemos a la comunidad estudiantil de nuestra alma
          mater. <br />
          También puedes ingresar a la encuesta de satisfacción usando el botón.
        </p>
        <a
          href={experiencia.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-8 flex items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
        >
          Calificar
          <ArrowRight className="ml-2" />
        </a>
      </div>
      
      {experiencia.imagen_qr && (
        <Image 
          width={450} 
          height={450} 
          alt="Código QR para calificar experiencia" 
          src={`/Imagenes_biblioteca/${experiencia.imagen_qr}`}
          className="rounded-lg shadow-lg"
          priority
        />
      )}
    </div>
  );
}

export default function Experiencia() {
  return (
    <Suspense fallback={<ImagenSkeleton />}>
      <ExperienciaContent />
    </Suspense>
  );
}
