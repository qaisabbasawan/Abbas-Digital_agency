import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles, Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/* Six bespoke hero scenes — one per service. Each scene is themed around
   what the service actually does, shares the same parallax camera and
   star field, and sits right-of-centre on desktop. */

/* Shared unit geometries (scaled per use) */
const PLANE_EDGES = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1))
const BOX_EDGES = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1))

/* ════════════════ WEB — digital globe + holographic browser windows ════════════════ */

const BROWSER_PANELS = [
  { pos: [-2.6, 1.1, 0.6],  rotY:  0.5, w: 1.7, h: 1.1, float: 1.4 },
  { pos: [2.7, -0.2, 0.9],  rotY: -0.55, w: 1.5, h: 1.0, float: 1.1 },
  { pos: [-2.1, -1.4, 1.1], rotY:  0.4, w: 1.3, h: 0.85, float: 1.7 },
]

function BrowserPanel({ pos, rotY, w, h, float }) {
  const lines = [0.62, 0.46, 0.72, 0.38]
  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={float} position={pos}>
      <group rotation={[0, rotY, 0]}>
        {/* glass body */}
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial color="#0a1130" transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        {/* glowing frame */}
        <lineSegments geometry={PLANE_EDGES} scale={[w, h, 1]}>
          <lineBasicMaterial color="#2E55E0" transparent opacity={0.8} />
        </lineSegments>
        {/* header bar + traffic dots */}
        <mesh position={[0, h / 2 - 0.09, 0.002]}>
          <planeGeometry args={[w - 0.08, 0.1]} />
          <meshBasicMaterial color="#2E55E0" transparent opacity={0.3} />
        </mesh>
        {[0, 1, 2].map(i => (
          <mesh key={i} position={[-w / 2 + 0.12 + i * 0.1, h / 2 - 0.09, 0.004]}>
            <circleGeometry args={[0.022, 12]} />
            <meshBasicMaterial color={['#E8155A', '#F59E0B', '#059669'][i]} />
          </mesh>
        ))}
        {/* code lines */}
        {lines.map((len, i) => (
          <mesh key={i} position={[-w / 2 + 0.1 + (len * (w - 0.3)) / 2, h / 2 - 0.3 - i * 0.16, 0.004]}>
            <planeGeometry args={[len * (w - 0.3), 0.045]} />
            <meshBasicMaterial color={i % 2 ? '#E8155A' : '#5C7CFF'} transparent opacity={0.75} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function WebScene() {
  const globeRef = useRef()
  useFrame(({ clock }) => {
    if (globeRef.current) globeRef.current.rotation.y = clock.elapsedTime * 0.12
  })
  return (
    <group>
      <group ref={globeRef}>
        <mesh>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.32} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.05, 48, 48]} />
          <MeshDistortMaterial color="#0D1F6B" emissive="#1A3BBF" emissiveIntensity={0.6} roughness={0.25} metalness={0.5} distort={0.25} speed={1.6} />
        </mesh>
      </group>
      {/* latitude rings */}
      {[[Math.PI / 2.05, 0, 0.3], [Math.PI / 2.3, 0, -0.5], [Math.PI / 1.8, 0, 1.2]].map((tilt, i) => (
        <mesh key={i} rotation={tilt}>
          <torusGeometry args={[1.9 + i * 0.28, 0.006, 8, 120]} />
          <meshBasicMaterial color={i === 1 ? '#E8155A' : '#2E55E0'} transparent opacity={0.3} />
        </mesh>
      ))}
      {BROWSER_PANELS.map((p, i) => <BrowserPanel key={i} {...p} />)}
    </group>
  )
}

/* ════════════════ COMMERCE — product carousel + rising coins ════════════════ */

const COIN_STATES = Array.from({ length: 9 }, () => ({
  x: (Math.random() - 0.5) * 5.5,
  z: (Math.random() - 0.5) * 3,
  y: -2.5 + Math.random() * 5,
  speed: 0.45 + Math.random() * 0.5,
  spin: 1 + Math.random() * 1.6,
}))

function Coins() {
  const groupRef = useRef()
  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((coin, i) => {
      const s = COIN_STATES[i]
      s.y += s.speed * delta
      if (s.y > 2.8) s.y = -2.8
      coin.position.set(s.x, s.y, s.z)
      coin.rotation.y += s.spin * delta
      const edge = Math.min(1, (2.8 - Math.abs(s.y)) / 0.8)
      coin.children.forEach(m => { m.material.opacity = 0.85 * edge })
    })
  })
  return (
    <group ref={groupRef}>
      {COIN_STATES.map((_, i) => (
        <group key={i} rotation={[Math.PI / 2.4, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.14, 0.14, 0.035, 24]} />
            <meshStandardMaterial color="#F59E0B" emissive="#B45309" emissiveIntensity={0.6} metalness={0.9} roughness={0.25} transparent />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function PackageRing() {
  const ringRef = useRef()
  const colors = ['#E8155A', '#2E55E0', '#F59E0B', '#E8155A', '#7C3AED', '#2E55E0']
  useFrame(({ clock }) => {
    if (!ringRef.current) return
    ringRef.current.rotation.y = clock.elapsedTime * 0.32
    ringRef.current.children.forEach((box, i) => {
      box.rotation.x = clock.elapsedTime * 0.5 + i
      box.rotation.z = clock.elapsedTime * 0.3 + i * 0.7
    })
  })
  return (
    <group rotation={[0.28, 0, -0.06]}>
      {/* conveyor track */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.008, 8, 140]} />
        <meshBasicMaterial color="#E8155A" transparent opacity={0.35} />
      </mesh>
      <group ref={ringRef}>
        {colors.map((c, i) => {
          const a = (i / colors.length) * Math.PI * 2
          return (
            <group key={i} position={[Math.cos(a) * 2.55, 0, Math.sin(a) * 2.55]}>
              <mesh>
                <boxGeometry args={[0.42, 0.42, 0.42]} />
                <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.35} roughness={0.3} metalness={0.5} />
              </mesh>
              <lineSegments geometry={BOX_EDGES} scale={[0.46, 0.46, 0.46]}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.4} />
              </lineSegments>
            </group>
          )
        })}
      </group>
    </group>
  )
}

function CommerceScene() {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.95, 48]} />
        <MeshDistortMaterial color="#E8155A" emissive="#B00C44" emissiveIntensity={0.55} roughness={0.2} metalness={0.5} distort={0.35} speed={2} />
      </mesh>
      <mesh scale={1.4}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#E8155A" wireframe transparent opacity={0.1} />
      </mesh>
      <PackageRing />
      <Coins />
    </group>
  )
}

