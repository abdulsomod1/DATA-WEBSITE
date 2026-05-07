import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button, Input, Card } from '../common'
import { loginWithEmail, loginWithUsername, getCurrentUser } from '@/lib/utils/auth'
import { useAuthStore, useNotificationStore } from '@/lib/store'
import { getUserProfile } from '@/lib/utils/auth'

export const LoginForm = () => {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const setSession = useAuthStore((state) => state.setSession)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'username'>('email')
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername =
        loginMethod === 'email' ? 'Email is required' : 'Username is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      addNotification('Please fill all fields', 'error')
      return
    }

    setIsLoading(true)
    try {
      let result

      if (loginMethod === 'email') {
        result = await loginWithEmail(formData.emailOrUsername, formData.password)
      } else {
        result = await loginWithUsername(formData.emailOrUsername, formData.password)
      }

      if (!result.success) {
        throw new Error('Invalid credentials')
      }

      // Check if admin
      const userResult = await getCurrentUser()
      if (!userResult.success) throw userResult.error

      const profileResult = await getUserProfile(userResult.user!.id)
      if (!profileResult.success) throw profileResult.error

      const userProfile = profileResult.user
      setUser(userProfile)
      setSession(result.session)

      // Redirect based on role
      if (userProfile.is_admin) {
        addNotification('Welcome Admin!', 'success')
        router.push('/admin')
      } else {
        addNotification('Login successful!', 'success')
        router.push('/dashboard')
      }
    } catch (error: any) {
      addNotification(error.message || 'Login failed', 'error')
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Login to your DEV-VAULT DATA account</p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex gap-2 mb-6 bg-dark-700 rounded-lg p-1">
          <button
            onClick={() => {
              setLoginMethod('email')
              setFormData((prev) => ({ ...prev, emailOrUsername: '' }))
            }}
            className={`flex-1 py-2 rounded-md transition-colors font-medium ${
              loginMethod === 'email'
                ? 'bg-green-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => {
              setLoginMethod('username')
              setFormData((prev) => ({ ...prev, emailOrUsername: '' }))
            }}
            className={`flex-1 py-2 rounded-md transition-colors font-medium ${
              loginMethod === 'username'
                ? 'bg-green-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Username
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={loginMethod === 'email' ? 'Email Address' : 'Username'}
            type={loginMethod === 'email' ? 'email' : 'text'}
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder={loginMethod === 'email' ? 'you@example.com' : 'your_username'}
            icon={loginMethod === 'email' ? <MdEmail /> : <MdPerson />}
            error={errors.emailOrUsername}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            icon={<MdLock />}
            error={errors.password}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-green-500 hover:text-green-400">
              Sign up here
            </a>
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
