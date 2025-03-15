"use client";

import React, { useEffect, useState } from 'react';
import { getMisionVision } from '@/app/actions/mision-vision';
import type { InfoMisionVision } from '@/app/lib/definitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faBullseye } from '@fortawesome/free-solid-svg-icons';

const MisionVisionComponent = () => {
  const [data, setData] = useState<InfoMisionVision[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMisionVision();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching misión y visión:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondaries_red-900"></div>
      </div>
    );
  }

  const mision = data.find(item => item.id === 1);
  const vision = data.find(item => item.id === 2);

  return (
    <div className="w-full py-16 bg-white" id="mision-vision">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Misión */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-secondaries_red-900 rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faBullseye} className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-secondaries_red-900">
                {mision?.nombre || 'Misión'}
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {mision?.descripcion || 'Información no disponible'}
            </p>
          </div>

          {/* Visión */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-secondaries_red-900 rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faLightbulb} className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-secondaries_red-900">
                {vision?.nombre || 'Visión'}
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {vision?.descripcion || 'Información no disponible'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionVisionComponent;
