import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ════════════════════════════════════════════════════════════════
   NeuralSpine — a living AI brain column running down the centre of
   the services section. Glowing nodes scattered around the vertical
   axis, pulsing edges, a signal rippling top-to-bottom in a loop,
   orbiting electron particles, junction blob eruptions where each
   service card crystallizes, and a camera that travels down the
   spine as the user scrolls (store.p = 0..1).
   ════════════════════════════════════════════════════════════════ */

export const CARD_STEP = 2.2          // world units between card junctions
export const DROP = CARD_STEP * 5     // total camera travel
export const CAM_Z = 7
export const FOV = 50

const TOP_Y = 2.2
const SPAN = DROP + 4.5               // network length below the top

const C_TOP = new THREE.Color('#2E55E0')
const C_MID = new THREE.Color('#7C3AED')
const C_BOT = new THREE.Color('#FF2D72')
const WHITE = new THREE.Color('#ffffff')

const colorAt = (t) =>
  t < 0.5
    ? C_TOP.clone().lerp(C_MID, t * 2)
    : C_MID.clone().lerp(C_BOT, (t - 0.5) * 2)

function buildNetwork() {
  const nodes = []
  const count = 44
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const y = TOP_Y - t * SPAN
    nodes.push({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 1.7,
        y + (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 1.7,
      ),
      r: 0.05 + Math.random() * 0.055,
      t,
      baseColor: colorAt(t),
    })
  }
  const edges = []
  for (let i = 0; i < count - 1; i++) {
    edges.push([i, i + 1])
    if (i < count - 2 && Math.random() > 0.45) edges.push([i, i + 2])
    if (i < count - 3 && Math.random() > 0.72) edges.push([i, i + 3])
  }
  return { nodes, edges }
}

/* ── Nodes + pulsing edges ── */
function Network({ store }) {
  const { nodes, edges } = useMemo(buildNetwork, [])
  const nodeRefs = useRef([])
  const lineRef = useRef()
  const tmp = useMemo(() => new THREE.Color(), [])

  const linePositions = useMemo(() => {
    const pos = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      pos.set([...nodes[a].pos.toArray(), ...nodes[b].pos.toArray()], i * 6)
    })
    return pos
  }, [nodes, edges])

  const lineColors = useMemo(() => new Float32Array(edges.length * 6), [edges])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const camY = -store.p * DROP
    /* the activation signal travels the spine top-to-bottom on a loop */
    const signalY = TOP_Y + 0.6 - ((t * 2.4) % (SPAN + 1.5))
    const breath = 1 + Math.sin(t * 0.7) * 0.045

    nodes.forEach((n, i) => {
      const m = nodeRefs.current[i]
      if (!m) return
      const revealed = n.pos.y > camY - 4.6
      const glow = Math.exp(-Math.pow((n.pos.y - signalY) * 1.6, 2))
      const target = revealed ? (1 + glow * 1.2) * breath : 0
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, target, 0.085))
      tmp.copy(n.baseColor).lerp(WHITE, glow * 0.75)
      m.material.color.copy(tmp)
    })

    const colAttr = lineRef.current?.geometry?.attributes?.color
    if (colAttr) {
      edges.forEach(([a, b], i) => {
        const midY = (nodes[a].pos.y + nodes[b].pos.y) / 2
        const revealed = midY > camY - 4.6 ? 1 : 0
        const glow = Math.exp(-Math.pow((midY - signalY) * 1.4, 2))
        const k = revealed * (0.22 + glow * 1.0)
        for (const [slot, ni] of [[0, a], [1, b]]) {
          tmp.copy(nodes[ni].baseColor).lerp(WHITE, glow * 0.5).multiplyScalar(k)
          const o = i * 6 + slot * 3
          colAttr.array[o] = tmp.r
          colAttr.array[o + 1] = tmp.g
          colAttr.array[o + 2] = tmp.b
        }
      })
      colAttr.needsUpdate = true
    }
  })

  return (
    <group>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos} ref={el => { nodeRefs.current[i] = el }} scale={0}>
          <sphereGeometry args={[n.r, 14, 14]} />
          <meshBasicMaterial color={n.baseColor} transparent opacity={0.95} />
        </mesh>
      ))}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

