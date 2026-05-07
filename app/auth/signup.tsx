import React from 'react'
import { SignupForm } from '@/components/auth'

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <SignupForm />
    </div>
  )
}
