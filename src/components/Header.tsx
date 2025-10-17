import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 md:py-6 md:px-12 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">StuWork</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar empleo o empresa"
            className="border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <button className="text-gray-700 hover:text-blue-600">
          Iniciar sesión
        </button>
        <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300">
          Registrarse
        </button>
      </div>

      {/* Mobile Navigation (shows only 'Iniciar sesión' and Logo) */}
      <div className="md:hidden flex items-center space-x-4">
         <button className="text-gray-700 text-sm">
            Iniciar sesion
         </button>
      </div>
    </header>
  );
};

export default Header;