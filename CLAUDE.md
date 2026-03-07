# PROJECT: Owl I Health and Wellness Center — Full-Stack Website

## OVERVIEW
Build a complete, production-ready full-stack website for **Owl I Health and Wellness Center**, a naturopathy clinic in Tirunelveli, Tamil Nadu, India. The site must be bilingual (English/Tamil), mobile-first, SEO-optimized, and deployed on a Hostinger VPS.

Features include: public website, patient portal, admin dashboard, UPI payments, invoice generation, and PDF resource management (public library + private patient-specific charts).

**Domain:** owlihealthcare.com

---

## TECH STACK
- **Framework:** Next.js 14 (App Router) — full-stack (SSR + API routes)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Database:** PostgreSQL (self-hosted on VPS)
- **ORM:** Prisma
- **Auth:** NextAuth.js (credentials provider — email/password with bcrypt)
- **File Storage:** Local VPS filesystem (`/uploads/`) served via Next.js API routes (private files) and `/public/` (public files)
- **PDF Generation:** `@react-pdf/renderer` for invoices
- **Icons:** Lucide React
- **Animations:** Framer Motion (subtle, performant)
- **Fonts:** Google Fonts — "Poppins" (English), "Noto Sans Tamil" (Tamil)
- **Process Manager:** PM2 (for running Next.js on VPS)
- **Reverse Proxy:** Nginx
- **Version Control:** Git

---

## COLOR PALETTE — "Forest Calm"
```
Primary (Headers, Nav):    #2D5A3D
Secondary (Buttons, CTA):  #5B8C5A
Light Green (Highlights):  #A8C5A0
Background (Cream):        #F4EDE4
Accent (Warm Brown):       #8B6F47
White:                     #FFFFFF
Dark Text:                 #1A1A1A
Light Text:                #6B7B6B
Error/Red:                 #D94F4F
Success/Green:             #3A8F5C
Warning/Amber:             #D4A017
```

---

## CLINIC DETAILS (Use throughout the site)
```
Name:       Owl I Health and Wellness Center
Address:    1/120G1, Vishalachi Nagar, Kondanagaram, Suthamalli, Tirunelveli - 627604
Phone:      +91 6379610554
WhatsApp:   +91 6379610554
Email:      owli2026@gmail.com
Hours:      Monday – Saturday, 9:00 AM – 9:00 PM
            Sunday: Closed (or by appointment)
Domain:     owlihealthcare.com
UPI ID:     [PLACEHOLDER — e.g., owlihealth@ybl]
```

---

## BILINGUAL SUPPORT (English / Tamil)
- Implement a language toggle (EN | தமிழ்) in the header — persistent via cookie
- Create `locales/en.json` and `locales/ta.json` with ALL public-facing text strings
- Tamil translations should feel natural, not machine-translated. Use proper medical Tamil terms
- Default language: English
- Admin dashboard: English only (no need to translate admin UI)
- Patient portal: Bilingual

---

## DATABASE SCHEMA (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  DOCTOR
  PATIENT
}

enum PaymentStatus {
  PENDING
  CONFIRMED
  FAILED
  REFUNDED
}

enum AppointmentStatus {
  REQUESTED
  CONFIRMED
  COMPLETED
  CANCELLED
}

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  phone         String    @unique
  passwordHash  String
  role          Role      @default(PATIENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  patientProfile  PatientProfile?
  doctorProfile   DoctorProfile?
}

model PatientProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  age         Int?
  gender      String?
  address     String?
  medicalNotes String?

  appointments  Appointment[]
  payments      Payment[]
  invoices      Invoice[]
  patientPdfs   PatientPdf[]
}

model DoctorProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  qualification   String
  specialization  String
  experience      String
  bio             String?
  photoUrl        String?

  appointments    Appointment[]
}

model Service {
  id          String   @id @default(cuid())
  name        String
  nameTamil   String
  slug        String   @unique
  description String
  descriptionTamil String
  icon        String
  category    String   // "core" | "specialized"
  duration    String
  price       Float?
  isActive    Boolean  @default(true)

  appointments Appointment[]
  invoiceItems InvoiceItem[]
}

