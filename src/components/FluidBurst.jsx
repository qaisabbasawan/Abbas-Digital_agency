import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ════════════════════════════════════════════════════════════════
   FluidBurst — the connective tissue of the services carousel.
   An iridescent organic blob cloud (teal / purple / magenta / pink)
   that erupts in the centre of the screen between card transitions
   and dissolves as the next card locks into focus.

   `store.pos` is the carousel position (0..5) written by the page;
   burst intensity peaks halfway between two cards.
   ════════════════════════════════════════════════════════════════ */

const BLOBS = [
  { color: '#2DD4BF', offset: [ 0.55,  0.3,  0.2], r: 1.05, distort: 0.62, speed: 3.2 },
  { color: '#A855F7', offset: [-0.6,  -0.25, 0.4], r: 1.25, distort: 0.55, speed: 2.6 },
  { color: '#FF2D72', offset: [ 0.15, -0.55, -0.3], r: 0.95, distort: 0.7,  speed: 3.8 },
  { color: '#E8155A', offset: [-0.2,   0.6, -0.2], r: 0.8,  distort: 0.65, speed: 3.0 },
]

function BlobCloud({ store }) {
  const groupRef = useRef()
  const matRefs = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const p = store.pos
    const frac = p - Math.floor(p)
    /* 0 when a card is centred, 1 exactly between two cards */
    const burst = Math.sin(Math.PI * Math.min(Math.max(frac, 0), 1))

    if (groupRef.current) {
      const s = 0.45 + burst * 1.75
      groupRef.current.scale.setScalar(s)
      groupRef.current.rotation.y = t * 0.28
      groupRef.current.rotation.z = Math.sin(t * 0.22) * 0.35
      /* rises while erupting, settles while dissolving */
      groupRef.current.position.y = (burst - 0.35) * 0.7 + Math.sin(t * 0.5) * 0.12
    }
    matRefs.current.forEach((m, i) => {
      if (m) m.opacity = burst * (0.4 - i * 0.05)
    })
  })

  return (
    <group ref={groupRef}>
      {BLOBS.map((b, i) => (
        <mesh key={i} position={b.offset}>
          <icosahedronGeometry args={[b.r, 32]} />
          <MeshDistortMaterial
            ref={el => { matRefs.current[i] = el }}
            color={b.color}
            emissive={b.color}
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.2}
            distort={b.distort}
            speed={b.speed}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function FluidBurst({ store }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.6]}
    >
      <Stars radius={100} depth={50} count={2200} factor={3} fade speed={0.4} />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 5]} intensity={20} color="#A855F7" />
      <pointLight position={[-4, -2, 4]} intensity={16} color="#2DD4BF" />
      <BlobCloud store={store} />
    </Canvas>
  )
}
