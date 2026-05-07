import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common'
import { MdCheckCircle } from 'react-icons/md'

export default function Custom500() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold mb-4">500</h1>
        <p className="text-2xl text-gray-400 mb-2">Server Error</p>
        <p className="text-gray-500 mb-8">
          Something went wrong on our end. Please try again later or contact support.
        </p>

        <Card className="text-left">
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <MdCheckCircle className="text-green-500 flex-shrink-0 mt-1" />
              <p>Our team has been notified</p>
            </div>
            <div className="flex gap-2 items-start">
              <MdCheckCircle className="text-green-500 flex-shrink-0 mt-1" />
              <p>We're working on a fix</p>
            </div>
            <div className="flex gap-2 items-start">
              <MdCheckCircle className="text-green-500 flex-shrink-0 mt-1" />
              <p>Contact us if the issue persists</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
