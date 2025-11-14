const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.log('Required variables:');
  console.log('  - NEXT_PUBLIC_SUPABASE_URL');
  console.log('  - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

console.log('✓ Supabase URL:', supabaseUrl);
console.log('✓ Connecting to Supabase...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  try {
    const { data, error } = await supabase.from('Job').select('count').limit(1);
    
    if (error) {
      console.error('❌ Error connecting to database:', error.message);
      return false;
    }
    
    console.log('✓ Successfully connected to database!');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    return false;
  }
}

async function main() {
  const connected = await checkConnection();
  
  if (!connected) {
    console.log('\n⚠️  Cannot connect to database.');
    console.log('\nPlease apply the migration manually:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Open your project');
    console.log('3. Go to SQL Editor');
    console.log('4. Run the SQL from: prisma/manual_migration.sql');
    process.exit(1);
  }

  console.log('\n✓ Database is accessible!');
  console.log('\nTo apply the migration, please:');
  console.log('1. Go to: https://supabase.com/dashboard/project/' + supabaseUrl.split('//')[1].split('.')[0]);
  console.log('2. Click on "SQL Editor" in the sidebar');
  console.log('3. Create a new query and paste the contents of: prisma/manual_migration.sql');
  console.log('4. Click "Run" to execute the migration');
  console.log('\nAfter running the migration, execute:');
  console.log('  npx prisma generate');
}

main();
