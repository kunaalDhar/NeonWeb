"use client";// components/Footer/Footer.tsx
import { Instagram, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0A1A27] text-[#D8DADC] py-6 text-center ">
      <p className="mb-2">© 2025 MysticJewels. All rights reserved.</p>
      <div className="flex justify-center gap-4">
        <Instagram className="hover:text-white" />
        <Twitter className="hover:text-white" />
        <Mail className="hover:text-white" />
      </div>
    </footer>
  )
}
