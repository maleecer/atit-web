"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { navData } from "@/data"
import { socialLinks as siteSocialLinks } from "@/lib/seo-config"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

interface NavigationLogo {
  src: string
}

interface NavigationProps {
  logo?: NavigationLogo
}

const socialIconLinks = [
  {
    name: "LinkedIn",
    href: siteSocialLinks.linkedin,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: siteSocialLinks.facebook,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: siteSocialLinks.discord,
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
]

export function Navigation({ logo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const fallbackLogoSrc = navData.logo?.src ?? "/placeholder-logo.svg"
  const logoSrc = logo?.src ?? fallbackLogoSrc

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="mx-4 mt-4 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div className="w-8 h-8 rounded-lg overflow-hidden" whileHover={{ scale: 1.05 }}>
                <img src={logoSrc || "/placeholder.svg"} alt="ATIT logo" className="w-full h-full object-contain" />
              </motion.div>
              <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-muted-foreground transition-colors">
                ATiT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
                {socialIconLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-px bg-foreground origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              <motion.div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-current origin-left"
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? -1 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current"
                  animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? -10 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current origin-left"
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 1 : 0 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-around">
                {socialIconLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
