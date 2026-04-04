# DerivSkills

DerivSkills is a role-based learning roadmap app built with Next.js, NextAuth, Prisma, and PostgreSQL.



It helps users:
- explore curated career tracks
- generate AI-assisted study plans
- track progress across roadmap subtopics
- build a richer user profile after sign-in
- capture first-time onboarding details through a step-by-step modal

## What The App Does

The app is centered around structured role roadmaps such as frontend, backend, full-stack, AI, infra, and related tracks.

Key flows:
- `Tracks Catalog`: browse available roles and open a role-specific roadmap
- `Track Detail`: inspect roadmap structure and start a track
- `My Learnings`: monitor active learning progress and analytics
- `AI Planner`: generate a personalized study plan
- `Profile`: sign in, manage personal/professional details, and review onboarding answers
- `Portfolio`: view portfolio-oriented skill data and resume link storage

## Recent Product Updates

This repo currently includes the following UX and data improvements:

- Unified text hierarchy and cleaner visual consistency across the app
- Cleaner light-themed profile page to match the rest of the product
- First-time onboarding modal shown one question at a time
- Onboarding questions now capture:
  - professional or student
  - profession, company, years of experience for professionals
  - branch and college name for students
  - where the user found the app
- Onboarding answers are saved into profile data and shown later on the profile page
- Profile page now supports richer editable professional details:
  - display name
  - role/profession
  - headline
  - company
  - location
  - bio
- Learning sync now preserves profile metadata instead of overwriting it

## Tech Stack

- `Next.js 14`
- `React 18`
- `NextAuth.js`
- `Prisma`
- `PostgreSQL`
- `Recharts`

## Project Structure

Important paths:

- [app](/Users/krishnajanaswamy/Documents/Redis/Roadmap/app): app router pages and API routes
- [components](/Users/krishnajanaswamy/Documents/Redis/Roadmap/components): shared UI and client-side logic
- [prisma/schema.prisma](/Users/krishnajanaswamy/Documents/Redis/Roadmap/prisma/schema.prisma): database schema
- [app/api/auth/[...nextauth]/route.js](/Users/krishnajanaswamy/Documents/Redis/Roadmap/app/api/auth/[...nextauth]/route.js): auth providers and session shaping
- [app/api/profile/route.js](/Users/krishnajanaswamy/Documents/Redis/Roadmap/app/api/profile/route.js): profile read/update API
- [app/api/sync/route.js](/Users/krishnajanaswamy/Documents/Redis/Roadmap/app/api/sync/route.js): learning progress sync API
- [components/WelcomeProfileModal.js](/Users/krishnajanaswamy/Documents/Redis/Roadmap/components/WelcomeProfileModal.js): first-time onboarding modal

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment files

Use [.env.example](/Users/krishnajanaswamy/Documents/Redis/Roadmap/.env.example) as the template.

Create:
- `.env.local` for local development

Required variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_with_a_secure_random_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

DATABASE_URL=your_postgres_connection_string

OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.4-mini

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM="DerivSkills <no-reply@example.com>"
```

For production, replace `NEXTAUTH_URL` with your deployed domain.

Example:

```env
NEXTAUTH_URL=https://derivskills.tech-gens.com
```

### 3. Set up the database

Generate Prisma client:

```bash
npx prisma generate
```

Apply schema to your database:

```bash
npx prisma db push
```

If you prefer migrations:

```bash
npx prisma migrate dev
```

### 4. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Auth Setup Notes

### Google OAuth

Add a Google OAuth app and configure the callback URL:

```text
http://localhost:3000/api/auth/callback/google
```

Production callback URL:

```text
https://derivskills.tech-gens.com/api/auth/callback/google
```

For deployed environments, update `NEXTAUTH_URL` and the provider callback URLs to match the real domain.

Example:

```text
https://your-domain.com/api/auth/callback/google
```

For this deployment, use:

```text
https://derivskills.tech-gens.com/api/auth/callback/google
```

## How The Onboarding Flow Works

On first visit, the app opens a small modal and asks follow-up questions one by one.

Behavior:
- If the user is not signed in, answers are temporarily stored in local storage
- If the user signs in later, local onboarding answers are synced into their saved profile
- If the user is already signed in, answers are stored in profile data immediately
- The modal does not reappear after onboarding is completed

Stored onboarding fields include:
- `userType`
- `profession`
- `company`
- `yearsExperience`
- `branch`
- `collegeName`
- `discoverySource`

## How Profile Data Is Stored

There are two kinds of profile-related data:

- `User` table fields in Prisma:
  - `name`
  - `email`
  - `image`
  - `presentRole`
- `learningData.profileDetails` JSON fields:
  - `headline`
  - `company`
  - `location`
  - `bio`
  - `userType`
  - `yearsExperience`
  - `collegeName`
  - `branch`
  - `discoverySource`
  - `onboardingCompleted`

Learning progress is synced separately through `/api/sync`, and current code preserves `profileDetails` during sync updates.

## Mock Interview Email Delivery

The `Mock Interview` page sends booking requests to `krishna.jms07@gmail.com` directly from the app.

To enable direct sending:
- configure `SMTP_HOST`
- configure `SMTP_PORT`
- configure `SMTP_USER`
- configure `SMTP_PASS`
- configure `SMTP_FROM`

Behavior:
- the app sends the booking email from the server
- the candidate email is used as `replyTo`
- signed-in users also keep the request in `learningData.mockInterviewRequests`

## Available Scripts

Run development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Current Notes

- `npm run build` currently succeeds
- During build you may still see Next.js dynamic route warnings for authenticated API routes such as `/api/profile` and `/api/sync`
- Those warnings do not currently block the build

## Security Notes

- Never commit `.env` or `.env.local`
- Rotate any OAuth secret immediately if it has been exposed
- Keep provider callback URLs aligned with `NEXTAUTH_URL`

## Suggested Next Improvements

- Add explicit `.gitignore` coverage if the repo is newly initialized
- Add a success/error toast system instead of relying only on inline messages
- Add form validation for onboarding and profile fields
- Add provider/account management to profile if needed later
# DerivSkills
