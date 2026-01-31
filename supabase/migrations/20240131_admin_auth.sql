-- ==========================================
-- AppHub Admin Authentication Setup
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create table for admin users (links to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 2. Create table for login audit logs
CREATE TABLE IF NOT EXISTS public.admin_login_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.admin_users(id),
    email TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    failure_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_login_logs ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies

-- Allow admins to view their own record
CREATE POLICY "Admins can view own record" ON public.admin_users
    FOR SELECT USING (auth.uid() = user_id);

-- Allow super admins to view all records (optional, good for management)
CREATE POLICY "Super admins can view all" ON public.admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE user_id = auth.uid() AND role = 'super_admin'
        )
    );

-- Allow admins to insert logs (via server function usually, but handy here)
CREATE POLICY "System can insert logs" ON public.admin_login_logs
    FOR INSERT WITH CHECK (true);

-- 5. Create a function to check if user is admin (RPC)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
