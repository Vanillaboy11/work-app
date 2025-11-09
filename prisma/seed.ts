import { PrismaClient, JobType, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Primero crear un usuario empleador para asociar los trabajos
  const hashedPassword = await hash('employer123', 10);
  const employer = await prisma.user.create({
    data: {
      email: 'employer@company.com',
      password: hashedPassword,
      name: 'Empresa Tecnológica SA',
      role: 'EMPLOYER',
    },
  });

  // Trabajos de Ingeniería Industrial
  const industrialJobs = [
    {
      title: 'Ingeniero de Procesos Industrial',
      company: 'Manufactura Global',
      location: 'Ciudad de México',
      description: 'Buscamos un Ingeniero Industrial para optimizar procesos de producción y mejorar la eficiencia operativa. Experiencia en Lean Manufacturing y Six Sigma.',
      salary: 35000,
      type: 'FULL_TIME',
      userId: employer.id
    },
    {
      title: 'Supervisor de Producción',
      company: 'Industrias Avanzadas',
      location: 'Monterrey',
      description: 'Se requiere Ingeniero Industrial para supervisar líneas de producción, gestionar personal y mantener estándares de calidad.',
      salary: 28000,
      type: 'FULL_TIME',
      userId: employer.id
    }
  ];

  // Trabajos de Diseño Gráfico
  const designJobs = [
    {
      title: 'Diseñador UX/UI Senior',
      company: 'Agencia Creativa Digital',
      location: 'Guadalajara',
      description: 'Buscamos diseñador gráfico con experiencia en interfaces de usuario, conocimientos de Figma y Adobe Creative Suite.',
      salary: 25000,
      type: 'FULL_TIME',
      userId: employer.id
    },
    {
      title: 'Diseñador Gráfico para Marketing Digital',
      company: 'Marketing Solutions',
      location: 'CDMX',
      description: 'Diseñador con experiencia en redes sociales, branding y marketing digital. Dominio de Photoshop e Illustrator.',
      salary: 20000,
      type: 'REMOTE',
      userId: employer.id
    }
  ];

  // Trabajos de Ingeniería de Software
  const softwareJobs = [
    {
      title: 'Desarrollador Full Stack',
      company: 'Tech Innovations',
      location: 'Remoto',
      description: 'Buscamos desarrollador con experiencia en React, Node.js y bases de datos SQL/NoSQL. Proyecto internacional.',
      salary: 45000,
      type: 'REMOTE',
      userId: employer.id
    },
    {
      title: 'Ingeniero Backend Senior',
      company: 'FinTech Solutions',
      location: 'CDMX',
      description: 'Desarrollador backend con experiencia en Java Spring Boot, microservicios y AWS. Sector financiero.',
      salary: 50000,
      type: 'FULL_TIME',
      userId: employer.id
    }
  ];

  // Trabajos de Electrónica
  const electronicsJobs = [
    {
      title: 'Ingeniero en Electrónica',
      company: 'Semiconductores MX',
      location: 'Tijuana',
      description: 'Ingeniero para diseño y desarrollo de circuitos integrados. Experiencia en diseño PCB y pruebas de hardware.',
      salary: 38000,
      type: 'FULL_TIME',
      userId: employer.id
    },
    {
      title: 'Técnico en Sistemas Embebidos',
      company: 'IoT Solutions',
      location: 'Querétaro',
      description: 'Desarrollo de firmware para sistemas embebidos, programación en C/C++ y experiencia con microcontroladores.',
      salary: 32000,
      type: 'FULL_TIME',
      userId: employer.id
    }
  ];

  // Insertar todos los trabajos
  const allJobs = [...industrialJobs, ...designJobs, ...softwareJobs, ...electronicsJobs];
  
  for (const job of allJobs) {
    await prisma.job.create({
      data: {
        ...job,
        type: job.type as JobType
      }
    });
  }

  console.log('Trabajos creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });