import React from 'react'
import { motion } from 'framer-motion'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  children: React.ReactNode
  className?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable = true, children, className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -5, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)' } : {}}
        className={`bg-dark-800 border border-dark-700 rounded-xl p-6 backdrop-blur-md transition-all duration-300 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'
