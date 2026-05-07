import React from 'react'
import { motion } from 'framer-motion'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        )}
        <motion.div
          className={`relative flex items-center rounded-lg border border-dark-600 bg-dark-700/50 focus-within:border-green-500 transition-colors ${
            error ? 'border-red-500' : ''
          }`}
          whileFocus={{ boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.1)' }}
        >
          {icon && <div className="absolute left-3 text-gray-400">{icon}</div>}
          <input
            ref={ref}
            className={`w-full bg-transparent py-2.5 px-3 ${
              icon ? 'pl-10' : 'pl-3'
            } text-white placeholder-gray-500 outline-none transition-colors ${className}`}
            {...props}
          />
        </motion.div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
