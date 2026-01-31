# Admin Authentication Flow

AppHub uses a secure, server-side authentication system powered by Supabase.

## 1. Architecture

- **Auth Provider:** Supabase Auth (Email/Password)
- **Role Management:** Custom `admin_users` table linked to `auth.users`.
- **Session Strategy:** HTTP-Only Secure Cookies (`sb-access-token`).
- **Protection:** Next.js Middleware.

## 2. Setup Requirements

To enable login, the database must be configured manually (due to security restrictions).

1. **Run Migration:** Execute `admin_auth_setup.sql`.
   - Creates `admin_users` table.
   - Enables Row Level Security (RLS).
2. **Create User:**
   - Sign up or Invite user via Supabase Dashboard.
   - Insert row into `admin_users` linking the `user_id`.

## 3. Login Flow

1. User visits `/admin/login`.
2. Submits Email/Password.
3. **POST /api/admin/login**:
   - Authenticates with Supabase (`signInWithPassword`).
   - Checks `admin_users` table for active admin role.
   - Sets `sb-access-token` cookie.
   - Logs the attempt in `admin_login_logs`.
4. Redirects to `/admin/dashboard`.

## 4. Route Protection (Middleware)

The file `apps/web/middleware.ts` intercepts all requests to `/admin/*`.

- **Check:** Presence of `sb-access-token`.
- **Success:** Allow request.
- **Fail:** Redirect to `/admin/login`.

## 5. Admin Profile (`/admin/profile`)

- Displays Authenticated User Info (Email, Role, Last Sign In).
- Validates session token via `supabase.auth.getUser()`.
- **Logout Action:**
  - POSTs to `/api/admin/logout`.
  - Clears cookies.
  - Client redirects to Login.

## 6. Security Notes

- **RLS:** Admin data is only visible to admins.
- **Logs:** All login attempts (IP, Agent, Success/Fail) are audited in `admin_login_logs`.
- **Cookies:** HttpOnly, Secure (in Prod), SameSite=Lax.