model Appointment {
  id          String            @id @default(cuid())
  patientId   String
  patient     PatientProfile    @relation(fields: [patientId], references: [id])
  doctorId    String?
  doctor      DoctorProfile?    @relation(fields: [doctorId], references: [id])
  serviceId   String
  service     Service           @relation(fields: [serviceId], references: [id])
  date        DateTime
  timeSlot    String            // "9AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"
  status      AppointmentStatus @default(REQUESTED)
  notes       String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

model Payment {
  id              String        @id @default(cuid())
  patientId       String
  patient         PatientProfile @relation(fields: [patientId], references: [id])
  amount          Float
  upiTransactionId String?
  status          PaymentStatus @default(PENDING)
  method          String        @default("UPI")
  notes           String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  invoice         Invoice?
}

model Invoice {
  id            String         @id @default(cuid())
  invoiceNumber String         @unique  // Format: OWLI-2026-0001
  patientId     String
  patient       PatientProfile @relation(fields: [patientId], references: [id])
  paymentId     String?        @unique
  payment       Payment?       @relation(fields: [paymentId], references: [id])
  subtotal      Float
  tax           Float          @default(0)
  total         Float
  notes         String?
  isManual      Boolean        @default(false)
  createdAt     DateTime       @default(now())

  items         InvoiceItem[]
}

model InvoiceItem {
  id          String   @id @default(cuid())
  invoiceId   String
  invoice     Invoice  @relation(fields: [invoiceId], references: [id])
  serviceId   String?
  service     Service? @relation(fields: [serviceId], references: [id])
  description String
  quantity    Int      @default(1)
  unitPrice   Float
  total       Float
}

model PublicPdf {
  id          String   @id @default(cuid())
  title       String
  titleTamil  String
  category    String   // "diet" | "yoga" | "exercise" | "lifestyle"
  description String?
  fileName    String
  filePath    String
  fileSize    Int
  downloads   Int      @default(0)
  isActive    Boolean  @default(true)
  uploadedAt  DateTime @default(now())
}

model PatientPdf {
  id          String         @id @default(cuid())
  patientId   String
  patient     PatientProfile @relation(fields: [patientId], references: [id])
  title       String
  category    String         // "diet-chart" | "yoga-chart" | "prescription" | "report"
  fileName    String
  filePath    String
  fileSize    Int
  notes       String?
  uploadedBy  String         // doctor/admin user ID
  uploadedAt  DateTime       @default(now())
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  titleTamil  String
  slug        String   @unique
  excerpt     String
  excerptTamil String
  content     String
  contentTamil String
  category    String   // "treatments" | "wellness" | "nutrition" | "yoga"
  coverImage  String?
  isPublished Boolean  @default(true)
  publishedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Testimonial {
  id          String   @id @default(cuid())
  patientName String
  treatment   String
  content     String
  contentTamil String?
  rating      Int      @default(5)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
}
```

---

## AUTHENTICATION & AUTHORIZATION

### Roles
- **ADMIN:** Full access — manage patients, doctors, services, PDFs, invoices, payments, blog, testimonials
- **DOCTOR:** View assigned appointments, upload patient-specific PDFs, view patient profiles
- **PATIENT:** View own appointments, payments, invoices, download own PDFs, access public PDF library

### Auth Flow
- NextAuth.js with Credentials provider (email + password)
- Passwords hashed with bcrypt (min 12 rounds)
- JWT session strategy (for VPS, no external session store needed)
- Admin creates first account via seed script; admin can then create doctor/patient accounts
- Patients can self-register (name, email, phone, password) — auto-assigned PATIENT role
- Protected routes via middleware:
  - `/admin/*` → ADMIN only
  - `/doctor/*` → DOCTOR only
  - `/portal/*` → PATIENT only
  - `/api/admin/*` → ADMIN only
  - `/api/doctor/*` → DOCTOR only
  - `/api/patient/*` → PATIENT only

### Login Pages
- `/login` — unified login page with role-based redirect after auth
- `/register` — patient self-registration
- `/forgot-password` — password reset via email (use nodemailer with Gmail SMTP)

---

## SITE STRUCTURE & PAGES

---

### PUBLIC PAGES (No auth required)

#### 1. HOME PAGE (`/`)
**Sections in order:**

**a) Hero Section**
- Full-width background image (placeholder nature/wellness — 1920x800)
- Overlay heading: "Heal Naturally. Live Fully." / Tamil equivalent
- Subheading: Brief clinic intro (2 lines)
- Two CTA buttons: "Book Appointment" (primary) + "Explore Services" (outline)
- Subtle fade-in animation

**b) About Preview**
- Short paragraph about clinic philosophy (naturopathy, holistic, drug-free)
- Photo placeholder (clinic interior)
- "Learn More →" link

**c) Services Overview**
- Grid of 6-8 key services as cards with icons
- Each card: Icon + Service Name + 1-line description + hover animation
- "View All Services →" link

**d) Why Choose Us**
- 4 differentiators (icon + text):
  - Experienced BNYS Doctors
  - 100% Natural Treatments
  - Personalized Care Plans
  - Affordable Wellness
- Light green (#A8C5A0) background section

**e) Testimonials Carousel**
- Auto-rotating carousel with manual controls
- Each slide: Quote, Patient name, Treatment type, Star rating
- Data from database (seeded with 5 placeholders)

**f) Blog Preview**
- Latest 3 blog posts as cards
- "Visit Blog →" button

**g) CTA Banner**
- Full-width #2D5A3D background
- "Ready to Start Your Natural Healing Journey?"
- "Book Appointment" + "Call Now" buttons

**h) Google Map Embed**
- Embed Google Maps for clinic address
- Contact info alongside

---

#### 2. ABOUT PAGE (`/about`)
- Clinic story and philosophy
- Vision & Mission statements
- Photo gallery placeholder
- Timeline (Founded 2026, etc.)

---

#### 3. SERVICES PAGE (`/services`)
Services loaded from database. Seed with these:

**Core Treatments:**
1. **Hydrotherapy** — Hip bath, Spinal bath, Steam bath, Enema therapy
2. **Mud Therapy** — Mud pack, Mud bath, Clay applications
3. **Diet Therapy / Nutrition Counseling** — Therapeutic fasting, Detox diets, Personalized meal plans
4. **Massage Therapy** — Full body oil massage, Therapeutic massage, Reflexology
5. **Yoga Therapy** — Asanas, Pranayama, Meditation, Therapeutic yoga
6. **Acupuncture / Acupressure** — Pain management, Meridian therapy
7. **Magnetotherapy** — Magnetic field therapy for chronic pain
8. **Chromo Therapy (Color Therapy)** — Light and color-based healing

**Specialized Programs:**
9. **Detox & Panchakarma Programs** — 7-day, 14-day, 21-day packages
10. **Weight Management Program** — Diet + Exercise + Therapy combo
11. **Stress & Anxiety Management** — Yoga + Counseling + Relaxation therapies
12. **Chronic Pain Management** — Back pain, Arthritis, Migraine
13. **Women's Wellness** — PCOS, Menstrual health, Prenatal care
14. **Skin & Hair Care** — Natural treatments for eczema, psoriasis, hair fall
15. **Diabetes & Lifestyle Disease Management**

Each service: Icon, Description (3-4 sentences), Key benefits, Duration, "Book This Service" CTA. Include both English and Tamil content.

---

#### 4. DOCTORS PAGE (`/doctors`)
Loaded from database. Seed with 2-3 placeholders:

- Dr. [Name] — Chief Naturopathy Physician, BNYS, 8+ yrs
- Dr. [Name] — Yoga & Rehabilitation Specialist, BNYS, 5+ yrs
- Dr. [Name] — Nutrition & Diet Therapist, BNYS + MSc, 4+ yrs

Each: Photo placeholder, Name, Qualifications, Experience, Specialization, Bio.

---

#### 5. BLOG PAGE (`/blog` and `/blog/[slug]`)
- Grid layout with category filter
- Seed 6 placeholder articles (400-600 words each, bilingual):
  1. "5 Benefits of Hydrotherapy You Didn't Know"
  2. "Mud Therapy: Ancient Healing for Modern Ailments"
  3. "How Naturopathy Can Help Manage Diabetes Naturally"
  4. "Yoga Asanas for Back Pain Relief"
  5. "Detox Diet: A Beginner's Guide"
  6. "Why Natural Healing is the Future of Medicine"
- Categories: Treatments, Wellness Tips, Nutrition, Yoga

---

#### 6. RESOURCE LIBRARY (`/resources`)
- Grid of downloadable public PDFs (diet charts, yoga routines, lifestyle guides)
- Filter by category: Diet, Yoga, Exercise, Lifestyle
- Each card: Title, Description, Category tag, File size, Download count, Download button
- Data from `PublicPdf` table
- Seed with 4-5 placeholder entries (actual PDFs to be uploaded later by admin)

---

#### 7. APPOINTMENT BOOKING (`/book`)
- Multi-step form:
  - **Step 1:** Select Service (from database)
  - **Step 2:** Preferred Date & Time slot (date picker + slots: 9AM-12PM, 12PM-3PM, 3PM-6PM, 6PM-9PM)
  - **Step 3:** Patient Details — if logged in, auto-fill; if not, collect Name, Phone, Email, Message
  - **Step 4:** Confirmation summary
- On submit:
  - If logged in → create Appointment record in DB + send WhatsApp notification link
  - If not logged in → generate WhatsApp message link with details pre-filled
- Form validation with clear error messages

---

#### 8. CONTACT PAGE (`/contact`)
- Contact form (Name, Email, Phone, Message) → sends email via Nodemailer + WhatsApp link
- Google Maps embed
- Clickable Phone, WhatsApp, Email links
- Working hours display

---

#### 9. GALLERY PAGE (`/gallery`)
- Masonry/grid layout
- Categories: Clinic, Therapy Rooms, Treatments, Events
- Lightbox on click
- Placeholder images with descriptive comments

---

#### 10. AUTH PAGES
- `/login` — Email + Password, role-based redirect
- `/register` — Patient self-registration (Name, Email, Phone, Password, Confirm Password)
- `/forgot-password` — Email-based reset flow

---

### PATIENT PORTAL (`/portal/*` — PATIENT role required)

#### `/portal` — Dashboard
- Welcome message with name
- Upcoming appointments summary
- Recent invoices
- Quick links: My PDFs, Book Appointment, Payment History

#### `/portal/appointments`
- List of all appointments (upcoming & past)
- Status badges (Requested, Confirmed, Completed, Cancelled)
- "Book New" button

#### `/portal/pdfs`
- **My Charts** tab: Patient-specific PDFs uploaded by doctor/admin (diet charts, yoga charts, prescriptions)
- **Resource Library** tab: Link to public PDF library
- Download button for each PDF
- Category filter

#### `/portal/payments`
- Payment history table: Date, Amount, Status, Transaction ID
- Link to related invoice for each payment

#### `/portal/invoices`
- List of all invoices
- Each row: Invoice #, Date, Total, Status
- "View / Download PDF" button for each
- Invoice PDF generated client-side using `@react-pdf/renderer`

#### `/portal/profile`
- View/edit: Name, Phone, Email, Address, Age, Gender
- Change password

---

### ADMIN DASHBOARD (`/admin/*` — ADMIN role required)

Use a clean sidebar layout with navigation:

#### `/admin` — Dashboard
- Stats cards: Total Patients, Appointments Today, Revenue This Month, Pending Payments
- Recent appointments list
- Quick action buttons

#### `/admin/patients`
- Searchable, paginated patient list
- Click to view patient detail:
  - Profile info
  - Appointment history
  - Payment history
  - Uploaded PDFs
  - "Upload PDF" button (for patient-specific charts)
  - "Create Invoice" button

#### `/admin/appointments`
- Calendar view + list view toggle
- Filter by: Status, Doctor, Date range
- Update status (Confirm, Complete, Cancel)
- Assign doctor to appointment

#### `/admin/services`
- CRUD for services (Create, Read, Update, Delete)
- Toggle active/inactive
- Edit pricing, descriptions (English + Tamil)

#### `/admin/doctors`
- Manage doctor profiles
- Create doctor user accounts

#### `/admin/payments`
- All payments list with filters
- Manually confirm pending UPI payments (admin verifies payment received, clicks "Confirm")
- Payment status updates

#### `/admin/invoices`
- All invoices list
- **Auto-generated invoices:** Created when admin confirms a payment
- **Manual invoice creation:** Form with:
  - Select patient
  - Add line items (select service or custom description + amount)
  - Tax calculation (optional GST)
  - Notes field
  - Generate → saves to DB + produces downloadable PDF
- Invoice number auto-incremented: OWLI-2026-0001, OWLI-2026-0002, etc.

#### `/admin/pdfs`
- **Public Library Management:**
  - Upload new public PDFs (Diet charts, Yoga routines, etc.)
  - Edit title, description, category (English + Tamil)
  - Toggle active/inactive
  - View download stats
- **Patient PDFs:**
  - Upload PDFs for specific patients
  - Select patient → Select category (Diet Chart, Yoga Chart, Prescription, Report) → Upload file → Add notes
  - View all patient-specific uploads

#### `/admin/blog`
- CRUD for blog posts
- Rich text or Markdown editor
- English + Tamil content fields
- Publish/unpublish toggle
- Cover image upload

#### `/admin/testimonials`
- CRUD for testimonials
- Toggle active/inactive

#### `/admin/settings`
- Update clinic info (name, address, phone, email, hours)
- Update UPI ID for payments
- Site settings

---

### DOCTOR PORTAL (`/doctor/*` — DOCTOR role required)

#### `/doctor` — Dashboard
- Today's appointments
- Upcoming schedule

#### `/doctor/appointments`
- View assigned appointments
- Mark as completed
- Add notes

#### `/doctor/patients`
- View assigned patient profiles
- Upload patient-specific PDFs (diet/yoga charts)

---

## PAYMENTS SYSTEM

### UPI Payment Flow
1. Admin/patient initiates a payment for a specific amount
2. System generates:
   - **Desktop:** UPI QR code image (using `qrcode` npm package) encoding `upi://pay?pa=[UPI_ID]&pn=Owl I Healthcare&am=[AMOUNT]&cu=INR&tn=[DESCRIPTION]`
   - **Mobile:** UPI deep link button that opens PhonePe/GPay/Paytm: `upi://pay?pa=[UPI_ID]&pn=Owl I Healthcare&am=[AMOUNT]&cu=INR&tn=[DESCRIPTION]`
3. Detect device: Show QR on desktop, deep link button on mobile, show both as fallback
4. After patient pays:
   - Patient enters UPI Transaction ID / Reference Number in a confirmation field
   - Payment status set to PENDING
   - Admin manually verifies in bank/PhonePe → confirms payment in admin panel
5. On admin confirmation:
   - Payment status → CONFIRMED
   - Auto-generate invoice (if enabled)
   - Patient gets notification (in portal)

### Payment Page (`/pay/[paymentId]` or `/portal/pay`)
- Shows: Amount, Description, Clinic UPI ID
- QR code (desktop) / UPI deep link button (mobile)
- "I've completed the payment" button → form to enter UPI transaction reference
- Confirmation message after submission

---

## INVOICE SYSTEM

### Auto-Generated Invoice (after payment confirmation)
- Triggered when admin confirms a payment
- Pulls: Patient info, Payment details, Associated services
- Auto-assigns next invoice number

### Manual Invoice (admin creates)
- Select patient, add line items, optional tax, notes
- Save to database
- Generate PDF

### Invoice PDF Template (using @react-pdf/renderer)
```
+--------------------------------------------------+
| OWL I HEALTH AND WELLNESS CENTER          LOGO   |
| 1/120G1, Vishalachi Nagar...                     |
| Phone: +91 6379610554 | Email: owli2026@...      |
+--------------------------------------------------+
| INVOICE                                          |
| Invoice #: OWLI-2026-0001                        |
| Date: DD/MM/YYYY                                 |
| Patient: [Name]    Phone: [Phone]                |
+--------------------------------------------------+
| # | Description          | Qty | Rate  | Amount |
|---|----------------------|-----|-------|--------|
| 1 | Hydrotherapy Session | 1   | ₹500  | ₹500   |
| 2 | Yoga Therapy         | 3   | ₹300  | ₹900   |
+--------------------------------------------------+
|                          Subtotal:      ₹1,400   |
|                          Tax (GST 18%): ₹252     |
|                          TOTAL:         ₹1,652   |
+--------------------------------------------------+
| Payment Method: UPI                              |
| Transaction ID: XXXXXXXXXXXX                     |
| Status: PAID                                     |
+--------------------------------------------------+
| Thank you for choosing natural healing!          |
+--------------------------------------------------+
```

---

## PDF UPLOAD & MANAGEMENT

### Public PDF Library
- Admin uploads via `/admin/pdfs`
- Files stored in: `/uploads/public-pdfs/[filename]`
- Served via API route with download tracking
- Accessible to everyone on `/resources` page

### Patient-Specific PDFs
- Doctor/Admin uploads via patient detail page
- Files stored in: `/uploads/patient-pdfs/[patientId]/[filename]`
- Served via authenticated API route (only the patient + admin + assigned doctor can access)
- Patients access via `/portal/pdfs`

### Upload API Routes
- `POST /api/admin/pdfs/public` — upload public PDF (multipart form, max 10MB)
- `POST /api/admin/pdfs/patient` — upload patient PDF (multipart form, max 10MB)
- `GET /api/pdfs/public/[id]/download` — download public PDF (increment counter)
- `GET /api/pdfs/patient/[id]/download` — download patient PDF (auth required, ownership check)

---

## GLOBAL COMPONENTS

### Header / Navigation
- Logo: Text-based "Owl I" with leaf/owl SVG icon
- Nav: Home, About, Services, Doctors, Resources, Blog, Gallery, Contact
- "Book Now" CTA button (#5B8C5A)
- Language toggle: EN | தமிழ்
- Auth buttons: Login / Register (when logged out) | Portal / Logout (when logged in)
- Mobile: Hamburger menu with slide-in drawer
- Sticky on scroll with shadow

### Footer
- 4-column: About + Social | Quick Links | Services | Contact + Hours
- Copyright © 2026 Owl I Health and Wellness Center
- Dark green (#2D5A3D) background

### WhatsApp Floating Button
- Fixed bottom-right, green icon with pulse animation
- `https://wa.me/916379610554?text=Hi! I'd like to enquire about your services.`
- Tooltip: "Chat with us"

---

## SEO & PERFORMANCE

### Meta Tags (every public page)
- Unique title & description
- Open Graph + Twitter Card tags
- Canonical URLs
- JSON-LD structured data: LocalBusiness, MedicalBusiness, BreadcrumbList, FAQPage

### Performance
- `next/image` with lazy loading, blur placeholders
- Minimize bundle size
- Core Web Vitals optimized
- Proper heading hierarchy

### Sitemap & Robots
- Auto-generated `sitemap.xml` (public pages + blog posts)
- `robots.txt` — disallow `/admin/*`, `/portal/*`, `/doctor/*`, `/api/*`

---

## ACCESSIBILITY
- ARIA labels on interactive elements
- Keyboard navigable
- WCAG AA color contrast
- Alt text on all images
- Focus indicators
- Skip to main content link

---

## FILE STRUCTURE
```
owli-healthcare/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                    # Seeds services, doctors, blog, testimonials
│   └── migrations/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── doctors/
│   │   ├── gallery/
│   │   ├── blog/
│   │   └── logo.svg
│   ├── favicon.ico
│   └── robots.txt
├── uploads/                        # Git-ignored, created at runtime
│   ├── public-pdfs/
│   └── patient-pdfs/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── doctors/page.tsx
│   │   ├── resources/page.tsx     # Public PDF library
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── book/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   │
│   │   ├── portal/                # Patient Portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── appointments/page.tsx
│   │   │   ├── pdfs/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   ├── invoices/page.tsx
│   │   │   ├── pay/page.tsx
│   │   │   └── profile/page.tsx
│   │   │
│   │   ├── admin/                 # Admin Dashboard
│   │   │   ├── layout.tsx         # Sidebar layout
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── patients/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── appointments/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── doctors/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   ├── invoices/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/page.tsx
│   │   │   ├── pdfs/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── testimonials/page.tsx
│   │   │   └── settings/page.tsx
│   │   │
│   │   ├── doctor/                # Doctor Portal
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── appointments/page.tsx
│   │   │   └── patients/
│   │   │       ├── page.tsx
│   │   │       └── [id]/page.tsx
│   │   │
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── admin/
│   │       │   ├── patients/route.ts
│   │       │   ├── appointments/route.ts
│   │       │   ├── services/route.ts
│   │       │   ├── payments/route.ts
│   │       │   ├── invoices/route.ts
│   │       │   ├── pdfs/
│   │       │   │   ├── public/route.ts
│   │       │   │   └── patient/route.ts
│   │       │   ├── blog/route.ts
│   │       │   ├── testimonials/route.ts
│   │       │   └── settings/route.ts
│   │       ├── doctor/
│   │       │   ├── appointments/route.ts
│   │       │   └── patients/route.ts
│   │       ├── patient/
│   │       │   ├── appointments/route.ts
│   │       │   ├── payments/route.ts
│   │       │   ├── invoices/route.ts
│   │       │   └── pdfs/route.ts
│   │       ├── pdfs/
│   │       │   ├── public/[id]/download/route.ts
│   │       │   └── patient/[id]/download/route.ts
│   │       ├── book/route.ts
│   │       ├── contact/route.ts
│   │       └── upi/generate-qr/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── PortalNav.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   └── CTABanner.tsx
│   │   ├── booking/
│   │   │   └── BookingForm.tsx
│   │   ├── payment/
│   │   │   ├── UpiQrCode.tsx
│   │   │   └── UpiDeepLink.tsx
│   │   ├── invoice/
│   │   │   ├── InvoicePdf.tsx      # @react-pdf/renderer template
│   │   │   └── InvoiceForm.tsx
│   │   ├── pdf/
│   │   │   ├── PdfUploader.tsx
│   │   │   └── PdfCard.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       ├── DataTable.tsx
│   │       ├── FileUpload.tsx
│   │       ├── SectionTitle.tsx
│   │       └── StatusBadge.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── auth.ts                # NextAuth config
│   │   ├── i18n.ts                # Language context & hook
│   │   ├── upi.ts                 # UPI QR & deep link generation
│   │   ├── invoice.ts             # Invoice number generation
│   │   ├── upload.ts              # File upload helpers
│   │   └── constants.ts           # Clinic info, enums
│   │
│   ├── locales/
│   │   ├── en.json
│   │   └── ta.json
│   │
│   └── styles/
│       └── globals.css
│
├── .env.example                    # Document all required env vars
├── .gitignore                      # Include: node_modules, .env, uploads/, .next/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── ecosystem.config.js             # PM2 config
├── nginx.conf.example              # Nginx reverse proxy config
└── README.md
```

---

## ENVIRONMENT VARIABLES (.env.example)
```env
# Database
DATABASE_URL="postgresql://owli_user:your_password@localhost:5432/owli_healthcare"

# NextAuth
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="https://owlihealthcare.com"

# Email (for contact form & password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="owli2026@gmail.com"
SMTP_PASS="your-app-password"

# UPI
UPI_ID="owlihealth@ybl"
UPI_MERCHANT_NAME="Owl I Healthcare"

# Admin Seed
ADMIN_EMAIL="owli2026@gmail.com"
ADMIN_PASSWORD="change-this-on-first-login"
ADMIN_NAME="Admin"
ADMIN_PHONE="6379610554"

# Upload
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_DIR="./uploads"
```

---

## SEED SCRIPT (`prisma/seed.ts`)
Seed the database with:
1. Admin user account (from env vars)
2. All 15 services (English + Tamil)
3. 2-3 placeholder doctor profiles
4. 6 blog posts with full content (English + Tamil)
5. 5 placeholder testimonials
6. Sample public PDF entries (file references only — actual PDFs uploaded later)

---

## VPS DEPLOYMENT (include in README.md)

### Hostinger VPS Setup
```bash
# 1. SSH into VPS
ssh root@your-vps-ip

# 2. Install Node.js 20, PostgreSQL, Nginx, PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs postgresql nginx
npm install -g pm2

# 3. Setup PostgreSQL
sudo -u postgres createuser owli_user --pwprompt
sudo -u postgres createdb owli_healthcare --owner=owli_user

# 4. Clone repo
cd /var/www
git clone <your-repo-url> owli-healthcare
cd owli-healthcare

# 5. Install deps & setup
npm install
cp .env.example .env   # Edit with real values
npx prisma migrate deploy
npx prisma db seed

# 6. Build & start
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 7. Nginx config
cp nginx.conf.example /etc/nginx/sites-available/owlihealthcare.com
ln -s /etc/nginx/sites-available/owlihealthcare.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 8. SSL via Let's Encrypt
apt install certbot python3-certbot-nginx
certbot --nginx -d owlihealthcare.com -d www.owlihealthcare.com
```

### Nginx Config (nginx.conf.example)
```nginx
server {
    listen 80;
    server_name owlihealthcare.com www.owlihealthcare.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
}
```

### PM2 Config (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'owli-healthcare',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/owli-healthcare',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

---

## IMPORTANT INSTRUCTIONS FOR CLAUDE CODE

1. **Build the COMPLETE site** — every page, every component, every API route. No TODOs or placeholders in code logic.
2. **All public-facing text** must exist in BOTH `en.json` and `ta.json`. No hardcoded strings on public pages.
3. Use **semantic HTML** throughout.
4. Every placeholder image should have a **descriptive comment** for what to replace it with.
5. **Validate all forms** with helpful error messages.
6. **Secure all API routes** with proper auth checks and role verification.
7. **Handle file uploads safely** — validate file type (PDF only), size limits, sanitize filenames.
8. **Invoice numbers** must be sequential and never duplicate.
9. Test that `npm run build` completes without errors.
10. Initialize git repo with proper `.gitignore` and first commit after setup.
11. Keep code **clean, well-commented, and maintainable**.
12. Include a comprehensive **README.md** with setup, deployment, and usage instructions.
13. All placeholder content (doctor names, photos, testimonials) must be clearly marked with `[PLACEHOLDER]` comments.

---

## PHASED BUILD ORDER (Suggested)
To avoid context overflow, build in this order:

**Phase 1:** Project setup, database schema, auth, layout components (Header, Footer, WhatsApp button)
**Phase 2:** All public pages (Home, About, Services, Doctors, Blog, Gallery, Contact, Resources)
**Phase 3:** Patient portal (Dashboard, Appointments, PDFs, Payments, Invoices, Profile)
**Phase 4:** Admin dashboard (all admin pages + CRUD operations)
**Phase 5:** Doctor portal
**Phase 6:** Payment system (UPI QR/deep link, payment flow, auto-invoice)
**Phase 7:** PDF upload/download system (public + patient-specific)
**Phase 8:** SEO, sitemap, final polish, seed script, deployment configs
