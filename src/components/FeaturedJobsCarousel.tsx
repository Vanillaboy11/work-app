'use client';

import React, { useState, useEffect } from 'react';

const featuredJobs = [
  {
    title: "Desarrollador Frontend Jr",
    company: "TechCo",
    type: "Tiempo Completo",
    location: "Ciudad de México, MX",
    salary: "$15,000 - $20,000 MXN / mes",
    date: "Publicado hace 2 días",
  },
  {
    title: "Diseñador UX/UI",
    company: "DesignHub",
    type: "Remoto",
    location: "Trabajo desde casa",
    salary: "$12,000 - $18,000 MXN / mes",
    date: "Publicado hace 1 día",
  },
  {
    title: "Ingeniero Industrial",
    company: "ManufacturaPlus",
    type: "Prácticas",
    location: "Guadalajara, MX",
    salary: "$8,000 MXN / mes",
    date: "Publicado hace 5 días",
  },
  {
    title: "Analista de Datos",
    company: "DataInsights",
    type: "Medio Tiempo",
    location: "Monterrey, MX",
    salary: "$14,000 - $17,000 MXN / mes",
    date: "Publicado hace 3 días",
  },
  {
    title: "Desarrollador Mobile",
    company: "AppWorks",
    type: "Proyecto",
    location: "Remoto / Híbrido",
    salary: "$25,000 MXN / proyecto",
    date: "Publicado hace 7 días",
  }
];

const FeaturedJobsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === featuredJobs.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-[230px]">
      {/* Contenedor que se mueve verticalmente */}
      <div
        className="transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateY(-${currentIndex * 230}px)`,
        }}
      >
        {featuredJobs.map((job, index) => (
          <div
            key={index}
            className={`h-[230px] flex flex-col justify-center space-y-2 px-6 py-4 transition-opacity duration-500
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-300">
              <span>{job.company}</span>
              <span className="px-2 py-1 rounded-full bg-blue-400/20 text-blue-200">
                {job.type}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-blue-300">
              <span>{job.date}</span>
              <button className="flex items-center hover:text-blue-200 transition">
                Ver detalles
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
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores inferiores */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {featuredJobs.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${index === currentIndex ? 'bg-blue-400 scale-110' : 'bg-gray-600'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobsCarousel;
