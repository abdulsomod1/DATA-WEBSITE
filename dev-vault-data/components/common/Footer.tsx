import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdFacebook, MdEmail, MdPhone } from 'react-icons/md'

export const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4">
              DEV-VAULT DATA
            </h3>
            <p className="text-gray-400 text-sm">Fast and reliable data bundle purchase service</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-green-400 transition text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-green-400 transition text-sm">
                  About
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-green-400 transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@devvault.com" className="text-gray-400 hover:text-green-400 transition text-sm">
                  Email Support
                </a>
              </li>
              <li>
                <a href="tel:+234" className="text-gray-400 hover:text-green-400 transition text-sm">
                  Call Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:support@devvault.com" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm">
                <MdEmail size={16} />
                support@devvault.com
              </a>
              <a href="tel:+234" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm">
                <MdPhone size={16} />
                +234 (0) XXX XXX XXXX
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; 2024 DEV-VAULT DATA. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
              <MdFacebook size={20} className="text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
