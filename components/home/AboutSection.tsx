import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common'
import { MdLightning, MdShield, MdVerified } from 'react-icons/md'

export const AboutSection = () => {
  const features = [
    {
      icon: <MdLightning size={32} className="text-yellow-500" />,
      title: 'Lightning Fast',
      description: 'Instant data delivery to your device in seconds',
    },
    {
      icon: <MdShield size={32} className="text-green-500" />,
      title: 'Secure & Safe',
      description: 'Military-grade encryption for all transactions',
    },
    {
      icon: <MdVerified size={32} className="text-blue-500" />,
      title: 'Verified Provider',
      description: 'Trusted by thousands of users nationwide',
    },
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose DEV-VAULT DATA?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We provide the fastest and most reliable data bundle purchase service in Nigeria. 
              With our platform, you can buy MTN, Airtel, and GLO data plans instantly without any hassle.
            </p>

            <div className="space-y-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="p-3 bg-dark-700 rounded-lg flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
              <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
              <p className="text-gray-300">Our support team is available round the clock to help you</p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <h3 className="text-2xl font-bold mb-4">Lowest Prices</h3>
              <p className="text-gray-300">Competitive rates with no hidden charges</p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <h3 className="text-2xl font-bold mb-4">Easy to Use</h3>
              <p className="text-gray-300">Simple and intuitive interface for everyone</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
