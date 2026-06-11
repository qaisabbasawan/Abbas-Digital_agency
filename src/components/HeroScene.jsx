import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── Liquid energy core — organic distorted sphere ── */
function LiquidCore() {
  const matRef = useRef()

  useFrame(({ clock }) => {
    if (matRef.current) {
      // slow colour breathing between brand blue and violet
      const t = (Math.sin(clock.elapsedTime * 0.35) + 1) / 2
      matRef.current.emissiveIntensity = 0.35 + t * 0.3
    }
  })

  return (
    <mesh>
      <icosahedronGeometry args={[1.9, 48]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#2E55E0"
        emissive="#1A3BBF"
        emissiveIntensity={0.45}
        roughness={0.18}
        metalness={0.55}
        distort={0.42}
        speed={1.8}
      />
    </mesh>
  )
}

/* ── Rotating wireframe shell around the core ── */
function WireShell() {
  const outerRef = useRef()
  const innerRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12
      outerRef.current.rotation.x = Math.sin(t * 0.1) * 0.18
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.08
      innerRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <group>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.75, 2]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2.45, 1]} />
        <meshBasicMaterial color="#E8155A" wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

/* ── Two tilted orbit rings sweeping around the core ── */
function OrbitRings() {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.2) * 0.1
      ring1.current.rotation.z = t * 0.22
    }
    if (ring2.current) {
      ring2.current.rotation.x = -Math.PI / 2.8 + Math.cos(t * 0.18) * 0.1
      ring2.current.rotation.z = -t * 0.16
    }
  })

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[3.3, 0.012, 8, 128]} />
        <meshBasicMaterial color="#E8155A" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.75, 0.008, 8, 128]} />
        <meshBasicMaterial color="#2E55E0" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

/* ── Comet dots travelling along the rings ── */
function OrbitComets() {
  const comet1 = useRef()
  const comet2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (comet1.current) {
      comet1.current.position.set(Math.cos(t * 0.55) * 3.3, Math.sin(t * 0.55) * 3.3 * 0.42, Math.sin(t * 0.55) * 3.3 * 0.9)
    }
    if (comet2.current) {
      comet2.current.position.set(Math.cos(-t * 0.4 + 2) * 3.75, Math.sin(-t * 0.4 + 2) * 3.75 * -0.35, Math.sin(-t * 0.4 + 2) * 3.75 * 0.92)
    }
  })

  return (
    <group>
      <mesh ref={comet1}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#FF2D72" />
      </mesh>
      <mesh ref={comet2}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#6E8BFF" />
      </mesh>
    </group>
  )
}

/* ── Galaxy particle cloud surrounding the core ── */
function Particles() {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#2E55E0'),
      new THREE.Color('#E8155A'),
      new THREE.Color('#7C3AED'),
      new THREE.Color('#6E8BFF'),
    ]

    for (let i = 0; i < count; i++) {
      const r = 3.6 + Math.pow(Math.random(), 1.6) * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.elapsedTime
      pointsRef.current.rotation.y = t * 0.03
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.1
      // gentle breathing
      const s = 1 + Math.sin(t * 0.4) * 0.025
      pointsRef.current.scale.setScalar(s)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Floating wireframe shapes drifting in depth ── */
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4,
      ],
      type: i % 3,
      color: ['#2E55E0', '#E8155A', '#7C3AED'][i % 3],
      opacity: 0.12 + Math.random() * 0.12,
      scale: 0.25 + Math.random() * 0.4,
      floatSpeed: 0.6 + Math.random() * 1.2,
      rotIntensity: 0.4 + Math.random() * 0.8,
    }))
  }, [])

  return (
    <group>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={shape.floatSpeed}
          rotationIntensity={shape.rotIntensity}
          floatIntensity={1.4}
        >
          <mesh position={shape.position} scale={shape.scale}>
            {shape.type === 0 ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : shape.type === 1 ? (
              <octahedronGeometry args={[0.7]} />
            ) : (
              <torusKnotGeometry args={[0.45, 0.16, 64, 8]} />
            )}
            <meshBasicMaterial color={shape.color} wireframe transparent opacity={shape.opacity} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ── Mouse parallax camera with smooth easing ── */
function CameraController() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 1.1
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.7
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    target.current.x += (mouse.current.x - target.current.x) * 0.04
    target.current.y += (mouse.current.y - target.current.y) * 0.04
    // mouse parallax + slow idle drift so the scene never feels static
    const t = clock.elapsedTime
    camera.position.x = target.current.x * 0.9 + Math.sin(t * 0.1) * 0.25
    camera.position.y = -target.current.y * 0.6 + Math.cos(t * 0.13) * 0.18
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 55 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <Stars radius={120} depth={60} count={3500} factor={4} fade speed={0.6} />
      <Sparkles count={90} scale={[14, 9, 8]} size={2.2} speed={0.35} opacity={0.55} color="#9db4ff" />

      <ambientLight intensity={0.35} />
      <pointLight position={[5, 3, 5]} intensity={28} color="#2E55E0" />
      <pointLight position={[-5, -2, -4]} intensity={20} color="#E8155A" />
      <pointLight position={[0, 6, 2]} intensity={10} color="#ffffff" />

      <LiquidCore />
      <WireShell />
      <OrbitRings />
      <OrbitComets />
      <Particles />
      <FloatingShapes />
      <CameraController />
    </Canvas>
  )
}
