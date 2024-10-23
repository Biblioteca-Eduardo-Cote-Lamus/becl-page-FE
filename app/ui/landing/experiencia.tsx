import React, { useEffect, useState } from "react";
import { openSans } from "../fonts";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export async function fetchExperiencia() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/experiencia`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "", // Asegúrate de que la API key no sea undefined
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch imagens data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch imagens data.");
  }
}

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
          className="bg-secondaries_red-800 text-white rounded py-4 px-6 md:py-3 mt-8 flex justify-self-center items-center"
          type="button"
          onClick={() => imagen && window.open(imagen.enlace, "_blank")}
        >
          Calificar
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
      <Image
        src={imagen?.imagenQr || ""}
        alt="QR experiencia"
        width={550}
        height={550}
      />
    </div>
  );
};

export default Experiencia;
