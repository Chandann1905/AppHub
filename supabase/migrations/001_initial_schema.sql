-- AppHub Database Schema Migration
-- Run this in Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Apps table (main catalog)
CREATE TABLE IF NOT EXISTS apps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    icon_url TEXT,
    developer TEXT,
    website TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
    featured BOOLEAN DEFAULT FALSE,
    downloads_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- App versions table
CREATE TABLE IF NOT EXISTS app_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    version TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('android', 'windows', 'zip')),
    file_url TEXT NOT NULL,
    file_size BIGINT,
    file_hash TEXT,
    changelog TEXT,
    system_requirements TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(app_id, version, platform)
);

-- App screenshots table
CREATE TABLE IF NOT EXISTS app_screenshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Downloads tracking table
CREATE TABLE IF NOT EXISTS downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_id UUID NOT NULL REFERENCES app_versions(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page views tracking (for analytics)
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_apps_status ON apps(status);
CREATE INDEX IF NOT EXISTS idx_apps_category ON apps(category_id);
CREATE INDEX IF NOT EXISTS idx_apps_featured ON apps(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);
CREATE INDEX IF NOT EXISTS idx_app_versions_app_id ON app_versions(app_id);
CREATE INDEX IF NOT EXISTS idx_app_versions_active ON app_versions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_downloads_version_id ON downloads(version_id);
CREATE INDEX IF NOT EXISTS idx_downloads_created ON downloads(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_app_id ON page_views(app_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);

-- Insert default categories
INSERT INTO categories (name, slug, description, icon) VALUES
    ('Android Apps', 'android', 'Android APK applications', '📱'),
    ('Windows Software', 'windows', 'Windows EXE applications', '💻'),
    ('Tools', 'tools', 'Utility tools and software', '🔧'),
    ('Games', 'games', 'Games for all platforms', '🎮'),
    ('Productivity', 'productivity', 'Productivity applications', '📊'),
    ('Media', 'media', 'Media and entertainment apps', '🎬')
ON CONFLICT (slug) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for apps table
DROP TRIGGER IF EXISTS update_apps_updated_at ON apps;
CREATE TRIGGER update_apps_updated_at
    BEFORE UPDATE ON apps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE apps SET downloads_count = downloads_count + 1
    FROM app_versions
    WHERE app_versions.id = NEW.version_id
    AND apps.id = app_versions.app_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for downloads
DROP TRIGGER IF EXISTS increment_downloads ON downloads;
CREATE TRIGGER increment_downloads
    AFTER INSERT ON downloads
    FOR EACH ROW
    EXECUTE FUNCTION increment_download_count();

-- Row Level Security (RLS)
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read policies (for published content)
CREATE POLICY "Public can view published apps" ON apps
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view active versions" ON app_versions
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view screenshots" ON app_screenshots
    FOR SELECT USING (true);

CREATE POLICY "Public can view categories" ON categories
    FOR SELECT USING (true);

-- Allow downloads to be inserted by anyone (for tracking)
CREATE POLICY "Anyone can log downloads" ON downloads
    FOR INSERT WITH CHECK (true);

-- Allow page views to be inserted by anyone (for analytics)
CREATE POLICY "Anyone can log page views" ON page_views
    FOR INSERT WITH CHECK (true);

-- Admin policies (service role bypasses RLS, but these are for authenticated users)
CREATE POLICY "Admins can do everything on apps" ON apps
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything on versions" ON app_versions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can do everything on screenshots" ON app_screenshots
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can view downloads" ON downloads
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can view page views" ON page_views
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL USING (auth.role() = 'authenticated');
