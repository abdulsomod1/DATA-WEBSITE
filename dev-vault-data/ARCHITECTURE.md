# DEV-VAULT DATA - Architecture & System Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Homepage   │  │  Dashboard   │  │ Admin Panel  │       │
│  │              │  │              │  │              │       │
│  │ - Hero       │  │ - Wallet     │  │ - Analytics  │       │
│  │ - Pricing    │  │ - Orders     │  │ - Orders     │       │
│  │ - About      │  │ - Buy Data   │  │ - Users      │       │
│  │ - Contact    │  │ - History    │  │ - Export     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│                  Built with: Next.js + React                │
│                Styled with: Tailwind CSS + Framer            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↓ API Calls
┌─────────────────────────────────────────────────────────────┐
│                   MIDDLEWARE & AUTH LAYER                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Supabase Authentication                     │    │
│  │  - JWT Token Generation & Validation               │    │
│  │  - Session Management                              │    │
│  │  - OAuth Integration (optional)                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │       Request Validation & Error Handling           │    │
│  │  - Input Validation (phone, email, username)       │    │
│  │  - Network Detection (MTN, Airtel, GLO)            │    │
│  │  - Error Messages & Notifications                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↓ Data Operations
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                    SUPABASE BACKEND                          │
│                                                               │
│  PostgreSQL Database with RLS (Row Level Security)           │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    Users     │  │    Orders    │  │ Transactions │       │
│  │              │  │              │  │              │       │
│  │ - id         │  │ - id         │  │ - id         │       │
│  │ - email      │  │ - user_id    │  │ - order_id   │       │
│  │ - username   │  │ - network    │  │ - user_id    │       │
│  │ - wallet     │  │ - plan_id    │  │ - amount     │       │
│  │ - is_admin   │  │ - phone_no   │  │ - payment_m. │       │
│  │ - created_at │  │ - price      │  │ - whatsapp   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ Data Plans   │  │ Admin Logs   │                         │
│  │              │  │              │                         │
│  │ - id         │  │ - id         │                         │
│  │ - name       │  │ - admin_id   │                         │
│  │ - duration   │  │ - action     │                         │
│  │ - price      │  │ - details    │                         │
│  │ - network    │  │ - created_at │                         │
│  └──────────────┘  └──────────────┘                         │
│                                                               │
│  Security:                                                   │
│  ✅ Row-Level Security (RLS) enabled                        │
│  ✅ API Key protection                                      │
│  ✅ Secure connections (HTTPS)                             │
│  ✅ SQL Injection prevention                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### User Registration Flow
```
User Input
    ↓
Validation (Email, Username, Password)
    ↓
Sign Up with Supabase Auth
    ↓
Create User Profile in Database
    ↓
JWT Token Generated
    ↓
Redirect to Login
```

### Data Purchase Flow
```
User Selects Network
    ↓
Selects Data Plan
    ↓
Enters Phone Number
    ↓
Validate Phone (Network Detection)
    ↓
Confirm Order Details
    ↓
Create Order in Database
    ↓
Create Transaction Record
    ↓
Show Payment Information
    ↓
User Pays & Confirms WhatsApp
    ↓
Mark Transaction Complete
    ↓
Update User Dashboard
```

### Admin Operations Flow
```
Admin Login
    ↓
Check Admin Credentials
    ↓
Load Real-time Data from Database
    ↓
Display Analytics Dashboard
    ↓
Admin Actions (Mark Complete, Delete, Export)
    ↓
Update Database
    ↓
Log Admin Action
    ↓
Notify via Toast
```

## 📊 Database Relationships

```
Users (1)
  ├─── (1:M) ──→ Orders (M)
  │              ├─── (1:1) ──→ Transactions
  │              └─── (M:1) ──→ Data Plans
  │
  └─── (1:M) ──→ Admin Logs (M)

Data Plans (1)
  └─── (1:M) ──→ Orders (M)

Transactions (1)
  └─── (1:1) ──→ Orders (1)
```

## 🔐 Authentication & Authorization

### User Flow
```
Login Page
    ↓
Enter Email/Username & Password
    ↓
Verify with Supabase Auth
    ↓
Get JWT Token
    ↓
Store in Session
    ↓
Redirect to Dashboard
```

### Admin Flow
```
Login Page
    ↓
Enter Email & Password
    ↓
Verify Credentials
    ↓
Check is_admin flag in Database
    ↓
If TRUE: Redirect to Admin Dashboard
If FALSE: Redirect to User Dashboard
```

## 🎯 Component Hierarchy

```
App (_app.tsx)
├── Navbar
│   ├── Logo
│   ├── Links
│   ├── Auth Buttons
│   └── Mobile Menu
│
├── Main Content
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── PricingSection
│   │   ├── AboutSection
│   │   └── ContactSection
│   │
│   ├── LoginPage (LoginForm)
│   ├── SignupPage (SignupForm)
│   │
│   ├── DashboardPage
│   │   ├── Stats Cards
│   │   ├── Data Plans Grid
│   │   ├── Purchase Modal
│   │   └── Orders List
│   │
│   └── AdminDashboard
│       ├── Stats Grid
│       ├── Charts (Line, Bar)
│       ├── Orders Table
│       └── Admin Actions
│
└── Footer
    ├── Links
    ├── Contact Info
    └── Social Links
```

