import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIsClient } from '../hooks/useIsClient'
import { Stars, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* Knowledge constellation — floating category shards orbit a liquid
   "idea core". Each shard carries one blog-category colour. */
const SHARDS = [
  { color: '#2E55E0', pos: [-4.4,  1.6, -1.5], size: 0.50, rot: 0.55 }, // Web
  { color: '#E8155A', pos: [ 4.8,  1.9, -2.0], size: 0.42, rot: 0.42 }, // E-Commerce
  { color: '#7C3AED', pos: [-3.5, -1.7, -1.0], size: 0.38, rot: 0.68 }, // Mobile
  { color: '#0891B2', pos: [ 3.7, -1.4, -0.6], size: 0.46, rot: 0.38 }, // AI
  { color: '#059669', pos: [-5.8,  0.1, -3.0], size: 0.34, rot: 0.50 }, // Marketing
  { color: '#D97706', pos: [ 5.6,  0.3, -3.4], size: 0.40, rot: 0.60 }, // Branding
  { color: '#F59E0B', pos: [-2.2,  2.4, -3.8], size: 0.30, rot: 0.45 }, // Case Studies
  { color: '#6366F1', pos: [ 2.3, -2.5, -3.2], size: 0.32, rot: 0.52 }, // Insights
]

/* One floating crystal shard: solid core + wireframe cage + additive halo */
function Shard({ color, pos, size, rot }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * rot
      ref.current.rotation.y = clock.elapsedTime * rot * 0.7
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.4} position={pos}>
      <group ref={ref}>
        <mesh>
          <octahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.25} metalness={0.6} />
        </mesh>
        <mesh scale={1.45}>
          <octahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.28} />
        </mesh>
        <mesh scale={2.3}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.07} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  )
}

/* Liquid idea core with two slow counter-rotating wireframe cages */
function IdeaCore() {
  const groupRef = useRef()
  const cageA = useRef()
  const cageB = useRef()
  const matRef = useRef()
  const { viewport, size } = useThree()
  const desktop = size.width >= 1024
  const x = desktop ? viewport.width * 0.22 : 0
  const scale = desktop ? 1 : 0.6

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
      groupRef.current.position.y = 0.2 + Math.sin(t * 0.4) * 0.15
    }
    if (cageA.current) cageA.current.rotation.x = t * 0.18
    if (cageB.current) cageB.current.rotation.z = -t * 0.14
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.45 + (Math.sin(t * 0.7) + 1) * 0.18
    }
  })

  return (
    <group ref={groupRef} position={[x, 0.2, -0.5]} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1.25, 48]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#2E55E0"
          emissive="#1A3BBF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.55}
          distort={0.42}
          speed={1.8}
        />
      </mesh>
      <mesh ref={cageA}>
        <torusKnotGeometry args={[1.9, 0.012, 160, 12, 2, 3]} />
        <meshBasicMaterial color="#E8155A" transparent opacity={0.3} />
      </mesh>
      <mesh ref={cageB}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

/* Mouse parallax camera with idle drift */
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

export default function BlogScene() {
  const isClient = useIsClient()
  if (!isClient) return null
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <Stars radius={110} depth={50} count={2600} factor={3.5} fade speed={0.5} />
      <Sparkles count={60} scale={[14, 8, 7]} size={2} speed={0.3} opacity={0.5} color="#9db4ff" />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={24} color="#2E55E0" />
      <pointLight position={[-5, -2, -4]} intensity={16} color="#E8155A" />
      <pointLight position={[0, 6, 2]} intensity={8} color="#ffffff" />

      <IdeaCore />
      {SHARDS.map((s, i) => <Shard key={i} {...s} />)}
      <CameraController />
    </Canvas>
  )
}
