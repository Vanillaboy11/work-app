import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Get user data
    const { data: users, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('email', session.user.email)
      .single();

    if (userError || !users) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Get user's posted jobs
    const { data: postedJobs, error: jobsError } = await supabase
      .from('Job')
      .select('*')
      .eq('userId', users.id)
      .order('createdAt', { ascending: false });

    // Get user's applications
    const { data: applications, error: appsError } = await supabase
      .from('JobApplication')
      .select(`
        *,
        job:Job(*)
      `)
      .eq('userId', users.id)
      .order('createdAt', { ascending: false });

    return NextResponse.json({
      user: {
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        age: users.age,
        phone: users.phone,
        location: users.location,
        bio: users.bio,
      },
      postedJobs: postedJobs || [],
      applications: (applications || []).map(app => ({
        id: app.id,
        status: app.status,
        createdAt: app.createdAt,
        job: app.job
      }))
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Error al cargar el perfil' },
      { status: 500 }
    );
  }
}
