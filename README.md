This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# NoteSpace - Personal Note-taking App

A full-stack application for authenticated users to create, update, and delete personal notes.

## Tech Stack

- **Frontend**: Next.js with Tailwind CSS and shadcn/ui
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Authentication**: Keycloak

## Features

- User authentication via Keycloak
- Create, read, update, and delete notes
- Categorize notes
- Search and filter notes
- Responsive design for all devices
- Dark/light mode

## Project Structure

```
project/
├── app/                    # Next.js frontend app
│   ├── (authenticated)/    # Routes that require authentication
│   │   ├── notes/          # Notes management pages
│   │   │   ├── [id]/       # Note detail and edit pages
│   │   │   └── new/        # Create new note
│   │   └── layout.tsx      # Protected layout
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── providers.tsx       # Client providers
├── components/             # UI components
│   ├── layout/             # Layout components
│   ├── notes/              # Note-specific components
│   └── ui/                 # UI components (shadcn)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
│   ├── api.ts              # API client
│   ├── keycloak.ts         # Keycloak integration
│   └── utils.ts            # Helper utilities
├── public/                 # Static assets
├── server/                 # NestJS backend
│   ├── src/                # Source code
│   │   ├── notes/          # Notes module
│   │   │   ├── dto/        # Data transfer objects
│   │   │   ├── entities/   # Database entities
│   │   │   ├── notes.controller.ts
│   │   │   ├── notes.module.ts
│   │   │   └── notes.service.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   └── package.json        # Backend dependencies
└── package.json            # Frontend dependencies
```

## Setup Instructions

### Prerequisites

- Node.js 16+ installed
- PostgreSQL database
- Keycloak server running

### Configuration

1. Create a `.env` file in the project root by copying `.env.example`
2. Configure your Keycloak connection details
3. Set up the PostgreSQL database connection

### Keycloak Setup

1. Create a new realm named `notes-app`
2. Create two clients:
   - `notes-app-client` (for the frontend)
   - `notes-app-server` (for the backend)
3. Set up appropriate roles and users

### Running the Application

1. Install frontend dependencies:
   ```
   npm install
   ```

2. Install backend dependencies:
   ```
   cd server && npm install
   ```

3. Run the frontend development server:
   ```
   npm run dev
   ```

4. Run the backend server:
   ```
   npm run nest:dev
   ```

5. Access the application at `http://localhost:3000`

## Development Guidelines

- Use TypeScript for type safety
- Follow the established component structure
- Add proper error handling
- Write meaningful commit messages
