# Deployment and Setup Guide for DEV-VAULT DATA

## Project Overview

DEV-VAULT DATA is a modern, production-ready VTU (Virtual Top-Up) and Data Bundle website built with Next.js, React, Tailwind CSS, and Supabase.

## Prerequisites

Before you start, make sure you have:
- Node.js 16+ installed
- npm or yarn package manager
- Git for version control
- A Supabase account (https://supabase.com)
- A Vercel or Netlify account for deployment

## Project Structure

```
dev-vault-data/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # User dashboard
│   ├── admin/                    # Admin dashboard
│   ├── _app.tsx                  # App wrapper
│   ├── _document.tsx             # Document wrapper
│   └── index.tsx                 # Homepage
├── components/
│   ├── auth/                     # Auth components
│   ├── common/                   # Reusable components
│   ├── dashboard/                # Dashboard components
│   ├── admin/                    # Admin components
│   └── home/                     # Homepage components
├── lib/
│   ├── utils/                    # Utility functions
│   ├── supabase.ts              # Supabase configuration
│   ├── constants.ts             # App constants
│   └── store.ts                 # Zustand stores
├── public/                       # Static assets
├── styles/                       # CSS styles
├── SUPABASE_SCHEMA.sql          # Database schema
├── .env.local.example           # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd dev-vault-data
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Supabase

#### Create a Supabase Project
1. Go to https://supabase.com and create a new project
2. Wait for the project to be initialized
3. Go to Project Settings → API Keys and copy:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - `service_role` key (SUPABASE_SERVICE_ROLE_KEY)

#### Import Database Schema
1. Go to SQL Editor in Supabase
2. Create a new query
3. Copy the entire content from `SUPABASE_SCHEMA.sql`
4. Paste it in the SQL Editor and execute

#### Create Admin User
1. In Supabase Auth, create a new user with:
   - Email: `tenifayoabdulsomod@gmail.com`
   - Password: `Soomood08055861850`

2. In the `users` table, find the user and update:
   - `is_admin`: `TRUE`
   - `username`: `admin`

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Update `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Locally

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Testing the Application

### Test User Account
1. Go to http://localhost:3000/auth/signup
2. Create a test account:
   - Email: `testuser@example.com`
   - Username: `testuser`
   - Password: `TestPass@123`

### Test Admin Account
1. Go to http://localhost:3000/auth/login
2. Login with:
   - Email: `tenifayoabdulsomod@gmail.com`
   - Password: `Soomood08055861850`

### Test Features
1. **Homepage**: Browse pricing, about, and contact sections
2. **User Signup**: Create a new user account
3. **User Login**: Login with email or username
4. **Dashboard**: View wallet balance, orders, and buy data
5. **Purchase Flow**: Select a network, enter phone number, validate, and confirm
6. **Admin Dashboard**: View analytics, manage orders, search transactions

## Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done):
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `dev-vault-data` folder as root directory

3. **Add Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     NEXT_PUBLIC_APP_URL (your-domain.com)
     ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

### Deploy to Netlify

1. **Build the Project**:
```bash
npm run build
```

2. **Create `.netlify/functions` directory** for serverless functions (optional)

3. **Deploy via Netlify**:
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Add Environment Variables**:
   - In Netlify dashboard, go to Site settings → Build & deploy → Environment
   - Add all variables from `.env.local`

## Customization

### Change Branding
1. Update logo in `components/common/Navbar.tsx`
2. Update colors in `tailwind.config.ts`
3. Update content in `components/home/*`

### Update Pricing
1. Edit data plans in `lib/constants.ts`
2. Supabase will use the default data from `SUPABASE_SCHEMA.sql`

### Update Payment Info
1. Edit `MONIEPOINT_ACCOUNT_NUMBER` in `.env.local`
2. Update bank details display in modal components

### Add More Networks
1. Add network prefix in `lib/constants.ts` → `NETWORK_PREFIXES`
2. Add data plans in `DATA_PLANS`
3. Update Supabase `data_plans` table

## Security Considerations

1. **Never commit `.env.local`** - Use `.env.local.example` as template
2. **Use strong admin password** - Change default admin credentials
3. **Enable RLS** - Row Level Security is enabled by default
4. **Validate inputs** - All inputs are validated on frontend and backend
5. **Use HTTPS** - Always use HTTPS in production
6. **Rate limiting** - Implement rate limiting on payment endpoints
7. **Audit logs** - Check `admin_logs` table for suspicious activity

## Performance Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Dynamic imports for heavy components
3. **Caching**: Cache Supabase queries with SWR or React Query
4. **CDN**: Vercel and Netlify provide global CDN
5. **Database Indexes**: Already added in schema for common queries

## Troubleshooting

### Supabase Connection Issues
- Check API keys in `.env.local`
- Verify project is in the same region
- Check Supabase project status

### Authentication Issues
- Clear browser cookies and cache
- Check auth provider settings in Supabase
- Verify email and password format

### Styling Issues
- Rebuild Tailwind: `npm run build`
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`

### Build Errors
- Update to latest Node.js version
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

## API Routes (Optional - For Backend Logic)

Create `pages/api/` directory for serverless functions:

```typescript
// pages/api/payment-webhook.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Handle payment webhook
    res.status(200).json({ success: true })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
```

## Database Migrations

For future schema changes:

1. Create a new migration file with timestamp: `001_add_new_column.sql`
2. Test locally in Supabase studio
3. Execute in production via Supabase SQL Editor

## Monitoring & Analytics

- Use Vercel Analytics for performance monitoring
- Enable Supabase logging for database insights
- Set up error tracking with Sentry (optional)

## Support & Maintenance

- Regular security updates for dependencies: `npm audit fix`
- Keep Next.js and dependencies updated
- Monitor Supabase for new features
- Regular backups of database

## License

This project is licensed under the MIT License.

## Support

For questions or issues:
- Email: support@devvault.com
- Create an issue on GitHub
- Check documentation

---

**Happy coding! 🚀**
