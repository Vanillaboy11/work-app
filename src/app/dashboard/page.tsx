'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import JobCard from '@/components/JobCard';
import CustomCarousel from '@/components/CustomCarousel';

import { Job as PrismaJob } from '@prisma/client';

interface Job extends PrismaJob {
  createdBy: {
    name: string;
  };
}

interface CategorizedJobs {
  industrial: Job[];
  design: Job[];
  software: Job[];
  electronics: Job[];
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<CategorizedJobs>({
    industrial: [],
    design: [],
    software: [],
    electronics: []
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<keyof CategorizedJobs>('industrial');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading session
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Only fetch jobs if authenticated
    if (status !== 'authenticated') return;

    // Fetch jobs
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [status, router]);

  // Show loading while checking auth
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bienvenido!!</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Empleos Destacados</h2>
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveCategory('industrial')}
                className={`px-4 py-2 rounded-md ${
                  activeCategory === 'industrial' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Ingeniería Industrial
              </button>
              <button
                onClick={() => setActiveCategory('design')}
                className={`px-4 py-2 rounded-md ${
                  activeCategory === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Diseño Gráfico
              </button>
              <button
                onClick={() => setActiveCategory('software')}
                className={`px-4 py-2 rounded-md ${
                  activeCategory === 'software' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Ing. de Software
              </button>
              <button
                onClick={() => setActiveCategory('electronics')}
                className={`px-4 py-2 rounded-md ${
                  activeCategory === 'electronics' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Electrónica
              </button>
            </div>

            {jobs[activeCategory].length > 0 ? (
              <div className="w-full max-w-4xl mx-auto">
                <CustomCarousel>
                  {jobs[activeCategory].map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </CustomCarousel>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No hay trabajos disponibles en esta categoría.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Mis Aplicaciones</h3>
            <p className="text-gray-600">Rastrea tus aplicaciones laborales</p>
            <button
              onClick={() => router.push('/applications')}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver Aplicaciones
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Perfil</h3>
            <p className="text-gray-600">Actualiza tu información</p>
            <button
              onClick={() => router.push('/profile')}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Editar Perfil
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Alertas de Empleo</h3>
            <p className="text-gray-600">Gestiona tus preferencias laborales</p>
            <button
              onClick={() => router.push('/job-alerts')}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Configurar Alertas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}