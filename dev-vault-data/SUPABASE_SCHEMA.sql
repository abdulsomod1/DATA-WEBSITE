-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  phone TEXT,
  wallet_balance DECIMAL(15, 2) DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Data Plans Table
CREATE TABLE IF NOT EXISTS data_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  data_size INTEGER NOT NULL,
  network TEXT NOT NULL CHECK (network IN ('MTN', 'AIRTEL', 'GLO')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  network TEXT NOT NULL CHECK (network IN ('MTN', 'AIRTEL', 'GLO')),
  plan_id TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT DEFAULT 'bank_transfer',
  whatsapp_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Admin Logs Table
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- RLS Policies for transactions
CREATE POLICY "Users can view their own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions" ON transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Insert default data plans
INSERT INTO data_plans (name, duration, price, data_size, network) VALUES
-- MTN Plans
('1GB', '7 Days', 500, 1, 'MTN'),
('1GB', '30 Days', 600, 1, 'MTN'),
('2GB', '30 Days', 1000, 2, 'MTN'),
('3GB', '30 Days', 1500, 3, 'MTN'),
('5GB', '30 Days', 2500, 5, 'MTN'),
('10GB', '30 Days', 4500, 10, 'MTN'),
('15GB', '30 Days', 6500, 15, 'MTN'),
('20GB', '30 Days', 8000, 20, 'MTN'),

-- AIRTEL Plans
('1GB', '7 Days', 450, 1, 'AIRTEL'),
('1GB', '30 Days', 550, 1, 'AIRTEL'),
('2GB', '30 Days', 950, 2, 'AIRTEL'),
('3GB', '30 Days', 1400, 3, 'AIRTEL'),
('5GB', '30 Days', 2350, 5, 'AIRTEL'),
('10GB', '30 Days', 4200, 10, 'AIRTEL'),
('15GB', '30 Days', 6100, 15, 'AIRTEL'),
('20GB', '30 Days', 7600, 20, 'AIRTEL'),

-- GLO Plans
('1GB', '7 Days', 480, 1, 'GLO'),
('1GB', '30 Days', 580, 1, 'GLO'),
('2GB', '30 Days', 970, 2, 'GLO'),
('3GB', '30 Days', 1450, 3, 'GLO'),
('5GB', '30 Days', 2400, 5, 'GLO'),
('10GB', '30 Days', 4400, 10, 'GLO'),
('15GB', '30 Days', 6300, 15, 'GLO'),
('20GB', '30 Days', 7900, 20, 'GLO')
ON CONFLICT DO NOTHING;

-- Create admin user (you need to create auth user first, then insert here)
-- Example: INSERT INTO users (id, email, username, is_admin) VALUES ('admin-uuid-here', 'tenifayoabdulsomod@gmail.com', 'admin', TRUE);
