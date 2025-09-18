"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FuelConsumptionChart,
  PerformanceChart,
  AircraftComparison,
  TechnicalSpecs,
  EngineDetails,
  CabinConfiguration,
} from "./data-visualizations"
import { useInfoOverlays } from "./info-overlays"

interface ScrollSectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

function ScrollSection({ id, title, children, className = "" }: ScrollSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-section ${className} transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="content-overlay rounded-lg p-4 sm:p-6 lg:p-8 max-w-6xl mx-2 sm:mx-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-[family-name:var(--font-montserrat)] mb-4 sm:mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}

export function IntroSection() {
  return (
    <ScrollSection id="intro" title="Airbus A380" className="min-h-screen">
      <div className="text-center space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg lg:text-xl font-[family-name:var(--font-open-sans)] text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
          The world's largest passenger airliner, a marvel of engineering that redefined commercial aviation with its
          unprecedented size and luxury.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2 animate-pulse">
            Double-Deck
          </Badge>
          <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2 animate-pulse">
            Wide-Body
          </Badge>
          <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-1 sm:px-4 sm:py-2 animate-pulse">
            853 Passengers
          </Badge>
        </div>
        <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
          <p>Scroll to explore the aircraft in detail</p>
          <div className="animate-bounce mt-2">↓</div>
        </div>
      </div>
    </ScrollSection>
  )
}

export function EnginesSection() {
  const { openOverlay, EngineOverlay } = useInfoOverlays()

  return (
    <ScrollSection id="engines" title="Powerful Engines">
      <EngineOverlay />
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2 text-base sm:text-lg">
                🔧 Engine Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[family-name:var(--font-open-sans)] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                Four Rolls-Royce Trent 900 or Engine Alliance GP7200 turbofan engines, each representing the pinnacle of
                aerospace engineering.
              </p>
              <Button onClick={() => openOverlay("engine")} variant="outline" size="sm" className="text-xs sm:text-sm">
                View Details
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2 text-base sm:text-lg">
                ⚡ Thrust Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[family-name:var(--font-open-sans)] text-xl sm:text-2xl font-bold text-primary mb-2">
                70,000-80,000 lbf
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">(311-356 kN) per engine</p>
              <Progress value={85} className="mt-3" />
            </CardContent>
          </Card>
        </div>
        <EngineDetails />
        <FuelConsumptionChart />
      </div>
    </ScrollSection>
  )
}

export function WingsSection() {
  return (
    <ScrollSection id="wings" title="Aerodynamic Wings">
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">Wingspan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold text-primary">79.75 m</p>
              <p className="text-xs sm:text-sm text-muted-foreground">261.8 ft</p>
              <div className="mt-2 sm:mt-3 text-xs text-muted-foreground">Wider than a football field</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">
                Wing Area
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold text-primary">845 m²</p>
              <p className="text-xs sm:text-sm text-muted-foreground">9,100 sq ft</p>
              <div className="mt-2 sm:mt-3 text-xs text-muted-foreground">Equivalent to 1.5 basketball courts</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">
                Fuel Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold text-primary">320,000 L</p>
              <p className="text-xs sm:text-sm text-muted-foreground">84,535 US gal</p>
              <div className="mt-2 sm:mt-3 text-xs text-muted-foreground">Enough to fill 4 Olympic pools</div>
            </CardContent>
          </Card>
        </div>
        <PerformanceChart />
      </div>
    </ScrollSection>
  )
}

export function CockpitSection() {
  const { openOverlay, PerformanceOverlay } = useInfoOverlays()

  return (
    <ScrollSection id="cockpit" title="Advanced Cockpit">
      <PerformanceOverlay />
      <div className="space-y-4 sm:space-y-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-montserrat)] text-lg sm:text-xl">
              🛩️ Fly-by-Wire Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-[family-name:var(--font-open-sans)] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              State-of-the-art digital flight control system with advanced autopilot capabilities, integrated flight
              management systems, and real-time weather monitoring.
            </p>
            <Button
              onClick={() => openOverlay("performance")}
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm"
            >
              View Performance Data
            </Button>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">
                📺 Displays
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[family-name:var(--font-open-sans)] text-base sm:text-lg font-semibold text-primary">
                8 LCD displays
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">For comprehensive flight information</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">👨‍✈️ Crew</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[family-name:var(--font-open-sans)] text-base sm:text-lg font-semibold text-primary">
                2 pilots minimum
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Highly trained professionals</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollSection>
  )
}

export function CabinSection() {
  const { openOverlay, CabinOverlay } = useInfoOverlays()

  return (
    <ScrollSection id="cabin" title="Luxurious Cabin">
      <CabinOverlay />
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">
                👥 Passenger Capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-[family-name:var(--font-open-sans)] text-sm sm:text-lg">
                    <span className="font-semibold text-primary">Typical:</span> 525 passengers
                  </p>
                  <Progress value={62} className="mt-1" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-open-sans)] text-sm sm:text-lg">
                    <span className="font-semibold text-secondary">Maximum:</span> 853 passengers
                  </p>
                  <Progress value={100} className="mt-1" />
                </div>
                <Button
                  onClick={() => openOverlay("cabin")}
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs sm:text-sm"
                >
                  Cabin Features
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-montserrat)] text-base sm:text-lg">
                ✈️ Cabin Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                <Badge variant="outline" className="w-full justify-center py-1 sm:py-2 text-xs sm:text-sm">
                  First Class
                </Badge>
                <Badge variant="outline" className="w-full justify-center py-1 sm:py-2 text-xs sm:text-sm">
                  Business Class
                </Badge>
                <Badge variant="outline" className="w-full justify-center py-1 sm:py-2 text-xs sm:text-sm">
                  Premium Economy
                </Badge>
                <Badge variant="outline" className="w-full justify-center py-1 sm:py-2 text-xs sm:text-sm">
                  Economy Class
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        <CabinConfiguration />
      </div>
    </ScrollSection>
  )
}

export function SpecsSection() {
  return (
    <ScrollSection id="specs" title="Technical Specifications">
      <div className="space-y-6 sm:space-y-8">
        <TechnicalSpecs />
        <AircraftComparison />
      </div>
    </ScrollSection>
  )
}
