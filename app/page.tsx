"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="three-canvas flex items-center justify-center">
      <div className="flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-base text-foreground font-[family-name:var(--font-open-sans)]">
          Loading 3D Scene...
        </span>
      </div>
    </div>
  ),
})

const ParticleBackground = dynamic(
  () => import("@/components/enhanced-animations").then((mod) => ({ default: mod.ParticleBackground })),
  {
    ssr: false,
  },
)

const FloatingElements = dynamic(
  () => import("@/components/enhanced-animations").then((mod) => ({ default: mod.FloatingElements })),
  {
    ssr: false,
  },
)

const InteractiveControls = dynamic(
  () => import("@/components/interactive-controls").then((mod) => ({ default: mod.InteractiveControls })),
  {
    ssr: false,
  },
)

const HotspotPanel = dynamic(
  () => import("@/components/interactive-controls").then((mod) => ({ default: mod.HotspotPanel })),
  {
    ssr: false,
  },
)

const NavigationHints = dynamic(
  () => import("@/components/interactive-controls").then((mod) => ({ default: mod.NavigationHints })),
  {
    ssr: false,
  },
)

import { useScrollProgress } from "@/components/scroll-progress"
import { ScrollProgressIndicator } from "@/components/scroll-progress"
import {
  IntroSection,
  EnginesSection,
  WingsSection,
  CockpitSection,
  CabinSection,
  SpecsSection,
} from "@/components/scroll-sections"

export default function Home() {
  const scrollProgress = useScrollProgress()
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [autoRotate, setAutoRotate] = useState(false)
  const [highlightEnabled, setHighlightEnabled] = useState(true)

  const handleHotspotClick = (hotspotId: string) => {
    setActiveHotspot(activeHotspot === hotspotId ? null : hotspotId)
  }

  const handleCameraReset = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setActiveHotspot(null)
  }

  const handleAutoRotateToggle = (enabled: boolean) => {
    setAutoRotate(enabled)
  }

  const handleHighlightToggle = (enabled: boolean) => {
    setHighlightEnabled(enabled)
  }

  return (
    <main className="relative">
      <ParticleBackground />
      <FloatingElements />
      <ScrollProgressIndicator />
      <NavigationHints />

      <ThreeScene scrollProgress={scrollProgress} activeHotspot={activeHotspot} onHotspotClick={handleHotspotClick} />

      <HotspotPanel activeHotspot={activeHotspot} />

      <InteractiveControls
        onCameraReset={handleCameraReset}
        onAutoRotateToggle={handleAutoRotateToggle}
        onHighlightToggle={handleHighlightToggle}
        autoRotate={autoRotate}
        highlightEnabled={highlightEnabled}
      />

      <div className="relative z-10">
        <IntroSection />
        <EnginesSection />
        <WingsSection />
        <CockpitSection />
        <CabinSection />
        <SpecsSection />
      </div>
    </main>
  )
}
