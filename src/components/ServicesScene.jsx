import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* Six services = six electrons, one vision = one nucleus.
   Hero-contained scene: each electron carries its service colour
   on its own tilted orbital ring. */
const ORBITALS = [
  { color: '#2E55E0', radius: 2.35, speed: 0.50,  tilt: [Math.PI / 2.2, 0, 0],            phase: 0.0 }, // Web
  { color: '#E8155A', radius: 2.85, speed: -0.40, tilt: [Math.PI / 2.5, 0, Math.PI / 3],  phase: 1.1 }, // E-Commerce
  { color: '#7C3AED', radius: 3.35, speed: 0.32,  tilt: [Math.PI / 1.9, 0, -Math.PI / 4], phase: 2.2 }, // Mobile
  { color: '#0891B2', radius: 2.60, speed: -0.46, tilt: [Math.PI / 2.8, 0, Math.PI / 6],  phase: 3.3 }, // AI
  { color: '#059669', radius: 3.10, speed: 0.37,  tilt: [Math.PI / 2.1, 0, Math.PI / 2],  phase: 4.4 }, // Marketing
  { color: '#D97706', radius: 3.60, speed: -0.30, tilt: [Math.PI / 2.4, 0, -Math.PI / 6], phase: 5.5 }, // Branding
]

/* ── Liquid energy nucleus ── */
function Nucleus() {
  const matRef = useRef()

  useFrame(({ clock }) => {
    if (matRef.current) {
      const t = (Math.sin(clock.elapsedTime * 0.5) + 1) / 2
      matRef.current.emissiveIntensity = 0.4 + t * 0.35
    }
  })

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.15, 48]} />
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
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#E8155A" wireframe transparent opacity={0.09} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

/* ── One electron + its orbital ring ── */
function Orbital({ color, radius, speed, tilt, phase }) {
  const electronRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase
    if (electronRef.current) {
      electronRef.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
    }
  })

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.0065, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      <group ref={electronRef}>
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

/* ── The whole atom, shifted right on desktop, slowly precessing ── */
function Atom() {
  const groupRef = useRef()
  const { viewport, size } = useThree()
  const desktop = size.width >= 1024
  const x = desktop ? viewport.width * 0.21 : 0
  const scale = desktop ? 1 : 0.62

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.07
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[x, 0.15, 0]} scale={scale}>
      <Nucleus />
      {ORBITALS.map((o, i) => <Orbital key={i} {...o} />)}
    </group>
  )
}

/* ── Mouse parallax camera with idle drift ── */
function CameraController() {
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
    camera.position.x = target.current.x * 0.8 + Math.sin(t * 0.1) * 0.2
    camera.position.y = -target.current.y * 0.5 + Math.cos(t * 0.12) * 0.15
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function ServicesScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <Stars radius={110} depth={50} count={2800} factor={3.5} fade speed={0.5} />
      <Sparkles count={70} scale={[13, 8, 7]} size={2} speed={0.3} opacity={0.5} color="#9db4ff" />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={26} color="#2E55E0" />
      <pointLight position={[-5, -2, -4]} intensity={18} color="#E8155A" />
      <pointLight position={[0, 6, 2]} intensity={9} color="#ffffff" />

      <Atom />
      <CameraController />
    </Canvas>
  )
}
