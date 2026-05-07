# Quick Start Guide - DEV-VAULT DATA

## ⚡ 5-Minute Setup

### Step 1: Prerequisites
```bash
# Make sure you have Node.js 16+
node --version  # v16.0.0 or higher
npm --version   # 7.0.0 or higher
```

### Step 2: Clone & Install
```bash
cd dev-vault-data
npm install
```

### Step 3: Supabase Setup
1. Go to https://supabase.com
2. Create new project
3. Copy API URL and Anon Key

### Step 4: Configure
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Step 5: Database
1. In Supabase SQL Editor
2. Copy entire `SUPABASE_SCHEMA.sql`
3. Execute it

### Step 6: Run
```bash
npm run dev
```

Visit http://localhost:3000

## 🧪 Test Credentials

### Create Test Account
- Go to `/auth/signup`
- Email: test@example.com
- Username: testuser
- Password: Test@123Pass

### Login
- Email or Username: above
- Password: Test@123Pass

### Access Dashboard
- View orders and balance
- Buy data bundles

### Admin Dashboard
- Email: tenifayoabdulsomod@gmail.com
- Password: Soomood08055861850
- Go to `/admin`

## 📂 Key Files

| File | Purpose |
|------|---------|
| `app/index.tsx` | Homepage |
| `app/auth/` | Login/Signup pages |
| `app/dashboard/` | User dashboard |
| `app/admin/` | Admin dashboard |
| `lib/constants.ts` | Data plans & networks |
| `lib/utils/` | Helpers & validation |
| `.env.local` | Configuration |

## 🚀 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy .next folder
```

## 🔧 Customization

### Change Prices
Edit `lib/constants.ts` → `DATA_PLANS`

### Change Theme Colors
Edit `tailwind.config.ts` → `colors`

### Change Logo
Edit `components/common/Navbar.tsx`

### Change Payment Details
Edit `.env.local` or components

## 📚 Full Documentation

See `DEPLOYMENT_GUIDE.md` for comprehensive setup guide.

## 🐛 Common Issues

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Module Not Found
```bash
rm -rf node_modules
npm install
```

### Build Errors
```bash
npm run type-check  # Check TypeScript
npm run build       # Full build
```

## 💡 Tips

- **Hot Reload**: Changes auto-reload during `npm run dev`
- **Database**: Check Supabase dashboard for data
- **Errors**: Check browser console and terminal
- **Performance**: Use Chrome DevTools Lighthouse

## 📞 Support

- Email: support@devvault.com
- GitHub Issues: Create an issue
- Docs: Check README.md

---

**Ready to go! Happy coding! 🎉**
