import Link from 'next/link';
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import FeaturedJobsCarousel from '@/components/FeaturedJobsCarousel';

export default async function HomePage() {
  const session = await getServerSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center overflow-hidden">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
        {/* ↓ Reduced padding so it fits nicely on screen */}
        <div className="mx-auto max-w-7xl pb-12 pt-6 sm:pb-20 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-28">
          <div className="px-6 lg:px-0 lg:pt-2">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">UniEmpleos</span>
                </div>
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Tu puente hacia el éxito profesional
                </h1>
                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Conectamos estudiantes y recién egresados con las mejores oportunidades laborales. 
                  Encuentra el trabajo ideal para comenzar tu carrera profesional.
                </p>
                <div className="mt-8 flex items-center gap-x-6">
                  <Link
                    href="/register"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Regístrate Gratis
                  </Link>
                  <Link
                    href="/login"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Iniciar Sesión <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Featured Jobs */}
          <div className="mt-12 sm:mt-16 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-full">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] 
                         bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 
                         md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-blue-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg]
                             bg-blue-100 opacity-20 ring-1 ring-inset ring-white 
                             md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-6 sm:pt-12 md:pl-12 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-full overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            Empleos Destacados
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-10">
                        <FeaturedJobsCarousel />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
