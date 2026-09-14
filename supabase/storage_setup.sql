-- ==============================================================================
-- OcaVerse Storage Setup: 'media' Bucket & Row-Level Security (RLS) Policies
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rrwstaqbxdhljrsnrgzm/sql/new
-- ==============================================================================

-- 1. Create the 'media' storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  52428800, -- 50 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm'];

-- 2. Drop any conflicting storage policies for the 'media' bucket
DROP POLICY IF EXISTS "Allow Public Read Media" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Media Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Media Updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow All Media Deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated insert media" ON storage.objects;
DROP POLICY IF EXISTS "Allow public select media" ON storage.objects;

-- 3. Policy: Allow public read/download access to media files
CREATE POLICY "Allow Public Read Media"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'media');

-- 4. Policy: Allow file uploads into the 'media' bucket (both authenticated & anon users)
CREATE POLICY "Allow All Media Uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'media');

-- 5. Policy: Allow updating/overwriting media in the 'media' bucket
CREATE POLICY "Allow All Media Updates"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- 6. Policy: Allow deleting media from the 'media' bucket
CREATE POLICY "Allow All Media Deletes"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'media');
