const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key (needed for DDL operations)
const supabase = createClient(
  'https://vdtysibzyvguhrbaefst.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdHlzaWJ6eXZndWhyYmFlZnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NDM3MDIsImV4cCI6MjA1NDQxOTcwMn0.CHq3CqgTZvBJ5RMjXt6PVoN2uKO_Mf5nCmUk1RqJXfI'
);

async function runMigration() {
  try {
    console.log('Starting migration: Adding user profile fields...');

    // Execute the migration using raw SQL
    const { data, error } = await supabase.rpc('exec', {
      sql: `
        ALTER TABLE "User" 
        ADD COLUMN IF NOT EXISTS "age" INTEGER,
        ADD COLUMN IF NOT EXISTS "phone" TEXT,
        ADD COLUMN IF NOT EXISTS "location" TEXT,
        ADD COLUMN IF NOT EXISTS "bio" TEXT;
      `
    });

    if (error) {
      console.error('Migration failed:', error);
      // Try alternative approach - check if columns exist
      console.log('\nTrying alternative approach...');
      const { data: columns, error: colError } = await supabase
        .from('User')
        .select('*')
        .limit(1);
      
      if (colError) {
        console.error('Cannot access User table:', colError);
      } else {
        console.log('User table is accessible. The columns may already exist or need to be added via Supabase Dashboard SQL Editor.');
        console.log('Sample data:', columns);
      }
    } else {
      console.log('Migration successful!', data);
    }

  } catch (error) {
    console.error('Error running migration:', error);
  }
}

runMigration();
