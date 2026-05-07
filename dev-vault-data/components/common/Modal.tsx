import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdClose } from 'react-icons/md'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: string
}

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${maxWidth} w-full bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl z-50 overflow-hidden`}
          >
            <div className="p-6">
              {title && (
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    <MdClose size={24} className="text-gray-400" />
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
