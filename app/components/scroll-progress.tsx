"use client"

import { useEffect, useState } from "react"

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollProgress
}

export function ScrollProgressIndicator() {
  const scrollProgress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  )
}
