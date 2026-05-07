import { NETWORK_PREFIXES } from './constants'

/**
 * Validate Nigerian phone number
 */
export const validatePhoneNumber = (phone: string): boolean => {
  // Remove any spaces, dashes, or plus signs
  const cleaned = phone.replace(/[\s\-+]/g, '')

  // Check if it's 11 digits starting with 0
  if (cleaned.length !== 11 || !cleaned.startsWith('0')) {
    return false
  }

  // Check if it's a valid Nigerian number format
  return /^0[0-9]{10}$/.test(cleaned)
}

/**
 * Detect network from phone number
 */
export const detectNetwork = (phone: string): string | null => {
  const cleaned = phone.replace(/[\s\-+]/g, '')

  if (!validatePhoneNumber(cleaned)) {
    return null
  }

  const prefix = cleaned.substring(0, 4)

  for (const [network, prefixes] of Object.entries(NETWORK_PREFIXES)) {
    if (prefixes.includes(prefix)) {
      return network
    }
  }

  return null
}

/**
 * Validate email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate username
 */
export const validateUsername = (username: string): boolean => {
  // Username must be 3-20 characters, alphanumeric and underscores only
  return /^[a-zA-Z0-9_]{3,20}$/.test(username)
}

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  valid: boolean
  feedback: string[]
} => {
  const feedback: string[] = []

  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter')
  }

  if (!/[0-9]/.test(password)) {
    feedback.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*]/.test(password)) {
    feedback.push('Password must contain at least one special character (!@#$%^&*)')
  }

  return {
    valid: feedback.length === 0,
    feedback,
  }
}

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount)
}

/**
 * Format date and time
 */
export const formatDateTime = (date: string): string => {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * Format date only
 */
export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for non-HTTPS contexts
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch {
    return false
  }
}

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11)
}
