"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, useGLTF, Html } from "@react-three/drei"
import { Suspense, useRef, useState, useMemo, useCallback, useEffect } from "react"
import { useTransform, useMotionValue } from "framer-motion"
import type { Group } from "three"
import * as THREE from "three"

interface CameraPosition {
  position: [number, number, number]
  target: [number, number, number]
  fov?: number
}

const cameraPositions: Record<string, CameraPosition> = {
  intro: { position: [15, 8, 15], target: [0, 0, 0], fov: 50 },
  engines: { position: [8, 2, -5], target: [-2, -1, -3], fov: 45 },
  wings: { position: [0, 10, 8], target: [0, 0, 0], fov: 60 },
  cockpit: { position: [12, 3, 2], target: [8, 2, 0], fov: 40 },
  cabin: { position: [5, 5, 0], target: [0, 0, 0], fov: 55 },
  specs: { position: [20, 12, 20], target: [0, 0, 0], fov: 65 },
}

const hotspots = [
  {
    id: "engine-left",
    position: [-8, -2, -4] as [number, number, number],
    label: "Engine",
    description: "Rolls-Royce Trent 900",
    section: "engines",
  },
  {
    id: "engine-right",
    position: [8, -2, -4] as [number, number, number],
    label: "Engine",
    description: "80,000 lbf thrust",
    section: "engines",
  },
  {
    id: "cockpit",
    position: [0, 2, 12] as [number, number, number],
    label: "Cockpit",
    description: "Fly-by-wire controls",
    section: "cockpit",
  },
  {
    id: "wing-tip",
    position: [15, 0, 0] as [number, number, number],
    label: "Wing",
    description: "79.75m wingspan",
    section: "wings",
  },
]

function Hotspot({
  position,
  label,
  description,
  isActive,
  onClick,
}: {
  position: [number, number, number]
  label: string
  description: string
  isActive: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 16, 16), [])
  const ringGeometry = useMemo(() => new THREE.RingGeometry(0.08, 0.12, 32), [])

  const sphereMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isActive ? "#8b5cf6" : hovered ? "#1f2937" : "#ffffff",
        transparent: true,
        opacity: 0.8,
      }),
    [isActive, hovered],
  )

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#8b5cf6",
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      }),
    [],
  )

  const handlePointerOver = useCallback(() => setHovered(true), [])
  const handlePointerOut = useCallback(() => setHovered(false), [])

  return (
    <group position={position}>
      <mesh
        geometry={sphereGeometry}
        material={sphereMaterial}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered ? 1.2 : 1}
      />
      {(hovered || isActive) && (
        <Html distanceFactor={10} position={[0, 0.3, 0]}>
          <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg pointer-events-none max-w-32 sm:max-w-none">
            <p className="font-semibold text-xs sm:text-sm text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground hidden sm:block">{description}</p>
          </div>
        </Html>
      )}
      {(hovered || isActive) && (
        <mesh geometry={ringGeometry} material={ringMaterial} position={[0, 0, 0]} scale={[2, 2, 2]} />
      )}
    </group>
  )
}

function AnimatedCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  const controlsRef = useRef<any>()

  const rotationY = useTransform(useMotionValue(scrollProgress), [0, 1], [0, Math.PI * 2])
  const positionX = useTransform(useMotionValue(scrollProgress), [0, 0.2, 0.4, 0.6, 0.8, 1], [15, 8, 0, 12, 5, 20])
  const positionY = useTransform(useMotionValue(scrollProgress), [0, 0.2, 0.4, 0.6, 0.8, 1], [8, 2, 10, 3, 5, 12])
  const positionZ = useTransform(useMotionValue(scrollProgress), [0, 0.2, 0.4, 0.6, 0.8, 1], [15, -5, 8, 2, 0, 20])
  const fov = useTransform(useMotionValue(scrollProgress), [0, 0.2, 0.4, 0.6, 0.8, 1], [50, 45, 60, 40, 55, 65])

  useFrame(() => {
    if (!controlsRef.current) return

    const currentScrollProgress = scrollProgress
    rotationY.set(currentScrollProgress)
    positionX.set(currentScrollProgress)
    positionY.set(currentScrollProgress)
    positionZ.set(currentScrollProgress)
    fov.set(currentScrollProgress)

    const newPosition = new THREE.Vector3(positionX.get(), positionY.get(), positionZ.get())

    const sections = Object.keys(cameraPositions)
    const sectionIndex = Math.floor(scrollProgress * sections.length)
    const currentSection = sections[Math.min(sectionIndex, sections.length - 1)]
    const current = cameraPositions[currentSection]

    const newTarget = new THREE.Vector3(...current.target)

    camera.position.lerp(newPosition, 0.1)
    camera.fov = THREE.MathUtils.lerp(camera.fov, fov.get(), 0.1)
    camera.updateProjectionMatrix()

    controlsRef.current.target.lerp(newTarget, 0.1)
    controlsRef.current.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      minDistance={5}
      maxDistance={100}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI - Math.PI / 6}
      enableDamping={true}
      dampingFactor={0.05}
    />
  )
}

