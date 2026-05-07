import React from 'react'
import { motion } from 'framer-motion'

export const Loader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <motion.div
      className={`${sizeMap[size]} border-4 border-dark-700 border-t-green-500 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}
