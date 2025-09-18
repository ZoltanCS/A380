"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RotateCcw, Zap, Settings } from "lucide-react"

interface InteractiveControlsProps {
  onCameraReset: () => void
  onAutoRotateToggle: (enabled: boolean) => void
  onHighlightToggle: (enabled: boolean) => void
  autoRotate: boolean
  highlightEnabled: boolean
}

export function InteractiveControls({
  onCameraReset,
  onAutoRotateToggle,
  onHighlightToggle,
  autoRotate,
  highlightEnabled,
}: InteractiveControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 right-2 sm:right-4 z-40">
      <Card className="bg-background/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl max-w-xs">
        <CardHeader className="pb-2 sm:pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-[family-name:var(--font-montserrat)] text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              Controls
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-xs"
            >
              {isExpanded ? "−" : "+"}
            </Button>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-0 space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-rotate"
                checked={autoRotate}
                onCheckedChange={onAutoRotateToggle}
                className="data-[state=checked]:bg-primary scale-75 sm:scale-100"
              />
              <Label htmlFor="auto-rotate" className="text-xs sm:text-sm">
                Auto Rotate
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="highlight"
                checked={highlightEnabled}
                onCheckedChange={onHighlightToggle}
                className="data-[state=checked]:bg-secondary scale-75 sm:scale-100"
              />
              <Label htmlFor="highlight" className="text-xs sm:text-sm">
                Highlight Parts
              </Label>
            </div>

            <Button
              onClick={onCameraReset}
              variant="outline"
              size="sm"
              className="w-full bg-transparent text-xs sm:text-sm py-1 sm:py-2"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Reset View
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export function HotspotPanel({ activeHotspot }: { activeHotspot: string | null }) {
  if (!activeHotspot) return null

  const hotspotData = {
    "engine-left": {
      title: "Port Engine",
      specs: ["Rolls-Royce Trent 900", "80,000 lbf thrust", "2.95m fan diameter"],
      description: "The left engine of the A380, one of four powerful turbofan engines.",
    },
    "engine-right": {
      title: "Starboard Engine",
      specs: ["Rolls-Royce Trent 900", "80,000 lbf thrust", "Advanced materials"],
      description: "The right engine providing incredible thrust for this massive aircraft.",
    },
    cockpit: {
      title: "Flight Deck",
      specs: ["Fly-by-wire controls", "8 LCD displays", "2-pilot operation"],
      description: "Advanced cockpit with state-of-the-art avionics and flight management systems.",
    },
    "wing-tip": {
      title: "Wing Structure",
      specs: ["79.75m wingspan", "845 m² wing area", "Carbon fiber construction"],
      description: "Massive wings designed for optimal aerodynamic efficiency and fuel capacity.",
    },
  }

  const data = hotspotData[activeHotspot as keyof typeof hotspotData]
  if (!data) return null

  return (
    <div className="fixed top-4 left-2 sm:left-4 z-40 max-w-xs sm:max-w-sm animate-in slide-in-from-left-2 duration-300">
      <Card className="bg-background/95 backdrop-blur-sm border-2 border-secondary/20 shadow-2xl">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="font-[family-name:var(--font-montserrat)] text-sm sm:text-lg flex items-center gap-1 sm:gap-2">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
            {data.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-[family-name:var(--font-open-sans)] leading-relaxed">
            {data.description}
          </p>
          <div className="space-y-1 sm:space-y-2">
            {data.specs.map((spec, index) => (
              <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                {spec}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function NavigationHints() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-30 animate-in slide-in-from-left-2 duration-500 hidden sm:block">
      <Card className="bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg max-w-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-xs sm:text-sm font-[family-name:var(--font-montserrat)]">Navigation</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-xs"
            >
              ×
            </Button>
          </div>
          <div className="space-y-1 sm:space-y-2 text-xs text-muted-foreground">
            <p>• Scroll to explore different sections</p>
            <p>• Click hotspots for detailed info</p>
            <p>• Drag to rotate the model</p>
            <p>• Scroll wheel to zoom</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
