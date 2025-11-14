'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  age?: number;
  phone?: string;
  location?: string;
  bio?: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  salaryMax?: number;
  type: string;
  workMode: string;
  contractType: string;
  createdAt: string;
  isActive: boolean;
}

interface Application {
  id: string;
  status: string;
  createdAt: string;
  job: Job;
}

interface ProfileData {
  user: User;
  postedJobs: Job[];
  applications: Application[];
}

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posted' | 'applications'>('posted');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetchProfile();
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
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
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
      REVIEWED: 'bg-blue-100 text-blue-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const statusTexts: Record<string, string> = {
      PENDING: 'Pendiente',
      ACCEPTED: 'Aceptada',
      REJECTED: 'Rechazada',
      REVIEWED: 'En revisión'
    };
    return statusTexts[status] || status;
  };

  // Show loading while checking auth or fetching data
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status !== 'authenticated') {
    return null;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No se pudo cargar el perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {profile.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{profile.user.name}</h1>
                <p className="text-gray-600 mt-1">{profile.user.email}</p>
                
                {/* Additional User Info */}
                <div className="mt-3 space-y-1">
                  {profile.user.age && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Edad:</span> {profile.user.age} años
                    </p>
                  )}
                  {profile.user.phone && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Teléfono:</span> {profile.user.phone}
                    </p>
                  )}
                  {profile.user.location && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Ubicación:</span> {profile.user.location}
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    profile.user.role === 'EMPLOYER' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {profile.user.role === 'EMPLOYER' ? '👔 Empleador' : '👤 Candidato'}
                  </span>
                </div>

                {/* Bio */}
                {profile.user.bio && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Sobre mí</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{profile.user.bio}</p>
                  </div>
                )}
              </div>
              <div className="text-right ml-6">
                <p className="text-sm text-gray-500">Miembro desde</p>
                <p className="text-gray-900 font-medium">{formatDate(profile.user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-gray-200 px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{profile.postedJobs.length}</div>
                <div className="text-gray-600 mt-1">Trabajos Publicados</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600">{profile.applications.length}</div>
                <div className="text-gray-600 mt-1">Aplicaciones</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {profile.postedJobs.filter(j => j.isActive).length}
                </div>
                <div className="text-gray-600 mt-1">Trabajos Activos</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="px-8">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('posted')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'posted'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Trabajos Publicados ({profile.postedJobs.length})
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'applications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Mis Aplicaciones ({profile.applications.length})
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-8 py-6">
            {activeTab === 'posted' && (
              <div className="space-y-4">
                {profile.postedJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No has publicado ningún trabajo aún</p>
                  </div>
                ) : (
                  profile.postedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              job.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{job.company}</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                            <span>📍 {job.location}</span>
                            <span>💰 {formatSalary(job.salary, job.salaryMax)}</span>
                            <span>⏰ {job.contractType}</span>
                            <span>🏢 {job.workMode}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Publicado</p>
                          <p className="text-gray-900">{formatDate(job.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                {profile.applications.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No has aplicado a ningún trabajo aún</p>
                  </div>
                ) : (
                  profile.applications.map((application) => (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/jobs/${application.job.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {application.job.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(application.status)}`}>
                              {getStatusText(application.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">{application.job.company}</p>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                            <span>📍 {application.job.location}</span>
                            <span>💰 {formatSalary(application.job.salary, application.job.salaryMax)}</span>
                            <span>⏰ {application.job.contractType}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Aplicado</p>
                          <p className="text-gray-900">{formatDate(application.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;