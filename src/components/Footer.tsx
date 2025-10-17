import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="md:py-12 md:px-12 px-4 py-8 border-t border-gray-100 mt-12 max-w-6xl mx-auto">
      {/* User Card (Desktop Only) */}
      <div className="hidden md:flex items-center justify-between pb-8">
        <div className="flex items-center space-x-3">
          {/* Profile Picture Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                       </div>
          <div>
            <p className="font-semibold text-gray-800">Juan Estrada</p>
            <p className="text-sm text-gray-500">Estudiante de Ing. Industrial</p>
          </div>
        </div>

        {/* Footer Links (Desktop) */}
        <div className="flex space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">Sobre nosotros</a>
          <a href="#" className="hover:text-blue-600">Contacto</a>
          <a href="#" className="hover:text-blue-600">Política de privacidad</a>
        </div>
      </div>

      {/* Mobile-Friendly Placeholder (Simple text or a separate mobile footer component) */}
      <div className="md:hidden text-center text-sm text-gray-500 pt-4">
         © 2024 StuWork
      </div>
    </footer>
  );
};

export default Footer;