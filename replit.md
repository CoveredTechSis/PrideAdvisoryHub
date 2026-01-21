# Pride Advisory

## Overview

Pride Advisory is a Nigerian investment advisory web application targeting institutional and individual investors. The platform provides equity and fixed-income investment advisory services, featuring a marketing website with service information, performance dashboards, investment calculators, and a secure client portal for document management and account access.

The application is built as a full-stack TypeScript monorepo with React on the frontend and Express on the backend, using PostgreSQL for data persistence.



## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side navigation (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables for light/dark theme support
- **Charts**: Recharts for performance visualization and data charts
- **File Upload**: Uppy with AWS S3/presigned URL support for document uploads

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Replit Auth (OpenID Connect) with Passport.js, session-based with PostgreSQL session storage
- **File Storage**: Google Cloud Storage via presigned URLs for secure file uploads
- **API Design**: RESTful endpoints under `/api/` prefix

### Database Schema
Key tables managed by Drizzle ORM:
- `users` and `sessions` - Authentication and session management (required for Replit Auth)
- `contacts` - Contact form submissions
- `newsletters` - Newsletter subscriptions
- `documents` - Client document uploads (KYC materials)
- `appointments` - Consultation scheduling
- `blogPosts` and `whitepapers` - Content management

### Project Structure
```
├── client/src/          # React frontend application
│   ├── components/      # UI components (sections, layout, ui primitives)
│   ├── hooks/           # Custom React hooks (auth, upload, toast)
│   ├── pages/           # Page components (Home, ClientPortal)
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── replit_integrations/  # Auth and object storage modules
│   └── routes.ts        # API route definitions
├── shared/              # Shared types and database schema
│   ├── schema.ts        # Drizzle table definitions
│   └── models/          # Auth-related models
└── migrations/          # Drizzle database migrations
```

### Design System
The application follows a hybrid design approach combining Material Design foundations with fintech-inspired aesthetics. Key design decisions:
- Typography: Inter for UI text, JetBrains Mono for financial data display
- Color scheme: White/Black/Gold theme with CSS custom properties for theming
- Component styling: Consistent border-radius, elevation patterns, and spacing primitives

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and queries with `drizzle-kit` for migrations

### Authentication
- **Replit Auth**: OpenID Connect-based authentication
- **Required Environment Variables**: `SESSION_SECRET`, `ISSUER_URL`, `REPL_ID`

### File Storage
- **Google Cloud Storage**: Object storage for document uploads via `@google-cloud/storage`
- Presigned URL pattern for secure direct uploads from browser

### Third-Party Integrations
- **Uppy**: File upload widget with dashboard UI
- **React Icons**: Icon library including social media icons
- **date-fns**: Date formatting and manipulation
- **Zod**: Schema validation for API inputs