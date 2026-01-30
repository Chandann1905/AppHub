# AppHub Setup Guide

## Prerequisites

Before setting up AppHub, ensure you have the following installed:

### Required Software

1. **Node.js** (>= 18.0.0)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **pnpm** (>= 8.0.0)
   - Install globally: `npm install -g pnpm`
   - Verify installation: `pnpm --version`

3. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Optional Software

- **VS Code** with recommended extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

## Initial Setup

### 1. Install Dependencies

Navigate to the project directory and install all workspace dependencies:

```bash
cd e:\Universal_Hub\AppHub
pnpm install
```

This will:

- Install all dependencies for the root workspace
- Install dependencies for `apps/web`
- Install dependencies for `packages/db` and `packages/config`
- Link workspace packages together

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Or on Windows:

```powershell
copy .env.example .env
```

Edit `.env` and fill in the required values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service Role Key (keep this secure!)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

> ⚠️ **Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### 3. Set Up Supabase (Optional for now)

See [supabase-setup.md](./supabase-setup.md) for detailed Supabase project creation and configuration.

For development without a Supabase project yet, you can use placeholder values in `.env`.

## Development Workflow

### Start Development Server

```bash
pnpm dev
```

This will:

- Start Next.js development server on `http://localhost:3000`
- Enable hot module replacement (HMR)
- Watch for file changes across all packages

### Available Scripts

Run from the root directory:

```bash
# Development
pnpm dev              # Start Next.js dev server
pnpm build            # Build production bundle
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint on all packages
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
pnpm type-check       # Run TypeScript type checking
```

### Workspace-Specific Scripts

Run scripts for specific packages:

```bash
# Web app
pnpm --filter web dev
pnpm --filter web build

# Type check a specific package
pnpm --filter @apphub/db type-check
```

## Verification Steps

After setup, verify everything is working:

### 1. Check Dependencies

```bash
pnpm list --depth 0
```

Should show all workspace packages and dependencies.

### 2. Check TypeScript

```bash
pnpm type-check
```

Should complete without errors.

### 3. Check Linting

```bash
pnpm lint
```

Should pass with no errors.

### 4. Check Formatting

```bash
pnpm format:check
```

Should pass with no formatting issues.

### 5. Start Dev Server

```bash
pnpm dev
```

Navigate to `http://localhost:3000` and verify:

- ✅ Homepage displays "AppHub – System initialized"
- ✅ 404 page works (try `/nonexistent`)
- ✅ No console errors

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 pnpm dev
```

### Workspace Package Not Found

If you get errors about `@apphub/db` or `@apphub/config` not found:

```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

### TypeScript Errors

If you see TypeScript errors:

1. Ensure all packages are installed: `pnpm install`
2. Restart your IDE/TS server
3. Check `tsconfig.json` configurations

### Supabase Connection Errors

If you see Supabase errors but haven't set up a project yet:

This is expected. The app will work locally without a Supabase backend. Environment validation will show warnings but won't prevent the app from running in development mode.

## Next Steps

1. ✅ **Verify Setup**: Ensure all verification steps pass
2. 📚 **Read Documentation**: Review [architecture.md](./architecture.md) and [project-structure.md](./project-structure.md)
3. 🗄️ **Set Up Supabase**: Follow [supabase-setup.md](./supabase-setup.md)
4. 🏗️ **Start Building**: Ready to implement features from the PRD

## IDE Setup

### VS Code

Recommended `.vscode/settings.json` (create this file):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

Recommended extensions:

- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`
- `bradlc.vscode-tailwindcss` (for future Tailwind usage)

## Git Workflow

### Initial Commit

The project should already have an initial commit. If not:

```bash
git init
git add .
git commit -m "[agent-auto] Initial AppHub foundation setup"
```

### Branch Strategy (Future)

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches

---

**Status**: Setup complete! You're ready to start development. 🚀
