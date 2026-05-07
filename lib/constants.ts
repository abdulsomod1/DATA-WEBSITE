// Data Plans Pricing
export const DATA_PLANS = {
  MTN: [
    { id: 'mtn-1gb-7d', name: '1GB', duration: '7 Days', price: 500, data: 1 },
    { id: 'mtn-1gb-30d', name: '1GB', duration: '30 Days', price: 600, data: 1 },
    { id: 'mtn-2gb', name: '2GB', duration: '30 Days', price: 1000, data: 2 },
    { id: 'mtn-3gb', name: '3GB', duration: '30 Days', price: 1500, data: 3 },
    { id: 'mtn-5gb', name: '5GB', duration: '30 Days', price: 2500, data: 5 },
    { id: 'mtn-10gb', name: '10GB', duration: '30 Days', price: 4500, data: 10 },
    { id: 'mtn-15gb', name: '15GB', duration: '30 Days', price: 6500, data: 15 },
    { id: 'mtn-20gb', name: '20GB', duration: '30 Days', price: 8000, data: 20 },
  ],
  AIRTEL: [
    { id: 'airtel-1gb-7d', name: '1GB', duration: '7 Days', price: 450, data: 1 },
    { id: 'airtel-1gb-30d', name: '1GB', duration: '30 Days', price: 550, data: 1 },
    { id: 'airtel-2gb', name: '2GB', duration: '30 Days', price: 950, data: 2 },
    { id: 'airtel-3gb', name: '3GB', duration: '30 Days', price: 1400, data: 3 },
    { id: 'airtel-5gb', name: '5GB', duration: '30 Days', price: 2350, data: 5 },
    { id: 'airtel-10gb', name: '10GB', duration: '30 Days', price: 4200, data: 10 },
    { id: 'airtel-15gb', name: '15GB', duration: '30 Days', price: 6100, data: 15 },
    { id: 'airtel-20gb', name: '20GB', duration: '30 Days', price: 7600, data: 20 },
  ],
  GLO: [
    { id: 'glo-1gb-7d', name: '1GB', duration: '7 Days', price: 480, data: 1 },
    { id: 'glo-1gb-30d', name: '1GB', duration: '30 Days', price: 580, data: 1 },
    { id: 'glo-2gb', name: '2GB', duration: '30 Days', price: 970, data: 2 },
    { id: 'glo-3gb', name: '3GB', duration: '30 Days', price: 1450, data: 3 },
    { id: 'glo-5gb', name: '5GB', duration: '30 Days', price: 2400, data: 5 },
    { id: 'glo-10gb', name: '10GB', duration: '30 Days', price: 4400, data: 10 },
    { id: 'glo-15gb', name: '15GB', duration: '30 Days', price: 6300, data: 15 },
    { id: 'glo-20gb', name: '20GB', duration: '30 Days', price: 7900, data: 20 },
  ],
}

// Nigerian Network Prefixes
export const NETWORK_PREFIXES: Record<string, string[]> = {
  MTN: ['0803', '0806', '0810', '0814', '0816'],
  AIRTEL: ['0801', '0808', '0812'],
  GLO: ['0805', '0807', '0811', '0815'],
}

// Types
export interface User {
  id: string
  email: string
  username: string
  phone?: string
  wallet_balance: number
  created_at: string
  updated_at: string
  is_admin: boolean
}

export interface DataPlan {
  id: string
  name: string
  duration: string
  price: number
  data: number
  network: string
}

export interface Order {
  id: string
  user_id: string
  network: string
  plan_id: string
  phone_number: string
  price: number
  status: 'pending' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  order_id: string
  user_id: string
  amount: number
  payment_method: string
  whatsapp_number?: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export interface AdminLog {
  id: string
  admin_id: string
  action: string
  details: Record<string, any>
  created_at: string
}
