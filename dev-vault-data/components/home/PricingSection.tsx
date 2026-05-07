import React from 'react'
import { motion } from 'framer-motion'
import { Card, Button } from '@/components/common'
import Link from 'next/link'
import { MdMobileScreenShare, MdSignal } from 'react-icons/md'

export const PricingSection = () => {
  const networks = [
    {
      name: 'MTN',
      icon: <MdSignal className="text-yellow-500" size={32} />,
      color: 'from-yellow-600 to-yellow-700',
      plans: [
        { data: '1GB', duration: '7 Days', price: '₦500' },
        { data: '1GB', duration: '30 Days', price: '₦600' },
        { data: '5GB', duration: '30 Days', price: '₦2,500' },
        { data: '10GB', duration: '30 Days', price: '₦4,500' },
      ],
    },
    {
      name: 'Airtel',
      icon: <MdSignal className="text-red-500" size={32} />,
      color: 'from-red-600 to-red-700',
      plans: [
        { data: '1GB', duration: '7 Days', price: '₦450' },
        { data: '1GB', duration: '30 Days', price: '₦550' },
        { data: '5GB', duration: '30 Days', price: '₦2,350' },
        { data: '10GB', duration: '30 Days', price: '₦4,200' },
      ],
    },
    {
      name: 'GLO',
      icon: <MdSignal className="text-green-500" size={32} />,
      color: 'from-green-600 to-green-700',
      plans: [
        { data: '1GB', duration: '7 Days', price: '₦480' },
        { data: '1GB', duration: '30 Days', price: '₦580' },
        { data: '5GB', duration: '30 Days', price: '₦2,400' },
        { data: '10GB', duration: '30 Days', price: '₦4,400' },
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Affordable Data Plans
          </h2>
          <p className="text-gray-400 text-lg">Choose from our competitive pricing for all networks</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {networks.map((network, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className={`p-4 rounded-lg bg-gradient-to-r ${network.color} mb-4 inline-block`}>
                  {network.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6">{network.name} Plans</h3>

                <div className="space-y-3 flex-1">
                  {network.plans.map((plan, pidx) => (
                    <div
                      key={pidx}
                      className="flex justify-between items-center p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{plan.data}</p>
                        <p className="text-sm text-gray-400">{plan.duration}</p>
                      </div>
                      <p className="text-lg font-bold text-green-400">{plan.price}</p>
                    </div>
                  ))}
                </div>

                <Link href="/auth/login" className="mt-6 w-full">
                  <Button variant="primary" size="md" fullWidth>
                    Buy Now
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
