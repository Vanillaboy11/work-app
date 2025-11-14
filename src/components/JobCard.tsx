'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '@prisma/client';

interface JobCardProps {
  job: Job & {
    createdBy: {
      name: string;
    };
    hasApplied?: boolean;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg p-6 m-4 transition-transform hover:scale-105 cursor-pointer relative"
    >
      {job.hasApplied && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Aplicado
          </span>
        </div>
      )}
      <div className="flex justify-between items-start">
        <div className="pr-20">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{job.company}</p>
        </div>
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${job.type === 'FULL_TIME' ? 'bg-blue-100 text-blue-800' : 
            job.type === 'REMOTE' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100 text-gray-800'}
        `}>
          {job.type === 'FULL_TIME' ? 'Tiempo Completo' : 
           job.type === 'REMOTE' ? 'Remoto' : 
           job.type === 'PART_TIME' ? 'Medio Tiempo' : 
           job.type === 'INTERNSHIP' ? 'Práctica' : 
           'Contrato'}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>

        {job.salary && (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${job.salary.toLocaleString('es-MX')} MXN/mes
          </div>
        )}

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {job.createdBy.name}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {job.description}
        </p>

        <button className={`w-full py-2 px-4 rounded-md transition-colors font-medium ${
          job.hasApplied 
            ? 'bg-green-100 text-green-800 border border-green-300 cursor-default'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}>
          {job.hasApplied ? '✓ Ya aplicaste' : 'Ver Detalles'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;