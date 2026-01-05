"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // RAF loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle programmatic scrollTo calls (e.g., from buttons)
    const handleScrollTo = (e: CustomEvent<{ target: string | HTMLElement }>) => {
      lenis.scrollTo(e.detail.target, { offset: 0 })
    }

    window.addEventListener("lenis:scrollTo" as any, handleScrollTo)

    // Cleanup
    return () => {
      lenis.destroy()
      window.removeEventListener("lenis:scrollTo" as any, handleScrollTo)
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

// Export a helper function to trigger scroll
export function scrollToSection(target: string | HTMLElement) {
  window.dispatchEvent(
    new CustomEvent("lenis:scrollTo", { detail: { target } })
  )
}
