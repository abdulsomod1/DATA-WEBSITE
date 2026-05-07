import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdMenu, MdClose } from 'react-icons/md'
import { useAuthStore } from '@/lib/store'
import { useRouter } from 'next/router'
import { logout } from '@/lib/utils/auth'
import { Button } from './Button'

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuthStore()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    useAuthStore.setState({ user: null, session: null })
    router.push('/')
    setIsLoggingOut(false)
  }

  return (
    <nav className="sticky top-0 z-40 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              DEV-VAULT
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#pricing" className="text-gray-300 hover:text-green-400 transition">
              Pricing
            </Link>
            <Link href="/#about" className="text-gray-300 hover:text-green-400 transition">
              About
            </Link>
            <Link href="/#contact" className="text-gray-300 hover:text-green-400 transition">
              Contact
            </Link>

            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  isLoading={isLoggingOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-dark-700"
          >
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/#pricing" className="px-3 py-2 text-gray-300 hover:text-green-400">
                Pricing
              </Link>
              <Link href="/#about" className="px-3 py-2 text-gray-300 hover:text-green-400">
                About
              </Link>
              <Link href="/#contact" className="px-3 py-2 text-gray-300 hover:text-green-400">
                Contact
              </Link>

              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="secondary" size="sm" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" fullWidth onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="secondary" size="sm" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="sm" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