/* ════════════════ MOBILE — holographic phone + orbiting app icons ════════════════ */

const APP_TILES = ['#E8155A', '#2E55E0', '#0891B2', '#059669', '#F59E0B', '#7C3AED', '#E8155A', '#2E55E0', '#0891B2', '#F59E0B', '#059669', '#7C3AED']
const APP_ORBITERS = [
  { color: '#E8155A', radius: 2.5, speed: 0.55, y: 0.9, phase: 0 },
  { color: '#0891B2', radius: 2.8, speed: -0.4, y: -0.5, phase: 1.6 },
  { color: '#059669', radius: 2.35, speed: 0.48, y: -1.2, phase: 3.1 },
  { color: '#F59E0B', radius: 3.0, speed: -0.34, y: 0.3, phase: 4.4 },
  { color: '#2E55E0', radius: 2.65, speed: 0.42, y: 1.5, phase: 5.5 },
]

function AppOrbiter({ color, radius, speed, y, phase }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 1.7) * 0.15, Math.sin(t) * radius)
      ref.current.rotation.x = t * 0.8
      ref.current.rotation.y = t * 0.6
    }
  })
  return (
    <group ref={ref}>
      <RoundedBox args={[0.34, 0.34, 0.1]} radius={0.07} smoothness={3}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.3} metalness={0.4} />
      </RoundedBox>
    </group>
  )
}

