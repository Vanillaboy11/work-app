import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get jobs grouped by categories (based on titles/descriptions)
    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          // Ingeniería Industrial
          {
            OR: [
              { title: { contains: 'Industrial', mode: 'insensitive' } },
              { description: { contains: 'procesos', mode: 'insensitive' } },
              { description: { contains: 'producción', mode: 'insensitive' } }
            ]
          },
          // Diseño Gráfico
          {
            OR: [
              { title: { contains: 'Diseñador', mode: 'insensitive' } },
              { title: { contains: 'UX', mode: 'insensitive' } },
              { title: { contains: 'UI', mode: 'insensitive' } }
            ]
          },
          // Ingeniería de Software
          {
            OR: [
              { title: { contains: 'Desarrollador', mode: 'insensitive' } },
              { title: { contains: 'Software', mode: 'insensitive' } },
              { description: { contains: 'programación', mode: 'insensitive' } }
            ]
          },
          // Electrónica
          {
            OR: [
              { title: { contains: 'Electrónica', mode: 'insensitive' } },
              { description: { contains: 'circuitos', mode: 'insensitive' } },
              { description: { contains: 'hardware', mode: 'insensitive' } }
            ]
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    // Agrupar trabajos por categoría para mejor organización en el frontend
    const categorizedJobs = {
      industrial: jobs.filter(job => 
        job.title.toLowerCase().includes('industrial') || 
        job.description.toLowerCase().includes('procesos') ||
        job.description.toLowerCase().includes('producción')
      ),
      design: jobs.filter(job => 
        job.title.toLowerCase().includes('diseñador') ||
        job.title.toLowerCase().includes('ux') ||
        job.title.toLowerCase().includes('ui')
      ),
      software: jobs.filter(job => 
        job.title.toLowerCase().includes('desarrollador') ||
        job.title.toLowerCase().includes('software') ||
        job.description.toLowerCase().includes('programación')
      ),
      electronics: jobs.filter(job => 
        job.title.toLowerCase().includes('electrónica') ||
        job.description.toLowerCase().includes('circuitos') ||
        job.description.toLowerCase().includes('hardware')
      )
    };

    return NextResponse.json(categorizedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}