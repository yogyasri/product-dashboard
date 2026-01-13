Server-Rendered E-commerce Product Management Dashboard
A server-side rendered (SSR) admin dashboard built with Next.js App Router for managing products in an e-commerce system.
The project focuses on secure admin access, product CRUD, validation,cloud based images, and scalable backend architecture.

Objective
To design and implement a server-rendered admin dashboard that allows administrators to create, view, update, and delete products efficiently with strong validation and authentication.
 Key Features
 Server-Side Rendering (SSR) using Next.js App Router
 Authentication & Authorization (Admin-only access)
 Complete Product CRUD (Create, Read, Update, Delete)
 Strong input validation using Zod
 Image upload support (Cloudinary-ready)
 Dashboard metrics & charts
 Database integration using Prisma + PostgreSQL
 Secure admin onboarding & logout
 Optimized backend routes using Next.js Route Handlers

Admin (Dummy)Credentials:
Shana@gmail.com
password:admin123

demo link:https://drive.google.com/file/d/1kARNM6Q5as9pvcdVR9pvQqkU9x9Fh8AY/view?usp=sharing
User Type:
- Admin
Admin Capabilities:
- Login / Logout
- View dashboard (charts)
- Create product
- Edit product
- Delete product
- Upload product images
- View stock & sales charts
- Create another admin (admin-only)

User (Admin):
- id
- email
- password
- role (ADMIN)
- createdAt

Product:
- id
- name
- description
- price
- stock
- imageUrl
- createdAt
- UpdatedAt

Sales:
- id
- productId
- quantity
- date

Framework: Next.js (App Router)
DB: PostgreSQL
ORM: Prisma
Auth: NextAuth / JWT
Validation: Zod
Charts: Recharts
Image Storage: Cloudinary

Login flow

Admin opens /login → submits email/password.

Server checks DB → creates session/JWT → redirects to /admin/dashboard.

Middleware blocks /admin/* if no valid session (redirect back to /login).

Dashboard view (SSR)

Admin visits /admin/dashboard.

Server fetches summary data (product count, low stock items, basic sales stats) → renders HTML → sends to browser.

Product management (CRUD)

Admin opens /admin/products (list).

List page is SSR: server fetches products from DB, returns rendered table.

For create/edit:

Admin opens form (/admin/products/new or /admin/products/[id]/edit).

Form is multi-step with Zod/Yup validation on each step.

On submit → request goes to API route → server validates again → writes to DB → redirects back to products list.

Delete is usually a button that calls a DELETE API, then reloads/refetches the list.

Image upload flow

In create/edit form, admin chooses an image.

Frontend either:

Uploads directly to Cloudinary/S3 (gets back URL), or

Sends file to your API, which uploads to Cloud and saves the returned URL.

That image URL is stored in the Product record.

Charts flow

Admin goes to /admin/dashboard

Server loads aggregated data (e.g., sales per product, stock levels) and renders a page with chart components that use that data.

API validates the current user is ADMIN, then creates a new User with role ADMIN.

Logout flow

Admin clicks logout.

Session/JWT is cleared server-side and/or cookie is removed.

User is redirected to /login.