## 📈 State Management

### Global Store (Zustand)
```
Auth Store
├── user: User | null
├── session: Session | null
├── isLoading: boolean
├── setUser()
├── setSession()
└── logout()

UI Store
├── theme: 'light' | 'dark'
├── sidebarOpen: boolean
├── setTheme()
└── toggleSidebar()

Notification Store
├── notifications: Notification[]
├── addNotification()
└── removeNotification()
```

## 🚀 Deployment Pipeline

```
Local Development
    ↓
Git Push to Repository
    ↓
Vercel/Netlify Webhook Triggered
    ↓
Build Process (npm run build)
    ↓
TypeScript Compilation
    ↓
NextJs Build Optimization
    ↓
Environment Variables Injected
    ↓
Deploy to CDN/Edge Network
    ↓
DNS Updated
    ↓
Live on Production URL
```

## 🔄 Real-time Updates

### Supabase Subscriptions
```
Dashboard Component
    ↓
Subscribe to Orders Changes
    ↓
Database Change Detected
    ↓
Payload Sent to Client
    ↓
State Updated
    ↓
UI Re-rendered
    ↓
User Sees Live Updates
```

## 📱 Responsive Breakpoints

```
Mobile (320px - 640px)
├── Single Column Layout
├── Full-width Cards
└── Touch-friendly Buttons

Tablet (641px - 1024px)
├── Two Column Layout
├── Optimized Spacing
└── Hybrid Navigation

Desktop (1025px+)
├── Three Column Layout
├── Full Navigation
└── Side Sidebar (future)
```

## 🎨 Component Hierarchy by Feature

### Authentication Feature
```
Auth Flow
├── SignupForm
│   ├── Input (Email, Username, Password)
│   ├── Validation Logic
│   ├── Submit Button
│   └── Redirect Link
│
└── LoginForm
    ├── Toggle (Email/Username)
    ├── Input (Email/Username, Password)
    ├── Submit Button
    └── Signup Link
```

### Purchase Feature
```
Purchase Flow
├── PricingSection
│   └── Network Cards (MTN, Airtel, GLO)
│       └── Plan Grid
│           └── Buy Button
│
├── Modal
│   ├── Phone Input
│   ├── Network Detection
│   ├── Confirmation
│   └── Payment Info
│
└── Dashboard
    └── Orders List
        └── Status Display
```

### Admin Feature
```
Admin Dashboard
├── Stats Grid
│   ├── Total Users
│   ├── Total Orders
│   ├── Pending Payments
│   ├── Completed Orders
│   └── Total Revenue
│
├── Charts
│   ├── LineChart (Orders)
│   └── BarChart (Revenue)
│
└── Orders Table
    ├── Search
    ├── Filter
    ├── Actions
    └── Export
```

## 🔌 API Integration

```
Frontend (React)
    ↓ HTTP Requests
Supabase API
    ├── /rest/v1/users
    ├── /rest/v1/orders
    ├── /rest/v1/transactions
    ├── /rest/v1/data_plans
    └── /auth/v1/*
    ↓
PostgreSQL Database
    ├── Read Operations
    ├── Write Operations
    ├── Real-time Subscriptions
    └── RLS Policies Applied
    ↓
Response Back to Frontend
```

## 🎯 Error Handling

```
User Action
    ↓
Validation Check
    ├─ Failed: Show Error Toast
    └─ Passed: Continue
    ↓
API Request
    ├─ Success: Update State
    ├─ Error: Show Error Toast
    └─ Loading: Show Spinner
    ↓
User Notification
    └─ Auto-dismiss after 5s
```

## 📊 Performance Optimization

```
Code Splitting
├── Route-based (Next.js automatic)
└── Component-based (dynamic imports)

Caching
├── Browser Cache (static assets)
├── Supabase Query Cache
└── Redis (future)

Image Optimization
├── WebP Format
├── Responsive Sizes
└── Lazy Loading

CSS Optimization
├── Tailwind Purging
└── CSS Minification
```

## 🔐 Security Layers

```
Layer 1: Authentication
├── JWT Tokens
├── Session Management
└── Password Hashing

Layer 2: Authorization
├── RLS Policies
├── Admin Checks
└── Route Protection

Layer 3: Input Validation
├── Frontend Validation
├── Backend Validation
└── Type Checking

Layer 4: Data Protection
├── HTTPS/SSL
├── Environment Variables
├── API Key Security
└── SQL Injection Prevention
```

---

**Visual Guide Created**: May 2024
**Architecture Version**: 1.0.0
**Status**: Production Ready ✅
