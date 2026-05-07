import React from 'react'
import { HeroSection, PricingSection, AboutSection, ContactSection } from '@/components/home'

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <PricingSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
