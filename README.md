# AppHub

> **Production-grade web platform for app distribution and management**

AppHub is a modern monorepo web application built with Next.js and Supabase, designed to provide a scalable foundation for app hosting, distribution, and management.

## 🏗️ Architecture

- **Frontend**: Next.js 14+ (TypeScript, App Router, SSR)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Package Manager**: pnpm (workspaces)
- **Monorepo Structure**: Apps + shared packages

## 📁 Project Structure

```
AppHub/
├── apps/
│   └── web/                 # Next.js frontend application
│       ├── app/            # Next.js App Router pages
│       │   ├── layout.tsx  # Root layout
│       │   ├── page.tsx    # Homepage
│       │   ├── error.tsx   # Error boundary (500)
│       │   └── not-found.tsx # 404 page
│       └── package.json
├── packages/
│   ├── db/                 # Supabase client & database types
│   │   └── src/
│   │       ├── client.ts   # Supabase client initialization
│   │       ├── types.ts    # Database type definitions
│   │       └── index.ts
│   └── config/             # Shared configuration
│       └── src/
│           ├── env.ts      # Environment validation
│           ├── constants.ts # App constants
│           └── index.ts
├── docs/                   # Architecture documentation
├── .env.example           # Environment template
├── pnpm-workspace.yaml    # Workspace configuration
└── package.json           # Root package
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. **Clone and install dependencies**:

   ```bash
   cd e:\Universal_Hub\AppHub
   pnpm install
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

3. **Run the development server**:

   ```bash
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Workspace Packages

### `@apphub/db`

Supabase client and database type definitions. Provides both browser and server-side Supabase clients with TypeScript support.

**Usage**:

```typescript
import { supabase, getServerSupabaseClient } from '@apphub/db';
```

### `@apphub/config`

Shared configuration, environment validation, and application constants.

**Usage**:

```typescript
import { env, validateEnv, APP_NAME } from '@apphub/config';
```

## 🛠️ Available Scripts

- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint across all packages
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm type-check` - Run TypeScript type checking

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

**Required**:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_APP_URL` - Application URL (default: <http://localhost:3000>)

**Optional**:

- `SUPABASE_SERVICE_ROLE_KEY` - For server-side admin operations

## 📚 Documentation

- [Architecture Overview](./docs/architecture.md)
- [Project Structure](./docs/project-structure.md)
- [Setup Guide](./docs/setup-guide.md)
- [Supabase Setup](./docs/supabase-setup.md)

## 🔒 Security & Operations

This project follows strict operational guidelines including:

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier enforcement
- ✅ Environment variable validation
- ✅ Production-grade error handling
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Proper 404 and 500 pages

## 📄 License

UNLICENSED - Private project

## 🤝 Contributing

This is a foundation-only setup. The project is ready to receive the AppHub PRD and feature implementation.

---

**Status**: ✅ System initialized and ready for development
