import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ════════════════════════════════════════════════════════════════
   ServicesScene — the full-page "digital universe" background.
   One sun (the vision), six service planets on tilted orbits,
   plus a 2,200-particle drift field in three depth layers.
   The camera pulls back and pans as the page scrolls.
   ════════════════════════════════════════════════════════════════ */

const ORBITALS = [
  { color: '#2E55E0', radius: 2.30, speed: 0.50,  tilt: [Math.PI / 2.2, 0, 0],            phase: 0.0 }, // Web
  { color: '#E8155A', radius: 2.80, speed: -0.40, tilt: [Math.PI / 2.5, 0, Math.PI / 3],  phase: 1.1 }, // E-Commerce
  { color: '#7C3AED', radius: 3.30, speed: 0.32,  tilt: [Math.PI / 1.9, 0, -Math.PI / 4], phase: 2.2 }, // Mobile
  { color: '#0891B2', radius: 2.55, speed: -0.46, tilt: [Math.PI / 2.8, 0, Math.PI / 6],  phase: 3.3 }, // AI
  { color: '#059669', radius: 3.05, speed: 0.37,  tilt: [Math.PI / 2.1, 0, Math.PI / 2],  phase: 4.4 }, // Marketing
  { color: '#D97706', radius: 3.60, speed: -0.30, tilt: [Math.PI / 2.4, 0, -Math.PI / 6], phase: 5.5 }, // Branding
]

/* Three depth layers of slow-drifting neon particles */
const PARTICLE_LAYERS = [
  { count: 950, size: 0.032, range: 17, speed: 0.010, opacity: 0.55 }, // far
  { count: 800, size: 0.050, range: 12, speed: 0.018, opacity: 0.75 }, // mid
  { count: 450, size: 0.080, range: 8,  speed: 0.028, opacity: 0.9  }, // near
]

const PALETTE = ['#2E55E0', '#E8155A', '#7C3AED', '#6E8BFF', '#9db4ff']

function DriftLayer({ count, size, range, speed, opacity, seed }) {
  const ref = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * range * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * range * 1.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * range - 2
      const c = new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)])
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count, range])

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime
      ref.current.rotation.y = t * speed + seed
      ref.current.position.y = Math.sin(t * 0.07 + seed) * 0.5
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── The sun — liquid morphing core with wire shells ── */
function Sun() {
  const matRef = useRef()

  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = (Math.sin(clock.elapsedTime * 0.5) + 1) / 2
      matRef.current.emissiveIntensity = 0.45 + t * 0.35
    }
  })

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.18, 48]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#2E55E0"
          emissive="#1A3BBF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.5}
          distort={0.38}
          speed={2}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.58, 1]} />
        <meshBasicMaterial color="#E8155A" wireframe transparent opacity={0.09} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.85, 2]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

/* ── One planet + its orbital ring ── */
function Orbital({ color, radius, speed, tilt, phase }) {
  const planetRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase
    if (planetRef.current) {
      planetRef.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
    }
  })

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.0065, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.22} />
      </mesh>
      <group ref={planetRef}>
        <mesh>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.19, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.34, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.13} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

/* ── Wide outer system rings ── */
function SystemRings() {
  const r1 = useRef()
  const r2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (r1.current) { r1.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.15) * 0.08; r1.current.rotation.z = t * 0.1 }
    if (r2.current) { r2.current.rotation.x = -Math.PI / 2.6 + Math.cos(t * 0.12) * 0.08; r2.current.rotation.z = -t * 0.07 }
  })

  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[4.5, 0.01, 8, 160]} />
        <meshBasicMaterial color="#E8155A" transparent opacity={0.3} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[5.1, 0.007, 8, 160]} />
        <meshBasicMaterial color="#2E55E0" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

/* ── The solar system, shifted right on desktop, precessing ── */
function SolarSystem() {
  const groupRef = useRef()
  const { viewport, size } = useThree()
  const desktop = size.width >= 1024
  const x = desktop ? viewport.width * 0.21 : 0
  const scale = desktop ? 1 : 0.6

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.07
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[x, 0.55, 0]} scale={scale}>
      <Sun />
      {ORBITALS.map((o, i) => <Orbital key={i} {...o} />)}
      <SystemRings />
    </group>
  )
}

/* ── Camera: mouse parallax + cinematic scroll pull-back ── */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 1.0
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.6
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    target.current.x += (mouse.current.x - target.current.x) * 0.04
    target.current.y += (mouse.current.y - target.current.y) * 0.04
    const t = clock.elapsedTime
    /* scroll-driven camera: pull back and rise as the page scrolls */
    const s = typeof window !== 'undefined' ? window.scrollY : 0
    const pullBack = Math.min(s * 0.0016, 3.2)
    const rise = Math.min(s * 0.0010, 1.8)
    camera.position.z = 8 + pullBack
    camera.position.x = target.current.x * 0.8 + Math.sin(t * 0.1) * 0.2
    camera.position.y = -target.current.y * 0.5 + Math.cos(t * 0.12) * 0.15 + rise
    camera.lookAt(0, rise * 0.5, 0)
  })

  return null
}

export default function ServicesScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.6]}
    >
      <Stars radius={120} depth={55} count={2600} factor={3.5} fade speed={0.5} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={26} color="#2E55E0" />
      <pointLight position={[-5, -2, -4]} intensity={18} color="#E8155A" />
      <pointLight position={[0, 6, 2]} intensity={9} color="#ffffff" />

      {PARTICLE_LAYERS.map((l, i) => <DriftLayer key={i} {...l} seed={i * 2.1} />)}
      <SolarSystem />
      <CameraRig />
    </Canvas>
  )
}
