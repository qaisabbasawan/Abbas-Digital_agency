import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* Signal beacon — a liquid energy sphere broadcasting expanding ripple
   rings while incoming "message" particles spiral in from deep space. */

const MESSAGE_COUNT = 42
const PALETTE = ['#2E55E0', '#E8155A', '#7C3AED', '#0891B2', '#ffffff']

/* Liquid beacon core */
function Beacon() {
  const matRef = useRef()
  const ringRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + (Math.sin(t * 1.4) + 1) * 0.25
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25
      ringRef.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.12
    }
  })

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.0, 48]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#E8155A"
          emissive="#B00C44"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.5}
          distort={0.35}
          speed={2.4}
        />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.12} />
      </mesh>
      {/* Equatorial saturn ring of the beacon */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 128]} />
        <meshBasicMaterial color="#2E55E0" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

/* Expanding broadcast ripples — three staggered rings scale up and fade */
function Ripples() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((ring, i) => {
      const p = (clock.elapsedTime * 0.28 + i / 3) % 1
      const s = 1.2 + p * 3.4
      ring.scale.set(s, s, s)
      ring.material.opacity = (1 - p) * 0.32
    })
  })

  return (
    <group ref={groupRef} rotation={[Math.PI / 2.4, 0, 0]}>
      {[0, 1, 2].map(i => (
        <mesh key={i}>
          <torusGeometry args={[1, 0.01, 8, 96]} />
          <meshBasicMaterial color={i % 2 ? '#E8155A' : '#2E55E0'} transparent opacity={0.3} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

const makeParticles = () =>
  Array.from({ length: MESSAGE_COUNT }, () => ({
    theta: Math.random() * Math.PI * 2,
    phi: (Math.random() - 0.5) * 1.4,
    radius: 3 + Math.random() * 7,
    speed: 0.6 + Math.random() * 1.1,
    spin: 0.4 + Math.random() * 0.7,
    size: 0.035 + Math.random() * 0.05,
    color: new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)]),
  }))

/* Incoming message particles spiralling toward the beacon */
function Messages() {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(makeParticles, [])

  useEffect(() => {
    particles.forEach((p, i) => meshRef.current?.setColorAt(i, p.color))
    if (meshRef.current?.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [particles])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    particles.forEach((p, i) => {
      p.radius -= p.speed * delta
      p.theta += p.spin * delta
      if (p.radius < 1.3) {
        // message absorbed — respawn at the rim
        p.radius = 8 + Math.random() * 3
        p.theta = Math.random() * Math.PI * 2
        p.phi = (Math.random() - 0.5) * 1.4
      }
      const fade = Math.min(1, (p.radius - 1.3) / 1.5)
      dummy.position.set(
        Math.cos(p.theta) * Math.cos(p.phi) * p.radius,
        Math.sin(p.phi) * p.radius * 0.55,
        Math.sin(p.theta) * Math.cos(p.phi) * p.radius,
      )
      dummy.scale.setScalar(p.size * (0.5 + fade * 0.5))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, MESSAGE_COUNT]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  )
}

/* Whole beacon group, shifted right on desktop, slow precession */
function BeaconSystem() {
  const groupRef = useRef()
  const { viewport, size } = useThree()
  const desktop = size.width >= 1024
  const x = desktop ? viewport.width * 0.22 : 0
  const scale = desktop ? 1 : 0.62

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.06
      groupRef.current.position.y = 0.1 + Math.sin(clock.elapsedTime * 0.35) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[x, 0.1, 0]} scale={scale}>
      <Beacon />
      <Ripples />
      <Messages />
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

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <Stars radius={110} depth={50} count={2600} factor={3.5} fade speed={0.5} />
      <Sparkles count={55} scale={[14, 8, 7]} size={2} speed={0.3} opacity={0.5} color="#ffb3cd" />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={22} color="#E8155A" />
      <pointLight position={[-5, -2, -4]} intensity={18} color="#2E55E0" />
      <pointLight position={[0, 6, 2]} intensity={8} color="#ffffff" />

      <BeaconSystem />
      <CameraController />
    </Canvas>
  )
}
