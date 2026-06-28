# Mini SaaS Dashboard

A full-stack project management dashboard built with **Next.js**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**.

The application allows users to create, manage, search, filter, update, and delete projects through a responsive dashboard interface.

---

## Features

### Dashboard

- View all projects
- Search projects by name
- Filter projects by status
- Sort projects
- Dashboard statistics
- Responsive layout

### Project Management

- Create new projects
- Edit existing projects
- Delete projects with confirmation dialog
- Form validation with Zod
- Toast notifications for user feedback

### Backend

- RESTful API built with Next.js Route Handlers
- PostgreSQL database
- Prisma ORM
- Server-side filtering and sorting

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Sonner

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL

---

## Project Structure

```text
src/
├── app/
│   ├── api/
│   └── page.tsx
│
├── components/
│
├── hooks/
│   ├── useDebounce.ts
│   └── useProjects.ts
│
├── lib/
│   ├── api.ts
│   └── prisma.ts
│
├── schemas/
│
└── types/

prisma/
├── schema.prisma
└── seed.ts
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mini_saas_dashboard"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Generate the Prisma Client

```bash
npx prisma generate
```

### 6. Seed the database

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

## Usage

Once the application is running, you can:

- Create new projects
- Edit existing projects
- Delete projects
- Search projects by name
- Filter by project status
- Sort projects
- View dashboard statistics

---

## API

The application exposes REST endpoints under:

```
/api/projects
```

Supported operations include:

- GET
- POST
- PUT
- DELETE

Filtering, searching, and sorting are supported through query parameters.

---

## Architecture

The project follows a component-based architecture:

- **UI components** are responsible for rendering.
- **Custom hooks** (`useProjects`) encapsulate data fetching and CRUD operations.
- **API utilities** centralize communication with the backend.
- **Prisma** manages database access.

This separation of concerns keeps the UI focused on presentation while business logic remains reusable and maintainable.

---

## Future Improvements

- Authentication and user accounts
- Pagination
- Optimistic UI updates
- Unit and integration testing
- Role-based permissions
- Docker support
