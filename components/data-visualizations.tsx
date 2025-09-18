"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const fuelConsumptionData = [
  { altitude: 0, consumption: 12000 },
  { altitude: 10000, consumption: 8500 },
  { altitude: 20000, consumption: 6800 },
  { altitude: 30000, consumption: 5200 },
  { altitude: 40000, consumption: 4800 },
  { altitude: 43000, consumption: 4600 },
]

const performanceData = [
  { metric: "Takeoff", distance: 3000 },
  { metric: "Landing", distance: 2500 },
  { metric: "Cruise Speed", distance: 1087 },
  { metric: "Max Speed", distance: 1185 },
]

const capacityComparison = [
  { aircraft: "A380", passengers: 853, range: 15200 },
  { aircraft: "Boeing 747", passengers: 660, range: 14815 },
  { aircraft: "Boeing 777", passengers: 550, range: 17370 },
  { aircraft: "A350", passengers: 440, range: 17000 },
]

export function FuelConsumptionChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2">
          ⛽ Fuel Consumption by Altitude
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            consumption: {
              label: "Fuel Consumption (L/h)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fuelConsumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="altitude" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="var(--color-chart-1)"
                strokeWidth={3}
                dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function PerformanceChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2">
          📊 Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            distance: {
              label: "Distance/Speed",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="distance" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function AircraftComparison() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2">
          🛩️ Aircraft Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {capacityComparison.map((aircraft, index) => (
            <div key={aircraft.aircraft} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold font-[family-name:var(--font-montserrat)]">{aircraft.aircraft}</span>
                <Badge variant={index === 0 ? "default" : "secondary"}>{aircraft.passengers} passengers</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Passenger Capacity</p>
                  <Progress value={(aircraft.passengers / 853) * 100} className="mt-1" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Range (km)</p>
                  <Progress value={(aircraft.range / 17370) * 100} className="mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function TechnicalSpecs() {
  const specs = [
    {
      category: "Dimensions",
      items: [
        { label: "Length", value: "72.72 m", detail: "238.6 ft" },
        { label: "Wingspan", value: "79.75 m", detail: "261.8 ft" },
        { label: "Height", value: "24.09 m", detail: "79.0 ft" },
        { label: "Wing Area", value: "845 m²", detail: "9,100 sq ft" },
      ],
    },
    {
      category: "Performance",
      items: [
        { label: "Max Speed", value: "Mach 0.89", detail: "1,087 km/h" },
        { label: "Cruise Speed", value: "Mach 0.85", detail: "1,020 km/h" },
        { label: "Range", value: "15,200 km", detail: "8,208 nmi" },
        { label: "Service Ceiling", value: "13,100 m", detail: "43,000 ft" },
      ],
    },
    {
      category: "Weights",
      items: [
        { label: "Empty Weight", value: "277,000 kg", detail: "610,000 lb" },
        { label: "Max Takeoff", value: "575,000 kg", detail: "1,267,000 lb" },
        { label: "Max Landing", value: "394,000 kg", detail: "869,000 lb" },
        { label: "Max Fuel", value: "320,000 L", detail: "84,535 US gal" },
      ],
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {specs.map((category) => (
        <Card key={category.category} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-montserrat)] text-lg">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div key={item.label} className="border-b border-border pb-2 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function EngineDetails() {
  const engineSpecs = [
    { label: "Engine Options", value: "Rolls-Royce Trent 900 / Engine Alliance GP7200" },
    { label: "Number of Engines", value: "4" },
    { label: "Thrust per Engine", value: "70,000-80,000 lbf (311-356 kN)" },
    { label: "Total Thrust", value: "280,000-320,000 lbf" },
    { label: "Bypass Ratio", value: "8.5:1 - 8.7:1" },
    { label: "Fan Diameter", value: "2.95 m (116 in)" },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2">
          🔧 Engine Specifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {engineSpecs.map((spec, index) => (
            <div key={spec.label} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-sm">{spec.label}</span>
              <span className="text-sm text-primary font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function CabinConfiguration() {
  const configurations = [
    {
      airline: "Emirates",
      first: 14,
      business: 76,
      economy: 427,
      total: 517,
      layout: "3-class",
    },
    {
      airline: "Singapore Airlines",
      first: 12,
      business: 86,
      economy: 343,
      total: 441,
      layout: "3-class",
    },
    {
      airline: "Lufthansa",
      first: 8,
      business: 80,
      economy: 420,
      total: 508,
      layout: "3-class",
    },
    {
      airline: "All-Economy",
      first: 0,
      business: 0,
      economy: 853,
      total: 853,
      layout: "1-class",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-montserrat)] flex items-center gap-2">
          🪑 Cabin Configurations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {configurations.map((config) => (
            <div key={config.airline} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold font-[family-name:var(--font-montserrat)]">{config.airline}</h4>
                <Badge variant="outline">{config.total} seats</Badge>
              </div>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="text-center">
                  <p className="text-muted-foreground">First</p>
                  <p className="font-semibold text-primary">{config.first}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Business</p>
                  <p className="font-semibold text-secondary">{config.business}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Economy</p>
                  <p className="font-semibold text-accent">{config.economy}</p>
                </div>
                <div className="text-center">
                  <p className="text-muted-foreground">Layout</p>
                  <p className="font-semibold">{config.layout}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
