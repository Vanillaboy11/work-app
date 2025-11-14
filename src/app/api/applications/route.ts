import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { jobId } = await request.json();

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Find the user
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user already applied
    const { data: existingApplication } = await supabase
      .from('JobApplication')
      .select('id')
      .eq('jobId', jobId)
      .eq('userId', user.id)
      .single();

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Ya has aplicado a este trabajo' },
        { status: 400 }
      );
    }

    // Create the application
    const { data: application, error: appError } = await supabase
      .from('JobApplication')
      .insert({
        jobId,
        userId: user.id,
        status: 'PENDING'
      })
      .select()
      .single();

    if (appError) {
      console.error('Error creating application:', appError);
      return NextResponse.json(
        { error: 'Error al crear la aplicación' },
        { status: 500 }
      );
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: user, error: userError } = await supabase
      .from('User')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const { data: applications, error: appsError } = await supabase
      .from('JobApplication')
      .select(`
        *,
        job:Job(
          *,
          createdBy:User!Job_userId_fkey(name)
        )
      `)
      .eq('userId', user.id)
      .order('createdAt', { ascending: false });

    if (appsError) {
      console.error('Error fetching applications:', appsError);
      return NextResponse.json(
        { error: 'Error al obtener aplicaciones' },
        { status: 500 }
      );
    }

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}