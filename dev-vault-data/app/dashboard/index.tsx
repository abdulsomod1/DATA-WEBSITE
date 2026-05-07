import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Card, Button, Modal, Input, Loader } from '@/components/common'
import { useAuthStore, useNotificationStore } from '@/lib/store'
import { detectNetwork, formatCurrency, formatDateTime } from '@/lib/utils/validation'
import { DATA_PLANS } from '@/lib/constants'
import { supabase } from '@/lib/supabase'
import { MdShoppingCart, MdArrowForward } from 'react-icons/md'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [modalStep, setModalStep] = useState<'select' | 'phone' | 'confirm' | 'payment'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [detectedNetwork, setDetectedNetwork] = useState<string | null>(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [orders, setOrders] = useState<any[]>([])
  const [whatsappNumber, setWhatsappNumber] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    loadUserData()
  }, [user])

  const loadUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('wallet_balance')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      setWalletBalance(data?.wallet_balance || 0)

      // Load orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (!ordersError) {
        setOrders(ordersData || [])
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value
    setPhoneNumber(phone)

    const network = detectNetwork(phone)
    setDetectedNetwork(network)
  }

  const handleContinue = () => {
    if (!phoneNumber) {
      addNotification('Please enter a phone number', 'error')
      return
    }

    if (!detectedNetwork) {
      addNotification('Invalid phone number format', 'error')
      return
    }

    if (detectedNetwork !== selectedPlan.network) {
      addNotification(
        `This number is for ${detectedNetwork}, but you selected ${selectedPlan.network}. Please select the correct network.`,
        'error'
      )
      return
    }

    setModalStep('confirm')
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id,
            network: selectedPlan.network,
            plan_id: selectedPlan.id,
            phone_number: phoneNumber,
            price: selectedPlan.price,
            status: 'pending',
          },
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Create transaction
      const { error: transError } = await supabase
        .from('transactions')
        .insert([
          {
            order_id: orderData.id,
            user_id: user?.id,
            amount: selectedPlan.price,
            payment_method: 'bank_transfer',
            status: 'pending',
          },
        ])

      if (transError) throw transError

      setModalStep('payment')
      addNotification('Order created! Proceeding to payment...', 'success')
    } catch (error) {
      addNotification('Failed to create order', 'error')
      setIsLoading(false)
    }
  }

  const handlePaymentConfirm = async () => {
    if (!whatsappNumber) {
      addNotification('Please enter your WhatsApp number', 'error')
      return
    }

    setIsLoading(true)
    try {
      // In a real app, this would update the transaction with whatsapp number
      addNotification(
        'Your payment is being confirmed. You will be contacted on WhatsApp once your data is delivered.',
        'success'
      )

      // Reset
      setSelectedPlan(null)
      setPhoneNumber('')
      setWhatsappNumber('')
      setModalStep('phone')
      setDetectedNetwork(null)

      // Reload orders
      await loadUserData()
    } catch (error) {
      addNotification('Error processing payment', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
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
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome, {user.username}!</h1>
          <p className="text-gray-400">Manage your data bundles and transactions</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <div className="text-5xl font-bold text-green-500 mb-2">
              {formatCurrency(walletBalance)}
            </div>
            <p className="text-gray-400">Wallet Balance</p>
          </Card>
          <Card className="text-center">
            <div className="text-5xl font-bold text-blue-500 mb-2">{orders.length}</div>
            <p className="text-gray-400">Total Orders</p>
          </Card>
          <Card className="text-center">
            <div className="text-5xl font-bold text-purple-500 mb-2">
              {orders.filter((o) => o.status === 'completed').length}
            </div>
            <p className="text-gray-400">Completed</p>
          </Card>
        </div>

        {/* Buy Data Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Data Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(DATA_PLANS).map(([network, plans]) => (
              <Card key={network} className="flex flex-col">
                <h3 className="text-2xl font-bold mb-6">{network}</h3>

                <div className="space-y-3 flex-1 mb-6">
                  {plans.slice(0, 4).map((plan) => (
                    <div
                      key={plan.id}
                      className="p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{plan.name}</p>
                          <p className="text-sm text-gray-400">{plan.duration}</p>
                        </div>
                        <p className="font-bold text-green-400">{formatCurrency(plan.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    setSelectedPlan({ ...plans[0], network })
                    setModalStep('phone')
                  }}
                >
                  Buy Now
                  <MdShoppingCart size={18} />
                </Button>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

          {orders.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-400">No orders yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">
                      {order.network} - {order.plan_id}
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatDateTime(order.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-400">{formatCurrency(order.price)}</p>
                    <span
                      className={`text-sm ${
                        order.status === 'completed'
                          ? 'text-green-400'
                          : order.status === 'pending'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Purchase Modal */}
        <Modal
          isOpen={!!selectedPlan}
          onClose={() => {
            setSelectedPlan(null)
            setPhoneNumber('')
            setWhatsappNumber('')
            setDetectedNetwork(null)
            setModalStep('phone')
          }}
          title={`Buy ${selectedPlan?.network} Data`}
          maxWidth="max-w-md"
        >
          {modalStep === 'phone' && (
            <div className="space-y-4">
              <p className="text-gray-300 mb-4">
                Plan: {selectedPlan?.name} ({selectedPlan?.duration})
              </p>
              <p className="text-lg font-bold text-green-400 mb-4">
                Price: {formatCurrency(selectedPlan?.price)}
              </p>

              <Input
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="0801234567"
              />

              {detectedNetwork && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-sm text-green-400">
                    ✓ Detected network: {detectedNetwork}
                  </p>
                </div>
              )}

              <Button
                variant="primary"
                fullWidth
                onClick={handleContinue}
                disabled={!detectedNetwork || detectedNetwork !== selectedPlan?.network}
              >
                Continue
                <MdArrowForward />
              </Button>
            </div>
          )}

          {modalStep === 'confirm' && (
            <div className="space-y-4">
              <div className="bg-dark-700 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Network:</span>
                  <span className="font-bold">{selectedPlan?.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-bold">{phoneNumber}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>Amount:</span>
                  <span className="font-bold">{formatCurrency(selectedPlan?.price)}</span>
                </div>
              </div>

              <p className="text-yellow-400 text-sm">
                ⚠️ Please check the phone number carefully before continuing.
              </p>

              <Button
                variant="primary"
                fullWidth
                onClick={handleConfirm}
                isLoading={isLoading}
              >
                Confirm
              </Button>
            </div>
          )}

          {modalStep === 'payment' && (
            <div className="space-y-4">
              <Card className="bg-green-500/10 border-green-500/30">
                <h3 className="font-bold mb-4">Bank Transfer</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-400">Bank:</span> <span className="font-bold">Moniepoint</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Account:</span> <span className="font-bold">8104151553</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Name:</span>{' '}
                    <span className="font-bold">ABDULSAMAD TENIFAYO HABEEBULAHI</span>
                  </p>
                </div>
              </Card>

              <Input
                label="WhatsApp Number"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Your WhatsApp number"
              />

              <Button variant="primary" fullWidth onClick={handlePaymentConfirm} isLoading={isLoading}>
                I Have Paid
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}
