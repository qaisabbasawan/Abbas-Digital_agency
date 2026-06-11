import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* Compact 3D brand core — the centrepiece of the services orbit showcase.
   A liquid energy sphere with wire shells, two sweeping rings and comets. */

function Core() {
  const matRef = useRef()
  const shellRef = useRef()
  const shell2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.45 + ((Math.sin(t * 0.6) + 1) / 2) * 0.4
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = t * 0.18
      shellRef.current.rotation.x = Math.sin(t * 0.14) * 0.25
    }
    if (shell2Ref.current) {
      shell2Ref.current.rotation.y = -t * 0.12
      shell2Ref.current.rotation.z = t * 0.08
    }
  })

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.25, 48]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#2E55E0"
          emissive="#1A3BBF"
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.55}
          distort={0.42}
          speed={2.1}
        />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color="#E8155A" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh ref={shell2Ref}>
        <icosahedronGeometry args={[1.95, 2]} />
        <meshBasicMaterial color="#2E55E0" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function Rings() {
  const r1 = useRef()
  const r2 = useRef()
  const c1 = useRef()
  const c2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (r1.current) { r1.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.2) * 0.1; r1.current.rotation.z = t * 0.25 }
    if (r2.current) { r2.current.rotation.x = -Math.PI / 2.7 + Math.cos(t * 0.17) * 0.1; r2.current.rotation.z = -t * 0.18 }
    if (c1.current) c1.current.position.set(Math.cos(t * 0.6) * 2.3, Math.sin(t * 0.6) * 2.3 * 0.42, Math.sin(t * 0.6) * 2.3 * 0.85)
    if (c2.current) c2.current.position.set(Math.cos(-t * 0.45 + 2) * 2.6, Math.sin(-t * 0.45 + 2) * 2.6 * -0.36, Math.sin(-t * 0.45 + 2) * 2.6 * 0.88)
  })

  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[2.3, 0.012, 8, 128]} />
        <meshBasicMaterial color="#E8155A" transparent opacity={0.5} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[2.6, 0.008, 8, 128]} />
        <meshBasicMaterial color="#2E55E0" transparent opacity={0.4} />
      </mesh>
      <mesh ref={c1}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#FF2D72" />
      </mesh>
      <mesh ref={c2}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#6E8BFF" />
      </mesh>
    </group>
  )
}

function SlowSpin({ children }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.1
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.15
    }
  })
  return <group ref={ref}>{children}</group>
}

export default function CoreElement() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 50 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.75]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={22} color="#2E55E0" />
      <pointLight position={[-4, -2, -3]} intensity={16} color="#E8155A" />

      <Sparkles count={30} scale={[6, 6, 5]} size={1.8} speed={0.3} opacity={0.5} color="#9db4ff" />

      <SlowSpin>
        <Core />
        <Rings />
      </SlowSpin>
    </Canvas>
  )
}
