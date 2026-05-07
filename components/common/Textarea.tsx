import React from 'react'
import { motion } from 'framer-motion'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        )}
        <motion.textarea
          ref={ref}
          className={`w-full bg-dark-700/50 border border-dark-600 rounded-lg py-2.5 px-3 text-white placeholder-gray-500 outline-none focus:border-green-500 transition-colors resize-none ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
