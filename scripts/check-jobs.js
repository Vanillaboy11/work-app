const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkJobs() {
  console.log('Checking jobs in database...\n');
  
  const { data, error, count } = await supabase
    .from('Job')
    .select('*', { count: 'exact' });
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log(`Found ${count} jobs in database`);
  
  if (data && data.length > 0) {
    console.log('\nJobs:');
    data.forEach((job, index) => {
      console.log(`\n${index + 1}. ${job.title}`);
      console.log(`   Company: ${job.company}`);
      console.log(`   Location: ${job.location}`);
      console.log(`   Type: ${job.type}`);
    });
  } else {
    console.log('\n⚠️  No jobs found in database');
    console.log('Run the seed script to add sample jobs');
  }
}

checkJobs();
