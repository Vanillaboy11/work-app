import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="md:py-16 md:px-12 px-4 py-8">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Encuentra tu primer <br /> empleo o práctica profesional
          </h1>
          <p className="text-xl text-gray-600">
            Conecta con empresas que buscan talento joven
          </p>
          <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
            Buscar empleos
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          {/* Replace with your actual image/SVG component */}
          <div className="w-full max-w-md h-72">
                       </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 leading-snug">
          Encuentra tu primer <br /> empleo o práctica profesional.
        </h1>
        <p className="text-lg text-gray-600">
          Conecta con empresas que buscan talento joven
        </p>
        <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300 w-full">
          Buscar empleos
        </button>
        {/* Mobile image placement */}
        <div className="flex justify-center pt-8">
            <div className="w-full max-w-xs h-40">
                            </div>
        </div>
        <button className="text-blue-600 font-semibold pt-4">
             Ver más empleos
        </button>
      </div>
    </section>
  );
};

export default Hero;