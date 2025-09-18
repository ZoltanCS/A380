"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Info, Zap, Gauge, Users } from "lucide-react"

interface InfoOverlayProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

function InfoOverlay({ title, children, isOpen, onClose, position = "top-right" }: InfoOverlayProps) {
  if (!isOpen) return null

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 max-w-sm animate-in slide-in-from-top-2 duration-300`}>
      <Card className="shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-[family-name:var(--font-montserrat)] text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">{children}</CardContent>
      </Card>
    </div>
  )
}

export function EngineInfoOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <InfoOverlay title="Engine Details" isOpen={isOpen} onClose={onClose} position="top-left">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Rolls-Royce Trent 900</span>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Thrust: 70,000-80,000 lbf per engine</p>
          <p>• Fan diameter: 2.95m (116 in)</p>
          <p>• Bypass ratio: 8.5:1</p>
          <p>• 3-shaft design with advanced materials</p>
        </div>
        <Badge variant="secondary" className="w-full justify-center">
          Most Powerful Commercial Engine
        </Badge>
      </div>
    </InfoOverlay>
  )
}

export function PerformanceInfoOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <InfoOverlay title="Performance Data" isOpen={isOpen} onClose={onClose} position="top-right">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Flight Performance</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/50 p-2 rounded">
            <p className="font-semibold">Takeoff</p>
            <p className="text-muted-foreground">3,000m runway</p>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <p className="font-semibold">Landing</p>
            <p className="text-muted-foreground">2,500m runway</p>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <p className="font-semibold">Cruise</p>
            <p className="text-muted-foreground">Mach 0.85</p>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <p className="font-semibold">Range</p>
            <p className="text-muted-foreground">15,200 km</p>
          </div>
        </div>
      </div>
    </InfoOverlay>
  )
}

export function CabinInfoOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <InfoOverlay title="Cabin Features" isOpen={isOpen} onClose={onClose} position="bottom-left">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Passenger Experience</span>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Double-deck configuration</p>
          <p>• 18.3" wide economy seats</p>
          <p>• Advanced air filtration</p>
          <p>• Reduced cabin noise</p>
          <p>• LED mood lighting</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Badge variant="outline" className="text-xs">
            First Class
          </Badge>
          <Badge variant="outline" className="text-xs">
            Business
          </Badge>
          <Badge variant="outline" className="text-xs">
            Economy
          </Badge>
        </div>
      </div>
    </InfoOverlay>
  )
}

export function useInfoOverlays() {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null)

  const openOverlay = (overlay: string) => setActiveOverlay(overlay)
  const closeOverlay = () => setActiveOverlay(null)

  return {
    activeOverlay,
    openOverlay,
    closeOverlay,
    EngineOverlay: () => <EngineInfoOverlay isOpen={activeOverlay === "engine"} onClose={closeOverlay} />,
    PerformanceOverlay: () => (
      <PerformanceInfoOverlay isOpen={activeOverlay === "performance"} onClose={closeOverlay} />
    ),
    CabinOverlay: () => <CabinInfoOverlay isOpen={activeOverlay === "cabin"} onClose={closeOverlay} />,
  }
}
