import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Card, Button, Modal, Input, Select, Loader } from '@/components/common'
import { useAuthStore, useNotificationStore } from '@/lib/store'
import { formatCurrency, formatDateTime } from '@/lib/utils/validation'
import { supabase } from '@/lib/supabase'
import { MdCheckCircle, MdCancel, MdEdit, MdDownload, MdSearch, MdRefresh } from 'react-icons/md'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function AdminDashboard() {
  const router = useRouter()
  const { user } = useAuthStore()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingPayments: 0,
    completedOrders: 0,
    totalRevenue: 0,
  })
  const [orders, setOrders] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Check if user is admin
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (!user.is_admin) {
      addNotification('Access denied. Admin only.', 'error')
      router.push('/dashboard')
      return
    }

    loadAdminData()

    // Subscribe to real-time updates
    const ordersSubscription = supabase
      .from('orders')
      .on('*', (payload) => {
        loadAdminData()
      })
      .subscribe()

    return () => {
      ordersSubscription.unsubscribe()
    }
  }, [user])

  const loadAdminData = async () => {
    setIsLoading(true)
    try {
      // Get users count
      const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact' })

      // Get orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      // Get transactions
      const { data: transData } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

      setOrders(ordersData || [])
      setTransactions(transData || [])

      // Calculate stats
      const completed = ordersData?.filter((o) => o.status === 'completed').length || 0
      const pending = ordersData?.filter((o) => o.status === 'pending').length || 0
      const totalRev = ordersData?.reduce((sum, o) => sum + (o.price || 0), 0) || 0

      setStats({
        totalUsers: usersCount || 0,
        totalOrders: ordersData?.length || 0,
        pendingPayments: pending,
        completedOrders: completed,
        totalRevenue: totalRev,
      })

      // Generate chart data (simplified for demo)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          orders: Math.floor(Math.random() * 20),
          revenue: Math.floor(Math.random() * 50000),
        }
      }).reverse()

      setChartData(last7Days)
    } catch (error) {
      addNotification('Error loading admin data', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsComplete = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId)

      if (error) throw error

      addNotification('Order marked as completed', 'success')
      loadAdminData()
    } catch (error) {
      addNotification('Error updating order', 'error')
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return

    try {
      const { error } = await supabase.from('orders').delete().eq('id', orderId)

      if (error) throw error

      addNotification('Order deleted successfully', 'success')
      loadAdminData()
    } catch (error) {
      addNotification('Error deleting order', 'error')
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.phone_number.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (!user?.is_admin || isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage orders and track business metrics</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              loadAdminData()
            }}
          >
            <MdRefresh size={20} />
            Refresh
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {[
            { title: 'Total Users', value: stats.totalUsers, color: 'text-blue-500' },
            { title: 'Total Orders', value: stats.totalOrders, color: 'text-purple-500' },
            { title: 'Pending Payments', value: stats.pendingPayments, color: 'text-yellow-500' },
            { title: 'Completed', value: stats.completedOrders, color: 'text-green-500' },
            {
              title: 'Total Revenue',
              value: formatCurrency(stats.totalRevenue),
              color: 'text-emerald-500',
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="text-center">
                <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Orders Chart */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Orders Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Revenue Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Recent Orders</h3>
            <Button variant="secondary" size="sm">
              <MdDownload size={18} />
              Export
            </Button>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <MdSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by phone or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white outline-none focus:border-green-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white outline-none focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="space-y-2">
            {filteredOrders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No orders found</p>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-bold">
                      {order.network} - {order.plan_id}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-400 mt-1">
                      <span>Phone: {order.phone_number}</span>
                      <span>Amount: {formatCurrency(order.price)}</span>
                      <span>{formatDateTime(order.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : order.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>

                    {order.status === 'pending' && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleMarkAsComplete(order.id)}
                        >
                          <MdCheckCircle size={18} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          <MdCancel size={18} />
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
