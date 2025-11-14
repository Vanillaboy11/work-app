-- ========================================
-- MIGRATION: Add User Profile Fields
-- Execute this in Supabase SQL Editor
-- ========================================

-- Add new columns to User table
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "age" INTEGER,
ADD COLUMN IF NOT EXISTS "phone" TEXT,
ADD COLUMN IF NOT EXISTS "location" TEXT,
ADD COLUMN IF NOT EXISTS "bio" TEXT;

-- Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'User'
ORDER BY ordinal_position;
