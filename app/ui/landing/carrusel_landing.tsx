"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getCarruselLanding } from "@/app/actions/carrusel_landing";
import { ImagenLanding } from "@/app/lib/definitions";

// Imagen estática para la carga inicial
const STATIC_IMAGE = "/Imagenes_biblioteca/carrusel_landing/default.webp";

const CarruselLanding = () => {
  const [imagenes, setImagenes] = useState<ImagenLanding[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showStaticImage, setShowStaticImage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const staticImageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cargar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCarruselLanding();
        setImagenes(data);
        
        // Configurar el temporizador para ocultar la imagen estática después de 10 segundos
        if (data.length > 0) {
          // Limpiar cualquier temporizador existente
          if (staticImageTimerRef.current) {
            clearTimeout(staticImageTimerRef.current);
          }
          
          // Iniciar el temporizador para ocultar la imagen estática después de 10 segundos
          staticImageTimerRef.current = setTimeout(() => {
            // Aplicar efecto de desvanecimiento a la imagen estática
            const staticImageElement = document.getElementById('static-image');
            if (staticImageElement) {
              staticImageElement.classList.remove('fade-in');
              staticImageElement.classList.add('fade-out');
              
              // Ocultar la imagen estática después de que termine la transición
              fadeTimerRef.current = setTimeout(() => {
                setShowStaticImage(false);
                
                // Iniciar el carrusel dinámico después de ocultar la imagen estática
                if (carouselIntervalRef.current) {
                  clearInterval(carouselIntervalRef.current);
                }
                
                carouselIntervalRef.current = setInterval(() => {
                  setCurrentSlide((prev) => (prev + 1) % data.length);
                }, 10000);
              }, 800); // Duración de la transición
            }
          }, 10000); // 10 segundos exactos
        }
      } catch (error) {
        console.error("Error fetching imágenes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // Limpiar los temporizadores al desmontar el componente
    return () => {
      if (staticImageTimerRef.current) {
        clearTimeout(staticImageTimerRef.current);
      }
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <style jsx global>{`
        .fade-transition {
          transition: opacity 0.8s ease-in-out;
        }
        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }
      `}</style>
      <div className="relative w-full h-full">
        {/* Imagen estática que se muestra inmediatamente */}
        {showStaticImage && (
          <div id="static-image" className="absolute inset-0 z-10 fade-transition fade-in">
            <Image
              src={STATIC_IMAGE}
              alt="Imagen de bienvenida"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={85}
            />
          </div>
        )}
        
        {/* Carrusel dinámico */}
        {!isLoading && imagenes.map((imagen, index) => (
          <div 
            key={imagen.id} 
            className={`absolute inset-0 fade-transition ${
              index === currentSlide ? 'fade-in z-0' : 'fade-out z-0'
            }`}
          >
            <Image
              src={`/Imagenes_biblioteca/carrusel_landing/${imagen.imagen}`}
              alt={imagen.imagen}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={85}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarruselLanding;
