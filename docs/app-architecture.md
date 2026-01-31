# AppHub Frontend Architecture

## 1. App Shell Strategy

We use Next.js **Route Groups** to implement distinct "App Shells" for different sections of the application, ensuring a persistent, mobile-app-like experience.

### Directory Structure

```text
app/
├── (website)/          # Public Website Route Group
│   ├── layout.tsx      # Website Shell (Nav + TabBar)
│   ├── page.tsx        # Homepage
│   ├── apps/           # Apps listing
│   └── category/       # Category filtering
├── admin/              # Admin Panel
│   ├── layout.tsx      # Admin Shell (Admin Nav)
│   ├── dashboard/      # Admin Menu
│   └── profile/        # Admin Profile
└── layout.tsx          # Root Layout (HTML/CSS only)
```

## 2. Shells

### A. Root Shell (`app/layout.tsx`)

- **Responsibility:** Global CSS, Fonts, Metadata, SEO/JSON-LD.
- **Content:** `<html><body>...</body></html>`

### B. Website Shell (`app/(website)/layout.tsx`)

- **Target:** Public users.
- **Components:**
  - Fast Transitions (CSS).
  - `<NavigationBar />`: Sticky, Glassmorphism.
  - `<BottomTabBar />`: iOS Standard Mobile Navigation.

### C. Admin Shell (`app/admin/layout.tsx`)

- **Target:** Administrators.
- **Components:**
  - Admin-specific Navigation Bar (Title: "Panel", Right: "Account").
  - Secure Context.

## 3. Navigation

- **Mobile First:** Bottom Tab Bar is the primary navigation on mobile.
- **Transitions:** Pages load inside the shell without refreshing the chrome.
