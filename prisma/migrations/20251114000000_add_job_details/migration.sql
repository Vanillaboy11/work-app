-- AlterTable
ALTER TABLE "Job" 
ADD COLUMN "salaryMax" DOUBLE PRECISION,
ADD COLUMN "workMode" TEXT NOT NULL DEFAULT 'ON_SITE',
ADD COLUMN "contractType" TEXT NOT NULL DEFAULT 'FULL_TIME',
ADD COLUMN "schedule" TEXT,
ADD COLUMN "requirements" TEXT,
ADD COLUMN "benefits" TEXT,
ADD COLUMN "experienceLevel" TEXT,
ADD COLUMN "department" TEXT,
ADD COLUMN "applicationDeadline" TIMESTAMP(3),
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterColumn description to TEXT
ALTER TABLE "Job" ALTER COLUMN "description" TYPE TEXT;

-- CreateEnum for WorkMode if not exists
DO $$ BEGIN
 CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ON_SITE', 'HYBRID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- CreateEnum for ContractType if not exists
DO $$ BEGIN
 CREATE TYPE "ContractType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY', 'FREELANCE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Update the workMode and contractType columns to use the new enums
ALTER TABLE "Job" ALTER COLUMN "workMode" TYPE "WorkMode" USING "workMode"::"WorkMode";
ALTER TABLE "Job" ALTER COLUMN "contractType" TYPE "ContractType" USING "contractType"::"ContractType";
