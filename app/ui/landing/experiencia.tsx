import React, { Suspense, useEffect, useState } from "react";
import { openSans } from "../fonts";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ImagenSkeleton } from "../skeletons";
import { fetchExperiencia } from "../../lib/data";

interface ImagenExp {
  id: string;
  imagenQr: string;
  enlace: string;
}
const Experiencia: React.FC = () => {
  const [imagen, setImagenExp] = useState<ImagenExp | null>(null);

  useEffect(() => {
    const getImagenExp = async () => {
      try {
        const data = await fetchExperiencia();
        if (data.length > 0) {
          setImagenExp(data[0]);
          console.log(imagen?.imagenQr);
        }
      } catch (error) {
        console.error("Error fetching imagen:", error);
      }
    };

    getImagenExp();
  }, [imagen?.imagenQr]);

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-center">
      <div>
        <h2
          className={`mb-4 text-3xl md:text-4xl text-center md:text-left text-secondaries_red-900 ${openSans.className}`}
        >
          ¡Califica tu experiencia usando los servicios!
        </h2>
        <p className="text-lg text-center md:text-left">
          Escanea el código QR y califica la experiencia que has tenido usando
          los servicios que ofrecemos a la comunidad estudiantil de nuestra alma
          mater. <br />
          También puedes ingresar a la encuesta de satisfacción usando el botón.
        </p>
        <button
          className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-8 flex justify-self-center items-center hover:bg-secondaries_red-700 hover:scale-105 transition duration-300"
          type="button"
          onClick={() => imagen && window.open(imagen.enlace, "_blank")}
        >
          Calificar
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
      <Suspense fallback={<ImagenSkeleton />}>
        {imagen && (
          <Image width={450} height={450} alt={"QR"} src={imagen.imagenQr} />
        )}
      </Suspense>
    </div>
  );
};

export default Experiencia;
