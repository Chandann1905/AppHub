# Supabase Setup Guide

## Overview

AppHub uses Supabase as its backend platform, providing:

- PostgreSQL database with auto-generated REST API
- Built-in authentication and authorization
- File storage with CDN delivery
- Real-time subscriptions (for future features)
- Row Level Security (RLS) for data protection

## Creating a Supabase Project

### Step 1: Sign Up for Supabase

1. Visit [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, GitLab, or email

### Step 2: Create a New Project

1. Click "New Project" in your Supabase dashboard
2. Select your organization (or create a new one)
3. Fill in project details:
   - **Name**: `AppHub` (or your preferred name)
   - **Database Password**: Generate a strong password (save this securely!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Free tier is sufficient for development

4. Click "Create new project"
5. Wait 2-3 minutes for project initialization

### Step 3: Get API Credentials

Once your project is ready:

1. Navigate to **Settings** → **API**
2. You'll find:
   - **Project URL**: `https://[PROJECT-ID].supabase.co`
   - **API Keys**:
     - `anon` / `public` key - Safe for client-side use
     - `service_role` key - ⚠️ Secret, server-side only

3. Copy these values to your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Optional, keep secure
```

## Database Setup (Future)

When you're ready to create database tables:

### Option 1: SQL Editor (Recommended)

1. Go to **SQL Editor** in Supabase dashboard
2. Write your migration SQL
3. Run the query
4. Generate TypeScript types (see below)

### Option 2: Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref [YOUR-PROJECT-ID]

# Create a migration
supabase migration new initial_schema

# Apply migration
supabase db push
```

## Generating TypeScript Types

After creating database tables, generate TypeScript types:

### Using Supabase CLI

```bash
# Generate types from your project
supabase gen types typescript --project-id [YOUR-PROJECT-ID] > packages/db/src/types.ts
```

### Using Dashboard

1. Go to **Settings** → **API**
2. Scroll to "API Documentation"
3. Copy the generated TypeScript types
4. Replace contents of `packages/db/src/types.ts`

## Storage Setup (Future)

For file uploads:

### Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click "New bucket"
3. Bucket details:
   - **Name**: `apps` (matches `STORAGE.BUCKET_NAME` in config)
   - **Public**: Yes (for public downloads)
   - **File size limit**: 2GB (matches operational spec)
   - **Allowed MIME types**: Configure based on `UPLOAD_LIMITS.ALLOWED_FILE_TYPES`

4. Click "Create bucket"

### Configure Bucket Policies

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'apps');

-- Allow public downloads
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'apps');
```

## Authentication Setup (Future)

### Enable Auth Providers

1. Go to **Authentication** → **Providers**
2. Enable desired providers:
   - **Email**: Built-in, always available
   - **OAuth**: Google, GitHub, etc.
   - **Magic Link**: Passwordless authentication

### Configure Email Templates

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Password reset email
   - Magic link email

## Security: Row Level Security (RLS)

### Enable RLS on Tables

```sql
-- Enable RLS on a table
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
ON your_table FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data"
ON your_table FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
```

## Environment Configuration

### Development

Use the values from your Supabase project dashboard:

```env
# .env.local or .env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE-ROLE-KEY]  # Server-side only
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Production

For production deployments (Vercel, etc.):

1. Add environment variables to your hosting platform
2. Use production Supabase project credentials
3. Update `NEXT_PUBLIC_APP_URL` to your production domain

## Testing the Connection

### Verify Supabase Connection

Create a test API route in `apps/web/app/api/test-supabase/route.ts`:

```typescript
import { supabase } from '@apphub/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection by querying Supabase
    const { data, error } = await supabase
      .from('_supabase_migrations')
      .select('*')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
```

Visit `http://localhost:3000/api/test-supabase` to test.

## Monitoring & Logs

### View Logs

1. Go to **Logs** in Supabase dashboard
2. Filter by:
   - **API**: REST API requests
   - **Auth**: Authentication events
   - **Database**: PostgreSQL logs
   - **Storage**: File operations

### Set Up Alerts (Production)

1. Go to **Settings** → **Alerts**
2. Configure alerts for:
   - High error rates
   - Database size limits
   - Bandwidth usage

## Database Backups

Supabase automatically backs up your database:

- **Free tier**: Daily backups, 7-day retention
- **Pro tier**: Daily backups, 30-day retention, point-in-time recovery

### Manual Backups

```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Restore from backup
supabase db reset --db-url [DATABASE-URL] -f backup.sql
```

## Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Troubleshooting

### Connection Issues

**Problem**: Cannot connect to Supabase

- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure project is not paused (free tier auto-pauses after inactivity)

### CORS Errors

**Problem**: CORS errors in browser

- Supabase automatically handles CORS for configured domains
- For local development, `localhost` is allowed by default
- For production, add your domain in **Settings** → **API** → **URL Configuration**

### RLS Policy Errors

**Problem**: Cannot query data, receiving empty results

- Ensure RLS policies are created for your tables
- Verify user authentication state
- Check policy conditions match your query

---

**Status**: Supabase setup guide ready. Configure your project when needed for database operations.