function MobileScene() {
  const phoneRef = useRef()
  const screenRef = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(t * 0.4) * 0.45
      phoneRef.current.position.y = Math.sin(t * 0.7) * 0.18
    }
    if (screenRef.current) screenRef.current.emissiveIntensity = 0.5 + (Math.sin(t * 1.2) + 1) * 0.2
  })
  return (
    <group>
      <group ref={phoneRef} rotation={[0.05, 0, 0]}>
        <RoundedBox args={[1.6, 3.2, 0.16]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0a0f2e" metalness={0.8} roughness={0.25} emissive="#7C3AED" emissiveIntensity={0.08} />
        </RoundedBox>
        {/* screen */}
        <mesh position={[0, 0, 0.085]}>
          <planeGeometry args={[1.42, 3.0]} />
          <meshStandardMaterial ref={screenRef} color="#120a30" emissive="#7C3AED" emissiveIntensity={0.5} roughness={0.4} />
        </mesh>
        {/* app grid on screen */}
        {APP_TILES.map((c, i) => {
          const col = i % 3, row = Math.floor(i / 3)
          return (
            <mesh key={i} position={[-0.42 + col * 0.42, 0.95 - row * 0.46, 0.09]}>
              <planeGeometry args={[0.27, 0.27]} />
              <meshBasicMaterial color={c} transparent opacity={0.88} />
            </mesh>
          )
        })}
        {/* notch + home bar */}
        <mesh position={[0, 1.38, 0.09]}>
          <planeGeometry args={[0.42, 0.07]} />
          <meshBasicMaterial color="#05071a" />
        </mesh>
        <mesh position={[0, -1.34, 0.09]}>
          <planeGeometry args={[0.5, 0.035]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </group>
      {/* halo ring */}
      <mesh rotation={[Math.PI / 2.3, 0, 0.4]}>
        <torusGeometry args={[2.5, 0.007, 8, 130]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.35} />
      </mesh>
      {APP_ORBITERS.map((o, i) => <AppOrbiter key={i} {...o} />)}
    </group>
  )
}

/* ════════════════ AI — neural constellation with travelling pulses ════════════════ */

const NEURAL = (() => {
  const nodes = Array.from({ length: 40 }, () => {
    const r = 1.5 + Math.random() * 1.2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.8,
      r * Math.cos(phi),
    )
  })
  const edges = []
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++)
      if (nodes[i].distanceTo(nodes[j]) < 1.25) edges.push([i, j])
  const linePositions = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], k) => {
    linePositions.set([...nodes[a].toArray(), ...nodes[b].toArray()], k * 6)
  })
  return { nodes, edges, linePositions }
})()

const PULSE_STATES = Array.from({ length: 7 }, () => ({
  edge: Math.floor(Math.random() * NEURAL.edges.length),
  t: Math.random(),
  speed: 0.5 + Math.random() * 0.7,
}))

function NeuralNet() {
  const nodesRef = useRef()
  const pulsesRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    if (nodesRef.current) {
      NEURAL.nodes.forEach((p, i) => {
        dummy.position.copy(p)
        dummy.scale.setScalar(0.045 * (1 + 0.45 * Math.sin(t * 1.6 + i * 1.3)))
        dummy.updateMatrix()
        nodesRef.current.setMatrixAt(i, dummy.matrix)
      })
      nodesRef.current.instanceMatrix.needsUpdate = true
    }
    if (pulsesRef.current) {
      PULSE_STATES.forEach((p, i) => {
        p.t += p.speed * delta
        if (p.t > 1) {
          p.t = 0
          p.edge = Math.floor(Math.random() * NEURAL.edges.length)
        }
        const [a, b] = NEURAL.edges[p.edge]
        dummy.position.lerpVectors(NEURAL.nodes[a], NEURAL.nodes[b], p.t)
        dummy.scale.setScalar(0.055)
        dummy.updateMatrix()
        pulsesRef.current.setMatrixAt(i, dummy.matrix)
      })
      pulsesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group>
      <instancedMesh ref={nodesRef} args={[null, null, NEURAL.nodes.length]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.9} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[NEURAL.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#0891B2" transparent opacity={0.22} />
      </lineSegments>
      <instancedMesh ref={pulsesRef} args={[null, null, PULSE_STATES.length]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </group>
  )
}

function AIScene() {
  const netRef = useRef()
  useFrame(({ clock }) => {
    if (netRef.current) netRef.current.rotation.y = clock.elapsedTime * 0.08
  })
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[0.85, 48]} />
        <MeshDistortMaterial color="#0891B2" emissive="#0E7490" emissiveIntensity={0.6} roughness={0.2} metalness={0.5} distort={0.4} speed={2.2} />
      </mesh>
      <group ref={netRef}>
        <NeuralNet />
      </group>
    </group>
  )
}

