# Tarek's Smart Fitness Gym & Armory

Production-grade, immersive **3D WebGL & E-Commerce Platform** built with **Next.js 14 (App Router)**, **TypeScript**, **React Three Fiber (Three.js)**, **Tailwind CSS**, **Zustand**, **Prisma**, and **NextAuth**.

Located at **Boarding Field (বোর্ডিং মাঠ), Brahmanbaria Sadar, Brahmanbaria** — uniting certified strength & StairMaster conditioning, handcrafted full-grain men's leather wallets, and single-equipment commercial gym machinery.

---

## 🌟 Core Features & Pillars

1. **Pillar 01 — Gym Sanctuary & Facility (`/gym`)**:
   - Real facility photo walkthrough with interactive zone hotspots.
   - Master Coaches: **Head Coach Tarek** (15 Years Experience) and **Coach Akash** (Senior Strength & Conditioning).
   - Filterable weekly coaching timetable & class schedule.
   - Transparent Gym Pricing:
     - **One-time Admission Fee:** ৳2,450
     - **Standard Monthly:** ৳830 / month
     - **StairMaster Included:** ৳1,200 / month
     - **VIP Personal Coaching (Trainer Tarek):** ৳6,000 / month
   - Instant 3-day digital QR member pass generator.

2. **Custom Workout Plan Generator (`/workout-generator`)**:
   - Algorithmic workout plan builder powered by 15 years of coaching wisdom from Trainer Tarek.
   - Multi-split periodization (3, 4, 5, or 6 days/week) customized for Hypertrophy, Fat Loss, Powerlifting, or Athletic Conditioning.
   - Real equipment mapping (Colossus Power Rack, Vulcan Cable Crossover, Ascent StairMaster, Juggernaut Leg Press).
   - Interactive exercise checklist with real-time completion tracking.
   - Built-in 60s/90s/120s set rest stopwatch timer.
   - Direct WhatsApp integration to send routines to Coach Tarek (`01782226189`) for 1-on-1 review.
   - Printer-friendly export & one-click clipboard copy.

3. **Pillar 02 — Heritage Leather Wallets (`/wallets`)**:
   - 24 signature full-grain leather silhouettes (Bifold, Slim, Cardholder, Travel, and RFID Faraday Series).
   - Real-time 3D monogram laser/gold-foil engraving studio with live preview.

4. **Pillar 03 — Gym Armory & Machinery (`/machinery`)**:
   - 16 commercial & garage gym machines with isolated single-equipment e-commerce photography.
   - Side-by-side 3-machine spec comparison, 3D CAD dimension overlays, and B2B bulk quote requests.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Push Prisma database schema and seed products
npm run db:push
npm run db:seed

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment to GitHub & Vercel

### Step 1: Push Code to GitHub

```bash
# 1. Add all files to staging
git add .

# 2. Create initial commit
git commit -m "Initial commit: Tarek's Smart Fitness Gym platform with 3D scenes & Workout Generator"

# 3. Rename default branch to main
git branch -M main

# 4. Link your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 5. Push to GitHub
git push -u origin main
```

### Step 2: Deploy Live for Free on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New Project"** and select your GitHub repository.
3. Keep default settings (Framework Preset: **Next.js**).
4. Add environment variables if needed (`NEXTAUTH_SECRET`, etc.).
5. Click **"Deploy"**. Your site will be live with a free SSL `.vercel.app` domain in ~2 minutes!

---

## 🛠️ Scripts Reference

- `npm run dev` — Starts Next.js development server on `localhost:3000`.
- `npm run build` — Generates Prisma client and builds production bundle.
- `npm run type-check` — Strict TypeScript verification (`tsc --noEmit`).
- `npm run lint` — Runs ESLint code style checks.
- `npm run db:push` — Syncs Prisma schema with database.
- `npm run db:seed` — Populates wallets, machinery, trainers, classes, and memberships.

---

## 📞 Contact & Inquiries

- **Head Coach:** Trainer Tarek (15 Years Experience)
- **Phone / WhatsApp:** [+880 1782-226189](https://wa.me/8801782226189)
- **Address:** Boarding Field (বোর্ডিং মাঠ), Brahmanbaria Sadar, Brahmanbaria
