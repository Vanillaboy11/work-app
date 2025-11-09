'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import ProfileIcon from './ProfileIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                uniempleos
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <Navigation />
            </div>
          </div>

          {/* Search Bar - centered */}
          <div className="flex-1 flex justify-center px-4 lg:px-6">
            <div className="w-full max-w-lg">
              <SearchBar />
            </div>
          </div>

          {/* Profile Icon */}
          <div className="ml-4 flex items-center">
            <ProfileIcon />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
            Inicio
          </a>
          <a href="/jobs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
            Trabajos
          </a>
          <a href="/companies" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
            Empresas
          </a>
          <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
            Nosotros
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;