/* ── Electron particles orbiting random nodes ── */
function Electrons({ store }) {
  const refs = useRef([])
  const electrons = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      anchorY: TOP_Y - Math.random() * SPAN,
      anchorX: (Math.random() - 0.5) * 1.4,
      anchorZ: (Math.random() - 0.5) * 1.4,
      r: 0.22 + Math.random() * 0.2,
      speed: 1.2 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      tilt: Math.random() * Math.PI,
      color: colorAt(Math.random()),
    })), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const camY = -store.p * DROP
    electrons.forEach((e, i) => {
      const m = refs.current[i]
      if (!m) return
      const a = t * e.speed + e.phase
      m.position.set(
        e.anchorX + Math.cos(a) * e.r,
        e.anchorY + Math.sin(a) * e.r * Math.cos(e.tilt),
        e.anchorZ + Math.sin(a) * e.r * Math.sin(e.tilt),
      )
      const revealed = e.anchorY > camY - 4.6
      m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, revealed ? 1 : 0, 0.08))
    })
  })

  return electrons.map((e, i) => (
    <mesh key={i} ref={el => { refs.current[i] = el }} scale={0}>
      <sphereGeometry args={[0.028, 10, 10]} />
      <meshBasicMaterial color={e.color} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  ))
}

/* ── Junction eruptions — creative energy crystallizing into cards ── */
const JUNCTION_COLORS = [
  ['#2DD4BF', '#2E55E0'],
  ['#E8155A', '#A855F7'],
  ['#7C3AED', '#2DD4BF'],
  ['#0891B2', '#FF2D72'],
  ['#2DD4BF', '#059669'],
  ['#FF2D72', '#D97706'],
]

function Junctions({ store }) {
  const groups = useRef([])
  const mats = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    for (let i = 0; i < 6; i++) {
      const g = groups.current[i]
      if (!g) continue
      const center = i / 5
      /* erupts as its card crystallizes, idles softly otherwise */
      const bell = Math.exp(-Math.pow((store.p - center) * 7, 2))
      const intensity = 0.10 + bell * 0.95
      g.scale.setScalar(0.3 + intensity * 0.95)
      g.rotation.y = t * (0.3 + i * 0.06)
      g.rotation.z = Math.sin(t * 0.25 + i * 1.3) * 0.45
      const m1 = mats.current[i * 2]
      const m2 = mats.current[i * 2 + 1]
      if (m1) m1.opacity = intensity * 0.5
      if (m2) m2.opacity = intensity * 0.38
    }
  })

  return Array.from({ length: 6 }).map((_, i) => {
    const side = i % 2 === 0 ? -1 : 1
    const [cA, cB] = JUNCTION_COLORS[i]
    return (
      <group
        key={i}
        ref={el => { groups.current[i] = el }}
        position={[side * 0.85, -i * CARD_STEP, 0.3]}
      >
        <mesh position={[0.25, 0.15, 0]}>
          <icosahedronGeometry args={[0.85, 24]} />
          <MeshDistortMaterial
            ref={el => { mats.current[i * 2] = el }}
            color={cA} emissive={cA} emissiveIntensity={0.6}
            roughness={0.3} distort={0.62} speed={3.1}
            transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false}
          />
        </mesh>
        <mesh position={[-0.3, -0.2, 0.15]}>
          <icosahedronGeometry args={[0.65, 24]} />
          <MeshDistortMaterial
            ref={el => { mats.current[i * 2 + 1] = el }}
            color={cB} emissive={cB} emissiveIntensity={0.6}
            roughness={0.3} distort={0.7} speed={3.8}
            transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false}
          />
        </mesh>
      </group>
    )
  })
}

/* ── Camera travels down the spine with the scroll ── */
function Rig({ store }) {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5)
      mouse.current.y = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.05
    target.current.y += (mouse.current.y - target.current.y) * 0.05
    const camY = -store.p * DROP
    camera.position.set(target.current.x * 0.55, camY - target.current.y * 0.3, CAM_Z)
    camera.lookAt(0, camY, 0)
  })

  return null
}

export default function NeuralSpine({ store }) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.6]}
    >
      <Stars radius={100} depth={50} count={2200} factor={3} fade speed={0.4} />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 2, 5]} intensity={18} color="#2E55E0" />
      <pointLight position={[-4, -6, 4]} intensity={16} color="#FF2D72" />

      <Network store={store} />
      <Electrons store={store} />
      <Junctions store={store} />
      <Rig store={store} />
    </Canvas>
  )
}
