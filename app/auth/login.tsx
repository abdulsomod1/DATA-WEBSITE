import React from 'react'
import { LoginForm } from '@/components/auth'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <LoginForm />
    </div>
  )
}
