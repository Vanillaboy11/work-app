'use client';

import React, { useState, useEffect } from 'react';

const featuredJobs = [
  {
    title: "Desarrollador Frontend Jr",
    company: "TechCo",
    type: "Tiempo Completo",
  },
  {
    title: "Diseñador UX/UI",
    company: "DesignHub",
    type: "Remoto",
  },
  {
    title: "Ingeniero Industrial",
    company: "ManufacturaPlus",
    type: "Prácticas",
  },
  {
    title: "Analista de Datos",
    company: "DataInsights",
    type: "Medio Tiempo",
  },
  {
    title: "Desarrollador Mobile",
    company: "AppWorks",
    type: "Proyecto",
  }
];

const FeaturedJobsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredJobs.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Cambiar cada 4 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-[200px]">
      <div 
        className="transition-transform duration-500 ease-in-out"
        style={{ 
          transform: `translateY(-${currentIndex * 66.67}px)`,
        }}
      >
        {featuredJobs.map((job, index) => (
          <div 
            key={index}
            className={`p-4 space-y-2 transition-opacity duration-500
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-300">
              <span>{job.company}</span>
              <span className="px-2 py-1 rounded-full bg-blue-400/20 text-blue-200">
                {job.type}
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-blue-300">
              <span>Ver detalles</span>
              <svg 
                className="ml-2 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicadores */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {featuredJobs.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 
              ${index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobsCarousel;