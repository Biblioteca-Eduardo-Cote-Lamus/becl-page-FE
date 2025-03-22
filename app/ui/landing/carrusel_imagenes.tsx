"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getImagenesCarrusel } from "@/app/actions/imagenes";
import { ImagenCarrusel } from "@/app/lib/definitions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarruselImagenes = () => {
  const [imagenes, setImagenes] = useState<ImagenCarrusel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImagenesCarrusel();
        setImagenes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching imágenes:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] md:min-h-[400px] lg:min-h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondaries_red-900"></div>
      </div>
    );
  }

  if (imagenes.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-0 animate-fade-in">
      <style jsx global>{`
        .carousel .control-arrow {
          background-color: rgba(0, 0, 0, 0.3) !important;
          height: 40px !important;
          width: 40px !important;
          border-radius: 20px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          margin: 0 10px !important;
          transition: all 0.3s ease !important;
        }
        .carousel .control-arrow:hover {
          background-color: rgba(0, 0, 0, 0.5) !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        @media (min-width: 768px) {
          .carousel .control-arrow {
            height: 50px !important;
            width: 50px !important;
            border-radius: 25px !important;
            margin: 0 20px !important;
          }
        }
        .carousel .control-prev.control-arrow:before {
          border-right: 8px solid #fff !important;
          transition: all 0.3s ease !important;
        }
        .carousel .control-next.control-arrow:before {
          border-left: 8px solid #fff !important;
          transition: all 0.3s ease !important;
        }
        .carousel .control-dots {
          margin: 10px 0 !important;
          bottom: 20px !important;
        }
        .carousel .control-dots .dot {
          background: #fff !important;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5) !important;
          transition: all 0.3s ease !important;
        }
        .carousel .control-dots .dot.selected {
          transform: scale(1.2) !important;
        }
        .carousel .slide {
          transition: opacity 0.5s ease-in-out !important;
        }
      `}</style>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        onChange={setCurrentSlide}
        selectedItem={currentSlide}
        className="rounded-lg overflow-hidden shadow-xl"
      >
        {imagenes.map((imagen, index) => (
          <div 
            key={imagen.id} 
            className="relative h-[200px] sm:h-[300px] md:h-[500px] lg:h-[600px] transition-smooth"
          >
            <Image
              src={`/Imagenes_biblioteca/carrusel/${imagen.imagen}`}
              alt={imagen.descripcion}
              fill
              className="object-contain md:object-cover transition-smooth"
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
              quality={90}
            />
            {imagen.enlace && (
              <a
                href={imagen.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out group"
              >
                <span className="text-white text-lg md:text-xl lg:text-2xl font-semibold text-center px-4 py-2 bg-black bg-opacity-50 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {imagen.descripcion}
                </span>
              </a>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarruselImagenes;
