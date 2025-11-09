'use client';

import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="flex items-center space-x-6">
      <Link 
        href="/"
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        Inicio
      </Link>
      <Link 
        href="/jobs"
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        Trabajos
      </Link>
      <Link 
        href="/companies"
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        Empresas
      </Link>
      <Link 
        href="/about"
        className="text-gray-700 hover:text-blue-600 font-medium"
      >
        Nosotros
      </Link>
    </nav>
  );
};

export default Navigation;