import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchImagenesCarrusel } from "../../lib/data"; // Ajusta la ruta según tu estructura
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

// Componente para la flecha izquierda
const PrevArrow = (props: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} next-arrow`} // Puedes agregar estilos personalizados aquí
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }} // Personaliza la posición
      onClick={onClick}
    ></div>
  );
};

// Componente para la flecha derecha
const NextArrow = (props: {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} next-arrow`} // Puedes agregar estilos personalizados aquí
      style={{ ...style, display: "block", right: "10px", zIndex: 1 }} // Personaliza la posición
      onClick={onClick}
    ></div>
  );
};

const CarruselImagenes: React.FC = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);

  useEffect(() => {
    fetchImagenesCarrusel()
      .then((data) => setImagenes(data))
      .catch((error) => console.error(error));
  }, []);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />, // Flecha izquierda personalizada
    nextArrow: <NextArrow />, // Flecha derecha personalizada
  };

  return (
    <div className="flex flex-col pt-5">
      <div className="bg-white rounded-lg shadow-lg h-auto">
        <Slider {...settings}>
          {imagenes.map((imagen) => (
            <div
              key={imagen.id}
              className="flex items-center justify-center h-full min-h-[200px]" // Centrado vertical y horizontal
            >
              {imagen.enlace ? (
                <a
                  href={imagen.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${imagen.descripcion}`}
                >
                  <Image
                    src={imagen.imagen}
                    alt={`Imagen ${imagen.id}`}
                    layout="responsive"
                    width={500}
                    height={200}
                    objectFit="cover"
                    className="rounded"
                  />
                </a>
              ) : (
                <Image
                  src={imagen.imagen}
                  alt={`Imagen ${imagen.id}`}
                  layout="responsive"
                  width={500}
                  height={200}
                  objectFit="cover"
                  className="rounded"
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarruselImagenes;
