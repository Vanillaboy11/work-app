import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();
    
    const { data: job, error } = await supabase
      .from('Job')
      .select(`
        *,
        createdBy:User!Job_userId_fkey(name, email)
      `)
      .eq('id', id)
      .single();

    if (error || !job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if user has already applied
    let hasApplied = false;
    if (session?.user?.email) {
      const { data: user } = await supabase
        .from('User')
        .select('id')
        .eq('email', session.user.email)
        .single();

      if (user) {
        const { data: application } = await supabase
          .from('JobApplication')
          .select('id')
          .eq('jobId', id)
          .eq('userId', user.id)
          .single();

        hasApplied = !!application;
      }
    }

    return NextResponse.json({ ...job, hasApplied });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}