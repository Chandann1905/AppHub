-- Storage bucket setup for AppHub
-- Run this in Supabase SQL Editor after creating buckets in the dashboard

-- Note: Buckets must be created via Supabase Dashboard or CLI
-- This file documents the required bucket configuration

-- Required Buckets:
-- 1. app-icons (public)
-- 2. screenshots (public)  
-- 3. binaries (public with signed URLs for downloads)

-- After creating buckets, apply these storage policies:

-- Allow public read access to icons
CREATE POLICY "Public can view icons"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-icons');

-- Allow public read access to screenshots
CREATE POLICY "Public can view screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'screenshots');

-- Allow public read access to binaries (for CDN delivery)
CREATE POLICY "Public can download binaries"
ON storage.objects FOR SELECT
USING (bucket_id = 'binaries');

-- Allow authenticated users to upload icons
CREATE POLICY "Admins can upload icons"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'app-icons' AND auth.role() = 'authenticated');

-- Allow authenticated users to upload screenshots
CREATE POLICY "Admins can upload screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'screenshots' AND auth.role() = 'authenticated');

-- Allow authenticated users to upload binaries
CREATE POLICY "Admins can upload binaries"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'binaries' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Admins can delete icons"
ON storage.objects FOR DELETE
USING (bucket_id = 'app-icons' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can delete screenshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'screenshots' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can delete binaries"
ON storage.objects FOR DELETE
USING (bucket_id = 'binaries' AND auth.role() = 'authenticated');
