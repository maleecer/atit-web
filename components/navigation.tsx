"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { navData } from "@/data"

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
