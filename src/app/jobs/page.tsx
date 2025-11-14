'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  workMode: string;
  contractType: string;
  salary?: number;
  salaryMax?: number;
  description: string;
  createdAt: string;
  hasApplied?: boolean;
}

export default function JobsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  const [selectedContractType, setSelectedContractType] = useState('all');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch jobs
  useEffect(() => {
    if (status !== 'authenticated') return;
    fetchJobs();
  }, [status]);

  // Filter jobs whenever filters or data change
  useEffect(() => {
    if (allJobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    let filtered = [...allJobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Work mode filter
    if (selectedWorkMode !== 'all') {
      filtered = filtered.filter(job => job.workMode === selectedWorkMode);
    }

    // Contract type filter
    if (selectedContractType !== 'all') {
      filtered = filtered.filter(job => job.contractType === selectedContractType);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, selectedWorkMode, selectedContractType, allJobs]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      
      const data = await response.json();
      // Combine all categories into one array
      const combined = [
        ...data.industrial,
        ...data.design,
        ...data.software,
        ...data.electronics
      ];
      setAllJobs(combined);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'No especificado';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    return `$${(min || max)?.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'INDUSTRIAL': 'Ingeniería Industrial',
      'DESIGN': 'Diseño Gráfico',
      'SOFTWARE': 'Ing. de Software',
      'ELECTRONICS': 'Electrónica'
    };
    return labels[category] || category;
  };

  const getWorkModeLabel = (mode: string) => {
    const labels: Record<string, string> = {
      'REMOTE': 'Remoto',
      'ONSITE': 'Presencial',
      'HYBRID': 'Híbrido'
    };
    return labels[mode] || mode;
  };

  const getContractTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'FULL_TIME': 'Tiempo Completo',
      'PART_TIME': 'Medio Tiempo',
      'FREELANCE': 'Freelance',
      'INTERNSHIP': 'Prácticas'
    };
    return labels[type] || type;
  };

  // Show loading while checking auth or fetching data
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando empleos...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Empleos Disponibles
          </h1>
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'empleo encontrado' : 'empleos encontrados'}
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                id="search"
                type="text"
                placeholder="Buscar por título, empresa, ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas</option>
                <option value="INDUSTRIAL">Ingeniería Industrial</option>
                <option value="DESIGN">Diseño Gráfico</option>
                <option value="SOFTWARE">Ing. de Software</option>
                <option value="ELECTRONICS">Electrónica</option>
              </select>
            </div>

            {/* Work Mode Filter */}
            <div>
              <label htmlFor="workMode" className="block text-sm font-medium text-gray-700 mb-2">
                Modalidad
              </label>
              <select
                id="workMode"
                value={selectedWorkMode}
                onChange={(e) => setSelectedWorkMode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas</option>
                <option value="REMOTE">Remoto</option>
                <option value="ONSITE">Presencial</option>
                <option value="HYBRID">Híbrido</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Contract Type Filter */}
            <div>
              <label htmlFor="contractType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Contrato
              </label>
              <select
                id="contractType"
                value={selectedContractType}
                onChange={(e) => setSelectedContractType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos</option>
                <option value="FULL_TIME">Tiempo Completo</option>
                <option value="PART_TIME">Medio Tiempo</option>
                <option value="FREELANCE">Freelance</option>
                <option value="INTERNSHIP">Prácticas</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedWorkMode('all');
                  setSelectedContractType('all');
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                            onClick={() => router.push(`/jobs/${job.id}`)}>
                          {job.title}
                        </h2>
                        <p className="text-gray-600 mt-1">{job.company}</p>
                      </div>
                      {job.hasApplied && (
                        <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          ✓ Aplicado
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                        📂 {getCategoryLabel(job.category)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                        💼 {getContractTypeLabel(job.contractType)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                        🏠 {getWorkModeLabel(job.workMode)}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800">
                        📍 {job.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                        💰 {formatSalary(job.salary, job.salaryMax)}
                      </span>
                    </div>

                    <p className="mt-3 text-gray-700 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="mt-3 text-sm text-gray-500">
                      ⏰ Publicado {formatDate(job.createdAt)}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                    <button
                      onClick={() => router.push(`/jobs/${job.id}`)}
                      className={`px-6 py-2 rounded-md font-medium transition-colors ${
                        job.hasApplied
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron empleos
              </h3>
              <p className="text-gray-600">
                Intenta ajustar tus filtros de búsqueda para encontrar más resultados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
