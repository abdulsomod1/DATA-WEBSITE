# DEV-VAULT DATA

A modern, production-ready VTU (Virtual Top-Up) and Data Bundle website built with Next.js, React, Tailwind CSS, and Supabase.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-16+-blue)
![Next.js](https://img.shields.io/badge/next.js-14+-black)

## 🚀 Features

### User Features
- ✨ Modern, responsive UI with dark theme
- 🔐 Secure authentication (Email/Password, Username/Password)
- 💳 Easy data bundle purchase flow
- 📊 Dashboard with wallet and order tracking
- 🔔 Real-time notifications
- 📱 Mobile-friendly interface
- 💚 Support for MTN, Airtel, and GLO networks
- 🎯 Phone number validation
- 💰 Transparent pricing

### Admin Features
- 📈 Advanced analytics and charts
- 📋 Order management
- 👥 User management
- 💹 Revenue tracking
- 🔍 Search and filter transactions
- 📤 Export functionality
- 🔄 Real-time data updates
- 🎛️ System administration

### Technical Features
- ⚡ Built with Next.js 14
- 🎨 Tailwind CSS for styling
- 🎭 Framer Motion animations
- 🎯 TypeScript support
- 📦 Supabase backend
- 🔐 Row-level security (RLS)
- 🌍 Global deployment ready
- 📱 Fully responsive design

## 📋 Requirements

- Node.js 16+
- npm or yarn
- Supabase account
- Vercel or Netlify account (for deployment)

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/dev-vault-data.git
cd dev-vault-data
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase
1. Create a project at https://supabase.com
2. Copy your API keys from Project Settings
3. Run the SQL schema from `SUPABASE_SCHEMA.sql`
4. Create admin user (see DEPLOYMENT_GUIDE.md)

### 4. Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
dev-vault-data/
├── app/                 # Next.js app directory (pages & layouts)
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable UI components
│   ├── dashboard/      # User dashboard components
│   ├── admin/          # Admin dashboard components
│   └── home/           # Homepage sections
├── lib/                # Utilities and helpers
│   ├── utils/          # Validation, auth, formatting functions
│   ├── store.ts        # Zustand state management
│   ├── supabase.ts     # Supabase client configuration
│   └── constants.ts    # App constants and data plans
├── public/             # Static assets
├── styles/             # Global CSS styles
├── SUPABASE_SCHEMA.sql # Database schema
└── DEPLOYMENT_GUIDE.md # Detailed deployment instructions
```

## 🔐 Authentication

### User Authentication
- Email/Password signup
- Email/Password login
- Username/Password login
- Secure password requirements
- No email verification required
- Automatic session management

### Admin Authentication
- Same login interface
- Automatic role detection
- Admin-only routes protected
- Special admin credentials

### Credentials (Demo)
```
Admin Email: tenifayoabdulsomod@gmail.com
Admin Password: Soomood08055861850
```

## 💳 Data Plans

### Available Networks
- **MTN**: 1GB - 20GB plans
- **Airtel**: 1GB - 20GB plans
- **GLO**: 1GB - 20GB plans

### Pricing (Naira)
```
MTN Plans:
- 1GB (7 Days): ₦500
- 1GB (30 Days): ₦600
- 5GB (30 Days): ₦2,500
- 10GB (30 Days): ₦4,500

(Similar pricing for Airtel and GLO with variations)
```

## 🛒 Purchase Flow

1. **Select Network**: Choose MTN, Airtel, or GLO
2. **Enter Phone**: Validate phone number belongs to selected network
3. **Confirm**: Review order details
4. **Payment**: Transfer funds to Moniepoint account
5. **Confirmation**: Provide WhatsApp number for delivery

## 🏦 Payment Details

```
Bank: Moniepoint
Account Number: 8104151553
Account Name: ABDULSAMAD TENIFAYO HABEEBULAHI
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize theme:
```typescript
colors: {
  primary: { /* ... */ },
  dark: { /* ... */ }
}
```

### Branding
- Logo: `components/common/Navbar.tsx`
- Metadata: `app/_document.tsx`
- Content: `components/home/*`

### Pricing
Update `lib/constants.ts` and Supabase `data_plans` table

## 📊 Admin Dashboard

Access at `/admin` (admin only)

Features:
- Total users, orders, revenue metrics
- Orders line chart
- Revenue bar chart
- Transaction search and filter
- Bulk order management
- Export functionality
- Real-time updates

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy .next folder
```

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🔒 Security Features

- ✅ Row-level security (RLS) enabled
- ✅ Input validation on frontend & backend
- ✅ Secure password hashing
- ✅ Environment variables for secrets
- ✅ CORS protection
- ✅ SQL injection prevention
- ✅ XSS protection via Next.js
- ✅ CSRF tokens (built-in)

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## ⚡ Performance

- Next.js automatic code splitting
- Image optimization
- CSS minification
- Supabase query caching
- Global CDN deployment
- Lighthouse score: 90+

## 🧪 Testing

### Manual Testing
1. Create user account
2. Login with email and username
3. Purchase data bundle
4. View admin dashboard
5. Verify email notifications

### Recommended Tools
- Jest for unit tests
- Cypress for e2e tests
- Lighthouse for performance

## 🐛 Troubleshooting

### Auth Issues
- Clear cookies and cache
- Check Supabase credentials
- Verify email format

### Styling Issues
- Rebuild: `npm run build`
- Clear `.next`: `rm -rf .next`

### Database Issues
- Check RLS policies
- Verify API keys
- Review SQL schema

See `DEPLOYMENT_GUIDE.md` for more solutions.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Full deployment instructions
- [Database Schema](./SUPABASE_SCHEMA.sql) - SQL schema
- [Environment Setup](./env.local.example) - Environment variables

## 📦 Dependencies

### Core
- next@14.0.0
- react@18.2.0
- typescript@5.2.0

### Styling & Animation
- tailwindcss@3.3.0
- framer-motion@10.16.0

### Backend & Database
- @supabase/supabase-js@2.38.0

### UI & Icons
- react-icons@4.11.0
- recharts@2.10.0 (charts)

### State Management
- zustand@4.4.0

### Notifications
- react-hot-toast@2.4.1

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git add .
git commit -m "Add amazing feature"

# Push to repository
git push origin feature/amazing-feature

# Create pull request
```

## 📝 License

MIT License - feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions welcome! Please feel free to submit pull requests.

## 💬 Support

- Email: support@devvault.com
- Issues: GitHub Issues
- Discussions: GitHub Discussions

## 🎯 Roadmap

- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app
- [ ] API documentation
- [ ] Automated testing
- [ ] CI/CD pipeline

## 👨‍💻 Author

**DEV-VAULT TEAM**
- Website: https://devvault.com
- Email: support@devvault.com

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- Vercel for hosting
- Framer Motion for animations
- Tailwind CSS for styling
- React community

---

**Made with ❤️ by DEV-VAULT TEAM**

Give this project a ⭐ if you found it helpful!
