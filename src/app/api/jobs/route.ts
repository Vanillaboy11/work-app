import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession();
    let userId: string | null = null;

    // Get current user ID if logged in
    if (session?.user?.email) {
      const { data: user } = await supabase
        .from('User')
        .select('id')
        .eq('email', session.user.email)
        .single();
      userId = user?.id || null;
    }

    // Get all jobs with their creator information
    const { data: jobs, error } = await supabase
      .from('Job')
      .select(`
        *,
        createdBy:User!Job_userId_fkey(name)
      `)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Get user's applications if logged in
    let userApplications: string[] = [];
    if (userId) {
      const { data: applications } = await supabase
        .from('JobApplication')
        .select('jobId')
        .eq('userId', userId);
      
      userApplications = applications?.map(app => app.jobId) || [];
    }

    // Add hasApplied flag to each job
    const jobsWithStatus = jobs?.map(job => ({
      ...job,
      hasApplied: userApplications.includes(job.id)
    })) || [];

    // Categorize jobs based on titles and descriptions
    const categorizedJobs = {
      industrial: jobsWithStatus.filter(job => 
        job.title.toLowerCase().includes('industrial') || 
        job.description?.toLowerCase().includes('procesos') ||
        job.description?.toLowerCase().includes('producción')
      ),
      design: jobsWithStatus.filter(job => 
        job.title.toLowerCase().includes('diseñador') ||
        job.title.toLowerCase().includes('ux') ||
        job.title.toLowerCase().includes('ui')
      ),
      software: jobsWithStatus.filter(job => 
        job.title.toLowerCase().includes('desarrollador') ||
        job.title.toLowerCase().includes('software') ||
        job.description?.toLowerCase().includes('programación')
      ),
      electronics: jobsWithStatus.filter(job => 
        job.title.toLowerCase().includes('electrónica') ||
        job.description?.toLowerCase().includes('circuitos') ||
        job.description?.toLowerCase().includes('hardware')
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