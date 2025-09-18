"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 10 : 20

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary/20 rounded-full"
          initial={{ x: `${particle.x}vw`, y: `${particle.y}vh`, opacity: 0 }}
          animate={{
            y: [`${particle.y}vh`, `${particle.y - 20}vh`, `${particle.y}vh`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function SectionTransition({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FloatingElements() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  if (!isClient || isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-secondary/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-16 w-1 h-1 bg-accent/40 rounded-full"
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-8 w-1.5 h-1.5 bg-primary/25 rounded-full"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}
