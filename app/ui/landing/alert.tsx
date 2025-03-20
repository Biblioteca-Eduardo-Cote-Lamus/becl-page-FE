import React from 'react';
import { Noticias } from '@/app/lib/definitions';
import Image from 'next/image';

interface AlertProps {
  noticia: Noticias;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ noticia, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{noticia.titular}</h2>
        <p>{noticia.descripcion}</p>
        {noticia.imagen && (
          <Image src={noticia.imagen} alt={noticia.titular} className="mt-4 w-full h-auto rounded" layout="responsive" width={700} height={475} />
        )}
      </div>
    </div>
  );
};

export default Alert;