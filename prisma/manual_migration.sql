-- ========================================
-- MIGRATION: Add Job Details Fields
-- Execute this in Supabase SQL Editor
-- ========================================

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

-- Step 2: Add new columns to Job table (first as TEXT to avoid enum issues)
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

-- Step 3: Update description column to TEXT type
ALTER TABLE "Job" 
ALTER COLUMN "description" TYPE TEXT;

-- Step 4: Set NOT NULL constraints for required fields
ALTER TABLE "Job" 
ALTER COLUMN "workMode" SET NOT NULL,
ALTER COLUMN "contractType" SET NOT NULL,
ALTER COLUMN "isActive" SET NOT NULL;

-- Step 5: Drop the TEXT defaults before converting to ENUM
ALTER TABLE "Job" 
ALTER COLUMN "workMode" DROP DEFAULT,
ALTER COLUMN "contractType" DROP DEFAULT;

-- Step 6: Convert TEXT columns to ENUM types
ALTER TABLE "Job" 
ALTER COLUMN "workMode" TYPE "WorkMode" USING "workMode"::"WorkMode",
ALTER COLUMN "contractType" TYPE "ContractType" USING "contractType"::"ContractType";

-- Step 7: Set the proper ENUM defaults
ALTER TABLE "Job" 
ALTER COLUMN "workMode" SET DEFAULT 'ON_SITE'::"WorkMode",
ALTER COLUMN "contractType" SET DEFAULT 'FULL_TIME'::"ContractType";

-- Step 8: Verify the changes
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'Job'
ORDER BY ordinal_position;
