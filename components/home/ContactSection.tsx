import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Input, Textarea, Button } from '@/components/common'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { useNotificationStore } from '@/lib/store'

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addNotification = useNotificationStore((state) => state.addNotification)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      addNotification('Please fill all fields', 'error')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      addNotification('Message sent successfully! We will contact you soon.', 'success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400 text-lg">Have questions? We'd love to hear from you</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

            {[
              {
                icon: <MdEmail size={24} className="text-green-500" />,
                title: 'Email',
                content: 'support@devvault.com',
              },
              {
                icon: <MdPhone size={24} className="text-green-500" />,
                title: 'Phone',
                content: '+234 (0) XXX XXX XXXX',
              },
              {
                icon: <MdLocationOn size={24} className="text-green-500" />,
                title: 'Address',
                content: 'Lagos, Nigeria',
              },
            ].map((item, idx) => (
              <Card key={idx} className="flex gap-4 items-start">
                <div className="p-3 bg-dark-700 rounded-lg flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.content}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />

            <Input
              label="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Message subject"
            />

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={4}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
