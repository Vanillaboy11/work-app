import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Starting migration...');

  const migrationSQL = `
-- Step 1: Create new enum types
DO $$ BEGIN
 CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ON_SITE', 'HYBRID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "ContractType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY', 'FREELANCE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Step 2: Add new columns to Job table
ALTER TABLE "Job" 
ADD COLUMN IF NOT EXISTS "salaryMax" DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS "workMode" TEXT DEFAULT 'ON_SITE',
ADD COLUMN IF NOT EXISTS "contractType" TEXT DEFAULT 'FULL_TIME',
ADD COLUMN IF NOT EXISTS "schedule" TEXT,
ADD COLUMN IF NOT EXISTS "requirements" TEXT,
ADD COLUMN IF NOT EXISTS "benefits" TEXT,
ADD COLUMN IF NOT EXISTS "experienceLevel" TEXT,
ADD COLUMN IF NOT EXISTS "department" TEXT,
ADD COLUMN IF NOT EXISTS "applicationDeadline" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;

-- Step 3: Update the columns to use enum types
ALTER TABLE "Job" 
ALTER COLUMN "workMode" TYPE "WorkMode" USING "workMode"::"WorkMode",
ALTER COLUMN "contractType" TYPE "ContractType" USING "contractType"::"ContractType";

-- Step 4: Set NOT NULL constraints
ALTER TABLE "Job" 
ALTER COLUMN "workMode" SET NOT NULL,
ALTER COLUMN "contractType" SET NOT NULL,
ALTER COLUMN "isActive" SET NOT NULL;

-- Step 5: Update description column to TEXT type
ALTER TABLE "Job" 
ALTER COLUMN "description" TYPE TEXT;
  `;

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: migrationSQL
    });

    if (error) {
      console.error('Error running migration:', error);
      
      // Try alternative approach using individual queries
      console.log('\nTrying alternative approach with individual queries...');
      
      const queries = [
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "salaryMax" DOUBLE PRECISION`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "schedule" TEXT`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "requirements" TEXT`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "benefits" TEXT`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "experienceLevel" TEXT`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "department" TEXT`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "applicationDeadline" TIMESTAMP(3)`,
        `ALTER TABLE "Job" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`,
      ];

      for (const query of queries) {
        console.log(`Executing: ${query}`);
        const result = await supabase.rpc('exec_sql', { sql: query });
        if (result.error) {
          console.error(`Error: ${result.error.message}`);
        } else {
          console.log('✓ Success');
        }
      }
    } else {
      console.log('✓ Migration completed successfully!');
      console.log(data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

runMigration()
  .then(() => {
    console.log('\nMigration process completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
