import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchImagenesCarrusel } from "../../lib/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Imagen {
  id: number;
  imagen: string;
  enlace?: string;
  descripcion?: string;
  visible: boolean;
}

const PrevArrow = (props: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} !absolute !left-4 z-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group md:flex`}
      onClick={onClick}
      aria-label="Anterior"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 group-hover:text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

const NextArrow = (props: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} !absolute !right-4 z-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group md:flex`}
      onClick={onClick}
      aria-label="Siguiente"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 group-hover:text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

const CarruselImagenes: React.FC = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const data = await fetchImagenesCarrusel();
        setImagenes(data);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarImagenes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div className="!bottom-4">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-200" />
    ),
  };

  if (loading) {
    return (
      <div className="w-full aspect-[16/9] bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-xl bg-gray-100">
        <Slider {...settings} className="h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full">
          {imagenes.map((imagen) => (
            <div key={imagen.id} className="relative h-full w-full">
              {imagen.enlace ? (
                <a
                  href={imagen.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                  title={imagen.descripcion || `Imagen ${imagen.id}`}
                >
                  <div className="relative h-full w-full group">
                    <Image
                      src={imagen.imagen}
                      alt={imagen.descripcion || `Imagen ${imagen.id}`}
                      layout="fill"
                      objectFit="cover"
                      priority
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    {imagen.descripcion && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <p className="text-sm md:text-base line-clamp-2">
                          {imagen.descripcion}
                        </p>
                      </div>
                    )}
                  </div>
                </a>
              ) : (
                <div className="relative h-full w-full group">
                  <Image
                    src={imagen.imagen}
                    alt={imagen.descripcion || `Imagen ${imagen.id}`}
                    layout="fill"
                    objectFit="cover"
                    priority
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  {imagen.descripcion && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-sm md:text-base line-clamp-2">
                        {imagen.descripcion}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarruselImagenes;