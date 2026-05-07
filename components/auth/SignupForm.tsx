import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button, Input, Card } from '../common'
import { signUpWithEmail } from '@/lib/utils/auth'
import { validateEmail, validateUsername, validatePassword } from '@/lib/utils/validation'
import { useNotificationStore } from '@/lib/store'

export const SignupForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const addNotification = useNotificationStore((state) => state.addNotification)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.username) {
      newErrors.username = 'Username is required'
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters (alphanumeric and underscore only)'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else {
      const passwordCheck = validatePassword(formData.password)
      if (!passwordCheck.valid) {
        newErrors.password = passwordCheck.feedback[0]
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      addNotification('Please fix the errors before submitting', 'error')
      return
    }

    setIsLoading(true)
    try {
      const result = await signUpWithEmail(formData.email, formData.password, formData.username)
      if (result.success) {
        addNotification('Account created successfully! Please login.', 'success')
        router.push('/auth/login')
      } else {
        throw result.error
      }
    } catch (error: any) {
      addNotification(error.message || 'Failed to create account', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-2 border-green-500/20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join DEV-VAULT DATA today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            icon={<MdEmail />}
            error={errors.email}
          />

          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            icon={<MdPerson />}
            error={errors.username}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 8 chars, 1 uppercase, 1 number, 1 special char"
            icon={<MdLock />}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            icon={<MdLock />}
            error={errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/auth/login" className="text-green-500 hover:text-green-400">
              Login here
            </a>
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
