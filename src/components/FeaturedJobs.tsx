import React from 'react';

const featuredJobs = [
  { logo: 'Microsoft', title: 'Asistente de marketing', tags: ['Remoto', 'Práctica'], color: 'red' },
  { logo: 'Google', title: 'Diseñador UX', tags: ['Presencial', 'Medio'], color: 'blue' },
  { logo: 'amazon', title: 'Editor de contenido', tags: ['Remoto', 'Práctica'], color: 'orange' },
  { logo: 'IBM', title: 'Analista de datos', tags: ['Remoto', 'Práctica'], color: 'gray' },
];

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs font-medium bg-gray-100 text-gray-600 py-1 px-3 rounded-full mr-2">
    {children}
  </span>
);

const JobCard: React.FC<typeof featuredJobs[0]> = ({ logo, title, tags }) => (
  <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition duration-300">
    {/* Logo placeholder - in a real project, this would be an Image component */}
    <div className={`text-2xl font-bold mb-4 text-${tags[0] === 'Presencial' ? 'blue' : 'red'}-600`}>{logo}</div>

    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <div className="flex flex-wrap">
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  </div>
);

const FeaturedJobs: React.FC = () => {
  return (
    <section className="md:px-12 px-4 py-8 md:py-16 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 md:block hidden">
        Empleos destacados
      </h2>
      <h2 className="text-xl font-bold text-gray-800 mb-6 md:hidden text-center">
        Empleos destacados
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>

      <div className="md:flex justify-start mt-8 hidden">
        <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
          Ver más empleos
        </button>
      </div>
    </section>
  );
};

export default FeaturedJobs;