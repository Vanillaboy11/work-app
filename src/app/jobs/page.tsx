'use client';

import { useState } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  description: string;
}

const jobsData: Job[] = [
  {
    id: 1,
    title: "Desarrollador Frontend React",
    company: "TechCo",
    location: "Remoto - México",
    type: "Tiempo Completo",
    posted: "Hace 2 días",
    description: "Buscamos un desarrollador con experiencia en React, Tailwind y Next.js para proyectos innovadores.",
  },
  {
    id: 2,
    title: "Diseñador UX/UI",
    company: "DesignHub",
    location: "CDMX, México",
    type: "Híbrido",
    posted: "Hace 4 días",
    description: "Responsable de crear experiencias digitales centradas en el usuario para nuestros productos web y móviles.",
  },
  {
    id: 3,
    title: "Data Analyst Jr",
    company: "DataWorks",
    location: "Remoto - Latinoamérica",
    type: "Medio Tiempo",
    posted: "Hace 1 semana",
    description: "Apoya al equipo de análisis con reportes, visualización y limpieza de datos en Python o SQL.",
  },
  {
    id: 4,
    title: "Ingeniero de Software Backend",
    company: "CloudSystems",
    location: "Guadalajara, MX",
    type: "Tiempo Completo",
    posted: "Hace 3 días",
    description: "Desarrollo de APIs escalables con Node.js y PostgreSQL en entornos cloud (AWS).",
  },
  {
    id: 5,
    title: "Marketing Digital Intern",
    company: "GrowthWave",
    location: "Monterrey, MX",
    type: "Prácticas",
    posted: "Hoy",
    description: "Apoya en campañas de redes sociales, SEO y analítica web. Ideal para estudiantes de marketing o comunicación.",
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Empleos Disponibles
        </h1>

        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Buscar por puesto, empresa o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Listado de empleos */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      📍 {job.location}
                    </span>
                    <span className="flex items-center">
                      💼 {job.type}
                    </span>
                    <span className="flex items-center">
                      ⏰ {job.posted}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Ver detalles del empleo: ${job.title}`)}
                  className="mt-4 sm:mt-0 sm:ml-6 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-500 transition-colors"
                >
                  Ver Detalles
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No se encontraron empleos que coincidan con tu búsqueda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