function A380Model({
  scrollProgress,
  activeHotspot,
  onHotspotClick,
}: {
  scrollProgress: number
  activeHotspot: string | null
  onHotspotClick: (hotspotId: string) => void
}) {
  const group = useRef<Group>(null)
  const [modelError, setModelError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const { gltf, scene } = useGLTF("/models/a380.glb", true)

  useEffect(() => {
    if (gltf && gltf.scene) {
      setIsLoading(false)
      setModelError(false)
      console.log("[v0] A380 model loaded successfully")
    } else if (gltf === null || !gltf.scene) {
      setModelError(true)
      setIsLoading(false)
      console.warn("[v0] A380 model failed to load, using fallback")
    }
  }, [gltf])

  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  const modelRotationY = useTransform(useMotionValue(scrollProgress), [0, 1], [0, Math.PI * 0.5])
  const modelPositionY = useTransform(useMotionValue(scrollProgress), [0, 0.5, 1], [0, -1, 0])
  const modelScale = useTransform(useMotionValue(scrollProgress), [0, 0.5, 1], [0.8, 1.2, 1])

  const emissiveColor = useMemo(() => new THREE.Color(hoveredPart ? 0x8b5cf6 : 0x000000), [hoveredPart])
  const emissiveIntensity = hoveredPart ? 0.1 : 0

  useFrame(() => {
    if (group.current) {
      modelRotationY.set(scrollProgress)
      modelPositionY.set(scrollProgress)
      modelScale.set(scrollProgress)

      group.current.rotation.y = modelRotationY.get()
      group.current.position.y = modelPositionY.get()
      group.current.scale.setScalar(modelScale.get())

      if (hoveredPart) {
        group.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.MeshStandardMaterial
            if (!material.emissive.equals(emissiveColor)) {
              material.emissive = emissiveColor
              material.emissiveIntensity = emissiveIntensity
            }
          }
        })
      }
    }
  })

  const handlePointerOver = useCallback(() => setHoveredPart("aircraft"), [])
  const handlePointerOut = useCallback(() => setHoveredPart(null), [])

  const fallbackGeometry = useMemo(() => {
    const geometry = new THREE.Group()

    // Fuselage
    const fuselageGeometry = new THREE.CylinderGeometry(1, 0.8, 12, 16)
    const fuselageMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 })
    const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial)
    fuselage.rotation.z = Math.PI / 2
    geometry.add(fuselage)

    // Wings
    const wingGeometry = new THREE.BoxGeometry(16, 0.2, 3)
    const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 })
    const wings = new THREE.Mesh(wingGeometry, wingMaterial)
    wings.position.set(0, -0.5, 0)
    geometry.add(wings)

    // Tail
    const tailGeometry = new THREE.BoxGeometry(0.2, 4, 2)
    const tailMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 })
    const tail = new THREE.Mesh(tailGeometry, tailMaterial)
    tail.position.set(-5.5, 1, 0)
    geometry.add(tail)

    // Engines
    const engineGeometry = new THREE.CylinderGeometry(0.6, 0.6, 2, 12)
    const engineMaterial = new THREE.MeshStandardMaterial({ color: 0xd0d0d0 })

    const engine1 = new THREE.Mesh(engineGeometry, engineMaterial)
    engine1.position.set(0, -1.5, -4)
    engine1.rotation.z = Math.PI / 2
    geometry.add(engine1)

    const engine2 = new THREE.Mesh(engineGeometry, engineMaterial)
    engine2.position.set(0, -1.5, 4)
    engine2.rotation.z = Math.PI / 2
    geometry.add(engine2)

    return geometry
  }, [])

  if (isLoading) {
    return (
      <Html center>
        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-foreground">Loading A380 Model...</p>
          <p className="text-muted-foreground text-sm">Please wait</p>
        </div>
      </Html>
    )
  }

  if (modelError || !scene) {
    console.log("[v0] Using fallback airplane geometry")
    return (
      <group ref={group} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
        <primitive object={fallbackGeometry} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} />
        {hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            position={hotspot.position}
            label={hotspot.label}
            description={hotspot.description}
            isActive={activeHotspot === hotspot.id}
            onClick={() => onHotspotClick(hotspot.id)}
          />
        ))}
        <Html position={[0, 3, 0]} center>
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-2 text-center">
            <p className="text-xs text-foreground">A380 Model (Simplified)</p>
          </div>
        </Html>
      </group>
    )
  }

  return (
    <group ref={group} scale={[1, 1, 1]} position={[0, 0, 0]}>
      <primitive object={scene} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} />
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          position={hotspot.position}
          label={hotspot.label}
          description={hotspot.description}
          isActive={activeHotspot === hotspot.id}
          onClick={() => onHotspotClick(hotspot.id)}
        />
      ))}
    </group>
  )
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg p-4 sm:p-6">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
        <span className="ml-2 sm:ml-3 text-sm sm:text-base text-foreground font-[family-name:var(--font-open-sans)]">
          Loading A380 Model...
        </span>
      </div>
    </Html>
  )
}

interface ThreeSceneProps {
  scrollProgress: number
  activeHotspot: string | null
  onHotspotClick: (hotspotId: string) => void
}

export default function ThreeScene({ scrollProgress, activeHotspot, onHotspotClick }: ThreeSceneProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="three-canvas">
      <Canvas
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={typeof window !== "undefined" ? (isMobile ? 1 : Math.min(window.devicePixelRatio, 2)) : 1}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={isMobile ? [20, 10, 20] : [15, 8, 15]} fov={isMobile ? 60 : 50} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow={!isMobile} />
        {!isMobile && <directionalLight position={[-10, 5, -5]} intensity={0.8} />}
        <pointLight position={[0, 10, 0]} intensity={0.6} />
        {!isMobile && <spotLight position={[15, 15, 15]} angle={0.3} intensity={0.8} />}

        <Suspense fallback={<LoadingSpinner />}>
          <A380Model scrollProgress={scrollProgress} activeHotspot={activeHotspot} onHotspotClick={onHotspotClick} />
          <Environment preset="sunset" />
        </Suspense>

        <AnimatedCamera scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}

if (typeof window !== "undefined") {
  console.log("[v0] A380 model will use fallback geometry")
}
