# Mini SaaS Dashboard

A full-stack SaaS dashboard built with **Next.js 16**, **React 19**, **TypeScript**, **Prisma**, **PostgreSQL (Supabase)**, **NextAuth.js**, and **Tailwind CSS**.

The application provides secure authentication and a responsive dashboard that allows authenticated users to create, manage, search, filter, update, and delete projects through a modern user interface.

---

## Live Demo

**Production:** https://mini-saa-s-dashboard.vercel.app/

---

## Screenshots

### Dashboard

![Dashboard - Light Mode](docs/dashboard-light.png)
![Dashboard - Dark Mode](docs/dashboard-dark.png)

### Login

![Login](docs/login.png)

### Project Management

![Project Management](docs/projects.png)

---

## Features

### Authentication

- Secure authentication with NextAuth.js
- Session management
- Protected dashboard routes
- Prisma Adapter integration

### Dashboard

- Responsive dashboard layout
- Project statistics
- Modern UI built with shadcn/ui
- Toast notifications for user feedback

### Project Management

- Create new projects
- Edit existing projects
- Delete projects with confirmation
- Search projects by name
- Filter projects by status
- Sort projects
- Form validation with Zod

### Backend

- RESTful API using Next.js Route Handlers
- PostgreSQL database hosted on Supabase
- Prisma ORM
- Server-side filtering and sorting

### Deployment

- Production deployment on Vercel
- Docker support with multi-stage production build
- Docker Compose configuration

---

## Tech Stack

| Category           | Technologies                     |
| ------------------ | -------------------------------- |
| Frontend           | Next.js 16, React 19, TypeScript |
| Styling            | Tailwind CSS 4, shadcn/ui        |
| Forms & Validation | React Hook Form, Zod             |
| Authentication     | NextAuth.js                      |
| Database           | PostgreSQL (Supabase)            |
| ORM                | Prisma                           |
| Notifications      | Sonner                           |
| Icons              | Lucide React                     |
| Deployment         | Vercel                           |
| Containerization   | Docker, Docker Compose           |

---

## Project Structure

src/
├── app/
│ ├── api/
│ │ └── auth/
│ │ └── [...nextauth]/ # Authentication API routes
│ ├── dashboard/ # Protected dashboard pages
│ ├── login/ # Login page
│ └── page.tsx # Landing page
│
├── components/
│ ├── dashboard/ # Dashboard-specific components
│ └── ui/ # Reusable UI components
│
├── constants/ # Application constants
├── hooks/ # Custom React hooks
├── lib/ # Shared utilities
│ └── validations/ # Validation helpers
├── schemas/ # Zod schemas
├── services/ # Business logic
└── types/ # Shared TypeScript types

prisma/
├── schema.prisma
└── seed.ts

Dockerfile
docker-compose.yml
.dockerignore

````

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/fflorentini/Mini-SaaS-Dashboard
cd mini-saas-dashboard
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:ro08210268PA!!@db.dopqztukbdeansxdjcqe.supabase.co:5432/postgres?sslmode=require"
NEXTAUTH_SECRET="fflorentini2026!!"
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=c4fec43d1617c0b165cc7909d6994aad0b211713e82a9355103a75b0ce0cd391
```

### 4. Generate the Prisma Client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Seed the database (optional)

```bash
npm run seed
```

### 7. Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

To inspect the database:

```bash
npx prisma studio
```

---

## Docker

The project includes Docker support for local development and demonstration purposes.

### Build the image

```bash
docker compose build
```

### Start the application

```bash
docker compose up
```

The application will be available at:

```
http://localhost:3000
```

---

## API

The application exposes REST endpoints under:

```
/api
```

Example endpoints include:

- `/api/auth/*`
- `/api/projects`

Supported operations include:

- GET
- POST
- PUT
- DELETE

Server-side searching, filtering, sorting, and validation are supported.

---

## Architecture

The project follows a modular, component-based architecture.

- **App Router** manages application routing and layouts.
- **Next.js Route Handlers** expose backend REST endpoints.
- **Prisma ORM** manages database communication.
- **NextAuth.js** handles authentication and session management.
- **Services** encapsulate business logic.
- **Reusable UI components** built with shadcn/ui keep the interface consistent.
- **Custom hooks** manage client-side state and interactions.
- **Zod schemas** provide both client-side and server-side validation.

This separation of concerns keeps the application maintainable, scalable, and easy to extend.

---

## Future Improvements

- User registration
- Password recovery
- Role-based authorization
- Pagination
- Unit and integration testing
- Activity history
- Email notifications

---

## License

This project was developed as part of a full-stack web development assignment and is intended for educational and portfolio purposes.
