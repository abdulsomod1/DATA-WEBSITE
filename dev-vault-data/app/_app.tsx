import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { Navbar, Footer, ToastContainer } from '@/components/common'
import { useNotificationStore } from '@/lib/store'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const notifications = useNotificationStore((state) => state.notifications)
  const removeNotification = useNotificationStore((state) => state.removeNotification)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900 text-white">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
        <ToastContainer notifications={notifications} onRemove={removeNotification} />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  )
}