/* ════════════════ MARKETING — 3D growth chart + rising particles ════════════════ */

const BAR_HEIGHTS = [0.5, 0.85, 0.7, 1.25, 1.6, 1.45, 2.2]

const RISER_STATES = Array.from({ length: 22 }, () => ({
  x: (Math.random() - 0.5) * 5,
  z: (Math.random() - 0.5) * 2.5,
  y: -2.4 + Math.random() * 5,
  speed: 0.5 + Math.random() * 0.8,
  size: 0.03 + Math.random() * 0.04,
}))

function Risers() {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame((_, delta) => {
    if (!meshRef.current) return
    RISER_STATES.forEach((p, i) => {
      p.y += p.speed * delta
      if (p.y > 2.6) p.y = -2.6
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(p.size * Math.min(1, (2.6 - Math.abs(p.y)) / 0.7))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={meshRef} args={[null, null, RISER_STATES.length]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#34D399" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  )
}

function GrowthCurve() {
  const geom = useMemo(() => {
    const pts = BAR_HEIGHTS.map((h, i) =>
      new THREE.Vector3(-1.95 + i * 0.65, -1.3 + h + 0.45, 0.4))
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.018, 8, false)
  }, [])
  const last = BAR_HEIGHTS.length - 1
  return (
    <group>
      <mesh geometry={geom}>
        <meshBasicMaterial color="#34D399" transparent opacity={0.85} />
      </mesh>
      {/* arrowhead */}
      <mesh position={[-1.95 + last * 0.65 + 0.18, -1.3 + BAR_HEIGHTS[last] + 0.62, 0.4]} rotation={[0, 0, -1.1]}>
        <coneGeometry args={[0.09, 0.26, 12]} />
        <meshBasicMaterial color="#34D399" />
      </mesh>
    </group>
  )
}

function MarketingScene() {
  const barsRef = useRef()
  useFrame(({ clock }) => {
    if (!barsRef.current) return
    barsRef.current.children.forEach((bar, i) => {
      const h = BAR_HEIGHTS[i] * (1 + 0.07 * Math.sin(clock.elapsedTime * 1.4 + i * 0.8))
      bar.scale.y = h
      bar.position.y = -1.3 + h / 2
    })
  })
  return (
    <group rotation={[0.1, -0.35, 0]}>
      {/* platform */}
      <mesh position={[0, -1.36, 0]}>
        <boxGeometry args={[5, 0.06, 1.6]} />
        <meshStandardMaterial color="#071226" emissive="#059669" emissiveIntensity={0.12} metalness={0.6} roughness={0.4} transparent opacity={0.85} />
      </mesh>
      <lineSegments geometry={BOX_EDGES} scale={[5, 0.06, 1.6]} position={[0, -1.36, 0]}>
        <lineBasicMaterial color="#059669" transparent opacity={0.5} />
      </lineSegments>
      {/* bars (unit height, scaled in useFrame) */}
      <group ref={barsRef}>
        {BAR_HEIGHTS.map((h, i) => (
          <mesh key={i} position={[-1.95 + i * 0.65, -1.3 + h / 2, 0]}>
            <boxGeometry args={[0.4, 1, 0.4]} />
            <meshStandardMaterial
              color="#059669"
              emissive="#059669"
              emissiveIntensity={0.25 + (h / 2.2) * 0.5}
              roughness={0.3}
              metalness={0.5}
              transparent
              opacity={0.92}
            />
          </mesh>
        ))}
      </group>
      <GrowthCurve />
      <Risers />
    </group>
  )
}

/* ════════════════ BRAND — liquid blob + orbiting creative primitives ════════════════ */

const BRAND_SHAPES = [
  { kind: 'torus', color: '#E8155A', radius: 2.5, speed: 0.42, y: 0.9, phase: 0, size: 0.3 },
  { kind: 'cone', color: '#2E55E0', radius: 2.8, speed: -0.34, y: -0.6, phase: 1.5, size: 0.32 },
  { kind: 'ico', color: '#7C3AED', radius: 2.4, speed: 0.5, y: -1.3, phase: 3.0, size: 0.3 },
  { kind: 'sphere', color: '#0891B2', radius: 3.0, speed: -0.28, y: 0.4, phase: 4.2, size: 0.24 },
  { kind: 'knot', color: '#F59E0B', radius: 2.6, speed: 0.36, y: 1.5, phase: 5.3, size: 0.22 },
]

function BrandShape({ kind, color, radius, speed, y, phase, size }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 1.4) * 0.2, Math.sin(t) * radius)
      ref.current.rotation.x = t
      ref.current.rotation.y = t * 0.7
    }
  })
  return (
    <mesh ref={ref}>
      {kind === 'torus' && <torusGeometry args={[size, size * 0.4, 16, 40]} />}
      {kind === 'cone' && <coneGeometry args={[size, size * 1.8, 24]} />}
      {kind === 'ico' && <icosahedronGeometry args={[size, 0]} />}
      {kind === 'sphere' && <sphereGeometry args={[size, 24, 24]} />}
      {kind === 'knot' && <torusKnotGeometry args={[size, size * 0.32, 80, 10]} />}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.25} metalness={0.55} />
    </mesh>
  )
}

