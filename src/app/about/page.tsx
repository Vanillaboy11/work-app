'use client';

import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Conectando el Talento Universitario con Oportunidades Laborales
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              En UniEmpleos, nos dedicamos a crear puentes entre estudiantes universitarios, recién egresados y empresas que buscan talento joven y apasionado.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nuestra Misión
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Facilitar la transición de la universidad al mundo laboral, proporcionando una plataforma que conecta de manera efectiva a estudiantes y recién egresados con empresas que valoran el talento emergente.
              </p>
              <p className="text-lg text-gray-600">
                Creemos en el potencial de cada estudiante y en la importancia de encontrar la oportunidad laboral adecuada para comenzar una carrera exitosa.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Oportunidades Laborales</h3>
                    <p className="mt-2 text-gray-600">Acceso a ofertas de trabajo exclusivas para estudiantes y recién egresados.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Conexiones Directas</h3>
                    <p className="mt-2 text-gray-600">Facilitamos el contacto directo entre empresas y candidatos.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Crecimiento Profesional</h3>
                    <p className="mt-2 text-gray-600">Apoyo en el desarrollo de tu carrera profesional desde el inicio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Estudiantes Conectados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Empresas Asociadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
              <div className="text-gray-600">Empleos Publicados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              ¿Listo para comenzar tu carrera profesional?
            </h2>
            <div className="space-x-4">
              <button 
                onClick={() => window.location.href = '/register'}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Regístrate Ahora
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition duration-300"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;