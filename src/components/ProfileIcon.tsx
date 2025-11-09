'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ProfileIcon = () => {
  const router = useRouter();

  return (
    <div className="relative group">
      <button 
        onClick={() => router.push('/profile')}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
      >
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
      
      <div className="hidden group-hover:block absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-50">
        <a
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
        >
          Mi Perfil
        </a>
        <a
          href="/settings"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
        >
          Configuración
        </a>
        <button
          onClick={() => {
            // Implement logout functionality
            console.log('Logging out...');
          }}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileIcon;