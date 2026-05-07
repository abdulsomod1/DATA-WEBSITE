import React from 'react'
import { motion } from 'framer-motion'
import { MdCheckCircle, MdError, MdInfo, MdWarning, MdClose } from 'react-icons/md'

interface ToastProps {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  onClose: (id: string) => void
}

export const Toast = ({ id, type, message, onClose }: ToastProps) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000)
    return () => clearTimeout(timer)
  }, [id, onClose])

  const icons = {
    success: <MdCheckCircle className="text-green-500" size={20} />,
    error: <MdError className="text-red-500" size={20} />,
    info: <MdInfo className="text-blue-500" size={20} />,
    warning: <MdWarning className="text-yellow-500" size={20} />,
  }

  const bgColors = {
    success: 'bg-green-500/10 border-green-500',
    error: 'bg-red-500/10 border-red-500',
    info: 'bg-blue-500/10 border-blue-500',
    warning: 'bg-yellow-500/10 border-yellow-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`flex items-center gap-3 border ${bgColors[type]} rounded-lg p-4 mb-3 text-white`}
    >
      {icons[type]}
      <p className="flex-1">{message}</p>
      <button onClick={() => onClose(id)} className="p-1 hover:bg-white/10 rounded transition-colors">
        <MdClose size={18} />
      </button>
    </motion.div>
  )
}

export const ToastContainer = ({
  notifications,
  onRemove,
}: {
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
  }>
  onRemove: (id: string) => void
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={onRemove}
        />
      ))}
    </div>
  )
}
