'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImagenCarrusel, getImagenesCarrusel } from '@/app/actions/imagenes';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarruselImagenes = () => {
  const [imagenes, setImagenes] = useState<ImagenCarrusel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImagenesCarrusel();
        setImagenes(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching imágenes:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondaries_red-900"></div>
      </div>
    );
  }

  if (imagenes.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <style jsx global>{`
        .carousel .control-arrow {
          background-color: rgba(0, 0, 0, 0.3) !important;
          height: 50px !important;
          width: 50px !important;
          border-radius: 25px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          margin: 0 20px !important;
        }
        .carousel .control-prev.control-arrow:before {
          border-right: 8px solid #fff !important;
        }
        .carousel .control-next.control-arrow:before {
          border-left: 8px solid #fff !important;
        }
        .carousel .control-dots {
          margin: 10px 0 !important;
        }
        .carousel .control-dots .dot {
          background: #fff !important;
          box-shadow: 0 0 5px rgba(0,0,0,0.5) !important;
        }
      `}</style>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={500}
        className="w-full"
        stopOnHover={true}
        dynamicHeight={false}
        emulateTouch={true}
      >
        {imagenes.map((imagen) => (
          <div key={imagen.id} className="relative h-[600px]">
            <Image
              src={imagen.url}
              alt={imagen.titulo || 'Imagen carrusel'}
              fill
              className="object-cover"
              priority={true}
              sizes="100vw"
            />
            {(imagen.titulo || imagen.descripcion) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transition-opacity duration-300">
                {imagen.titulo && (
                  <h2 className="text-2xl font-bold mb-2">{imagen.titulo}</h2>
                )}
                {imagen.descripcion && (
                  <p className="text-lg">{imagen.descripcion}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarruselImagenes;