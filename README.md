Build an admin-only product management dashboard using Next.js with server-side rendering, secure authentication, product CRUD operations, cloud-based image uploads, and analytics dashboards.

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

Every /admin/* page should check that the current user is logged in and has role ADMIN; otherwise redirect to login.

Only ADMIN users can hit product CRUD APIs (create, update, delete, even list if it’s an internal API).

The “Create Admin” (onboarding) page itself must be inside /admin and double-check the user is an admin before allowing creation.

All backend API handlers must verify the session/role; never trust only the frontend.

Before uploading or saving any image, validate type (e.g., jpeg/png), size, and maybe dimensions.

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
