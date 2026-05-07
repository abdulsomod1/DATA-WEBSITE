import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common'
import Link from 'next/link'
import { MdError } from 'react-icons/md'

export default function Custom404() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <MdError size={80} className="text-red-500 mx-auto" />
        </motion.div>

        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl text-gray-400 mb-2">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link href="/">
          <Button variant="primary" size="lg">
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
