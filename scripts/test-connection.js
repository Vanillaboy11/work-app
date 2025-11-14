require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
    
    const result = await prisma.$queryRaw`SELECT current_database(), version()`;
    console.log('✅ Connection successful!');
    console.log('Result:', result);
    
    const userCount = await prisma.user.count();
    console.log(`\n✅ Found ${userCount} users in database`);
    
    const jobCount = await prisma.job.count();
    console.log(`✅ Found ${jobCount} jobs in database`);
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
