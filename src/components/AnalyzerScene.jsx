import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIsClient } from '../hooks/useIsClient'
import { Stars, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* Six growth pillars — colours match the AI Analyzer teaser card on the
   homepage (AIAnalyzerSection) so the visual language is consistent
   between the teaser and the real tool. */
const PILLARS = [
  { key: 'digitalPresence', color: '#2E55E0' },
  { key: 'leadGeneration',  color: '#E8155A' },
  { key: 'automation',      color: '#8B5CF6' },
  { key: 'conversion',      color: '#059669' },
  { key: 'branding',        color: '#D97706' },
  { key: 'marketing',       color: '#0891B2' },
]

/* ── Central "engine" — a distorted, breathing icosahedron ── */
function AnalyzerCore({ pulse }) {
  const matRef = useRef()
  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = (Math.sin(clock.elapsedTime * 0.7) + 1) / 2
      matRef.current.emissiveIntensity = 0.35 + t * 0.25 + pulse * 0.3
    }
  })
  return (
    <mesh>
      <icosahedronGeometry args={[1.25, 32]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#0D1F6B"
        emissive="#E8155A"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.6}
        distort={0.32}
        speed={2}
      />
    </mesh>
  )
}

/* ── Wireframe shell rotating slowly around the core ── */
function WireShell() {
  const outerRef = useRef()
  const innerRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (outerRef.current) { outerRef.current.rotation.y = t * 0.14; outerRef.current.rotation.x = Math.sin(t * 0.1) * 0.15 }
    if (innerRef.current) { innerRef.current.rotation.y = -t * 0.1 }
  })
  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#E8155A" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

/* ── Thin orbit guide ring the pillar nodes travel around ── */
function OrbitGuide() {
  const ref = useRef()
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.04 })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.3, 0, 0]}>
      <torusGeometry args={[2.3, 0.006, 8, 120]} />
      <meshBasicMaterial color="#6E8BFF" transparent opacity={0.22} />
    </mesh>
  )
}

/* ── Vertical scanning ring — echoes the ScanBeam effect on the homepage teaser ── */
function ScanBeam({ speed }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.elapsedTime * speed) % 1
    ref.current.position.y = -2 + t * 4
    ref.current.material.opacity = 0.45 * Math.sin(t * Math.PI)
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.12, 2.3, 48]} />
      <meshBasicMaterial color="#E8155A" transparent opacity={0} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

/* ── One glowing node per growth pillar. `lit` = has been evaluated;
   `level` (0..1) sizes the node — used in report mode to reflect the
   business's actual score for that pillar. ── */
function PillarNode({ color, angle, radius, lit, level }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    const a = angle + t * 0.1
    ref.current.position.set(Math.cos(a) * radius, Math.sin(t * 0.5 + angle) * 0.15, Math.sin(a) * radius)
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.35
  })
  const baseScale = 0.16 + level * 0.14
  return (
    <mesh ref={ref} scale={lit ? baseScale : baseScale * 0.5}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={lit ? 0.85 : 0.12}
        roughness={0.3}
        metalness={0.5}
        transparent
        opacity={lit ? 1 : 0.3}
      />
    </mesh>
  )
}

function PillarRing({ litCount, levels }) {
  return (
    <group>
      {PILLARS.map((p, i) => {
        const angle = (i / PILLARS.length) * Math.PI * 2
        const lit = i < litCount
        const level = levels ? Math.max(0.15, (levels[p.key] ?? 0) / 100) : 1
        return <PillarNode key={p.key} color={p.color} angle={angle} radius={2.3} lit={lit} level={level} />
      })}
    </group>
  )
}

/* ── Mouse parallax camera with slow idle drift ── */
function CameraController() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.8
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    target.current.x += (mouse.current.x - target.current.x) * 0.04
    target.current.y += (mouse.current.y - target.current.y) * 0.04
    const t = clock.elapsedTime
    camera.position.x = target.current.x * 0.7 + Math.sin(t * 0.08) * 0.2
    camera.position.y = -target.current.y * 0.4 + Math.cos(t * 0.1) * 0.15
    camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * A 3D "growth engine" visual for the AI Business Analyzer.
 * mode: 'intake' (progress 0..1 drives how many pillar nodes are lit as the
 *       user fills the form), 'loading' (fast scan, all pillars pulse in),
 *       'report' (all pillars lit, sized by the user's real computed scores).
 */
export default function AnalyzerScene({ mode = 'intake', progress = 0, scores = null, starCount = 1400 }) {
  const isClient = useIsClient()
  if (!isClient) return null

  const litCount = mode === 'report' ? 6 : Math.max(0, Math.min(6, Math.round(progress * 6)))
  const pulse = mode === 'loading' ? 0.7 : mode === 'report' ? 0.35 : 0.15
  const beamSpeed = mode === 'loading' ? 1.3 : 0.35

  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 48 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <Stars radius={90} depth={45} count={starCount} factor={3.2} fade speed={0.4} />
      <Sparkles count={45} scale={[10, 7, 6]} size={2} speed={0.3} opacity={0.4} color="#9db4ff" />

      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={22} color="#E8155A" />
      <pointLight position={[-4, -2, -3]} intensity={16} color="#2E55E0" />
      <pointLight position={[0, 5, 2]} intensity={8} color="#ffffff" />

      <AnalyzerCore pulse={pulse} />
      <WireShell />
      <OrbitGuide />
      <ScanBeam speed={beamSpeed} />
      <PillarRing litCount={litCount} levels={mode === 'report' ? scores : null} />
      <CameraController />
    </Canvas>
  )
}