function SwatchFan() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.4
  })
  const colors = ['#E8155A', '#F59E0B', '#2E55E0']
  return (
    <group ref={ref}>
      <group position={[1.9, 0.2, 0]} rotation={[0.2, 0.5, 0]}>
        {colors.map((c, i) => (
          <mesh key={c} rotation={[0, 0, -0.35 + i * 0.35]} position={[0, 0, i * 0.03]}>
            <planeGeometry args={[0.35, 0.9]} />
            <meshBasicMaterial color={c} transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function BrandScene() {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.1, 48]} />
        <MeshDistortMaterial color="#D97706" emissive="#92400E" emissiveIntensity={0.55} roughness={0.25} metalness={0.5} distort={0.5} speed={1.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0.5]}>
        <torusGeometry args={[2.2, 0.007, 8, 130]} />
        <meshBasicMaterial color="#D97706" transparent opacity={0.35} />
      </mesh>
      <SwatchFan />
      {BRAND_SHAPES.map((s, i) => <BrandShape key={i} {...s} />)}
    </group>
  )
}

/* ════════════════ Shared plumbing ════════════════ */

const SCENES = {
  web: WebScene,
  commerce: CommerceScene,
  mobile: MobileScene,
  ai: AIScene,
  marketing: MarketingScene,
  brand: BrandScene,
}

/* Shift right on desktop, scale down on mobile, slow precession */
function Positioner({ children }) {
  const groupRef = useRef()
  const { viewport, size } = useThree()
  const desktop = size.width >= 1024
  const x = desktop ? viewport.width * 0.21 : 0
  const scale = desktop ? 1 : 0.58

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.16
    }
  })

  return (
    <group ref={groupRef} position={[x, 0.1, 0]} scale={scale}>
      {children}
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

export default function ServiceScene({ variant = 'web', color = '#2E55E0' }) {
  const Scene = SCENES[variant] || WebScene
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <Stars radius={110} depth={50} count={2400} factor={3.5} fade speed={0.5} />
      <Sparkles count={50} scale={[14, 8, 7]} size={2} speed={0.3} opacity={0.45} color={color} />

      <ambientLight intensity={0.45} />
      <pointLight position={[5, 3, 5]} intensity={24} color={color} />
      <pointLight position={[-5, -2, -4]} intensity={14} color="#2E55E0" />
      <pointLight position={[0, 6, 2]} intensity={9} color="#ffffff" />

      <Positioner>
        <Scene />
      </Positioner>
      <CameraController />
    </Canvas>
  )
}
