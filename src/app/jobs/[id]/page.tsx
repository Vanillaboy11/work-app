'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Job } from '@prisma/client';

interface JobWithCreator extends Job {
  createdBy: {
    name: string;
    email: string;
  };
  hasApplied?: boolean;
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { id } = use(params);
  const [job, setJob] = useState<JobWithCreator | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, status, router]);

  const handleApply = async () => {
    setApplying(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId: id }),
      });

      if (response.ok) {
        alert('¡Aplicación enviada exitosamente!');
        // Refresh the job data to update hasApplied status
        const jobResponse = await fetch(`/api/jobs/${id}`);
        if (jobResponse.ok) {
          const updatedJob = await jobResponse.json();
          setJob(updatedJob);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error al enviar la aplicación');
      }
    } catch (error) {
      console.error('Error applying:', error);
      alert('Error al enviar la aplicación');
    } finally {
      setApplying(false);
    }
  };

  // Show loading while checking auth or fetching job
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status !== 'authenticated') {
    return null;
  }

  if (!job) {
    return null;
  }

  const formatSalary = () => {
    if (!job.salary) return 'No especificado';
    const salaryMax = (job as any).salaryMax;
    if (salaryMax) {
      return `$${job.salary.toLocaleString()} - $${salaryMax.toLocaleString()} MXN`;
    }
    return `$${job.salary.toLocaleString()} MXN`;
  };

  const getWorkModeLabel = (mode: string) => {
    const labels: { [key: string]: string } = {
      REMOTE: 'Remoto',
      ON_SITE: 'Presencial',
      HYBRID: 'Híbrido',
    };
    return labels[mode] || mode;
  };

  const getContractTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      FULL_TIME: 'Tiempo Completo',
      PART_TIME: 'Medio Tiempo',
      CONTRACT: 'Contrato',
      INTERNSHIP: 'Prácticas',
      TEMPORARY: 'Temporal',
      FREELANCE: 'Freelance',
    };
    return labels[type] || type;
  };

  const getJobTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      FULL_TIME: 'Tiempo Completo',
      PART_TIME: 'Medio Tiempo',
      CONTRACT: 'Contrato',
      INTERNSHIP: 'Prácticas',
      REMOTE: 'Remoto',
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600">{job.company}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              job.type === 'FULL_TIME' ? 'bg-blue-100 text-blue-800' :
              job.type === 'REMOTE' ? 'bg-green-100 text-green-800' :
              job.type === 'INTERNSHIP' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {getJobTypeLabel(job.type)}
            </span>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Ubicación</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Salario</p>
                <p className="font-medium">{formatSalary()}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Modalidad</p>
                <p className="font-medium">{getWorkModeLabel((job as any).workMode || 'ON_SITE')}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Tipo de Contrato</p>
                <p className="font-medium">{getContractTypeLabel((job as any).contractType || job.type)}</p>
              </div>
            </div>

            {(job as any).schedule && (
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Horario</p>
                  <p className="font-medium">{(job as any).schedule}</p>
                </div>
              </div>
            )}

            {(job as any).experienceLevel && (
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Nivel de Experiencia</p>
                  <p className="font-medium">{(job as any).experienceLevel}</p>
                </div>
              </div>
            )}

            {(job as any).department && (
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Departamento</p>
                  <p className="font-medium">{(job as any).department}</p>
                </div>
              </div>
            )}

            {(job as any).applicationDeadline && (
              <div className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500">Fecha Límite</p>
                  <p className="font-medium">{new Date((job as any).applicationDeadline).toLocaleDateString('es-MX')}</p>
                </div>
              </div>
            )}
          </div>

          {/* Apply Button */}
          {job.hasApplied ? (
            <div className="w-full py-3 px-6 rounded-lg font-semibold bg-green-100 text-green-800 border-2 border-green-300 text-center flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ya aplicaste a esta posición
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying || !(job as any).isActive}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                (job as any).isActive !== false
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {applying ? 'Aplicando...' : (job as any).isActive !== false ? 'Aplicar a esta posición' : 'Posición cerrada'}
            </button>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Puesto</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* Requirements */}
        {(job as any).requirements && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {(job as any).requirements}
            </div>
          </div>
        )}

        {/* Benefits */}
        {(job as any).benefits && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {(job as any).benefits}
            </div>
          </div>
        )}

        {/* Company Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca de la Empresa</h2>
          <div className="flex items-center text-gray-700">
            <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div>
              <p className="font-semibold text-lg">{job.company}</p>
              <p className="text-sm text-gray-500">Publicado por: {job.createdBy.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}