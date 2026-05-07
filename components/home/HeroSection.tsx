import React from 'react'
import { motion } from 'framer-motion'
import { MdArrowForward, MdCheckCircle } from 'react-icons/md'
import { Button } from '@/components/common'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
            🚀 Fast & Reliable Data Bundles
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent"
        >
          Get Instant Data Bundles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
        >
          Buy MTN, Airtel, and GLO data plans instantly. Fast, secure, and affordable data bundles delivered to your device.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link href="/auth/signup">
            <Button variant="primary" size="lg">
              Get Started Now
              <MdArrowForward size={20} />
            </Button>
          </Link>
          <Link href="/#pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: 'Instant Delivery', desc: 'Get your data in seconds' },
            { title: 'Secure Payment', desc: 'Safe and encrypted transactions' },
            { title: 'All Networks', desc: 'MTN, Airtel & GLO support' },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-dark-800/50 rounded-lg border border-dark-700">
              <MdCheckCircle className="text-green-500" size={24} />
              <div className="text-left">
                <p className="font-semibold">{feature.title}</p>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
