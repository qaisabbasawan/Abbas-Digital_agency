import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function WireGlobe() {
  const meshRef = useRef()
  const glowRef = useRef()

  const geometry = useMemo(() => new THREE.SphereGeometry(2.5, 32, 32), [])
  const glowGeo = useMemo(() => new THREE.SphereGeometry(2.7, 32, 32), [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x += 0.0005
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= 0.002
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#2E55E0"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh ref={glowRef} geometry={glowGeo}>
        <meshBasicMaterial
          color="#E8155A"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const blueColor = new THREE.Color('#1A3BBF')
    const pinkColor = new THREE.Color('#E8155A')

    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = Math.random() > 0.5 ? blueColor : pinkColor
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0003
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingShapes() {
  const shapesRef = useRef([])

  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      speed: (Math.random() - 0.5) * 0.008,
      speedY: (Math.random() - 0.5) * 0.004,
      type: i % 3,
      color: i % 2 === 0 ? '#2E55E0' : '#E8155A',
      opacity: 0.15 + Math.random() * 0.1,
      scale: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  useFrame(() => {
    shapesRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += shapes[i].speedY
        mesh.rotation.y += shapes[i].speed
        mesh.rotation.z += shapes[i].speed * 0.5
      }
    })
  })

  return (
    <group>
      {shapes.map((shape, i) => {
        const geo = shape.type === 0
          ? new THREE.BoxGeometry(1, 1, 1)
          : shape.type === 1
          ? new THREE.OctahedronGeometry(0.7)
          : new THREE.TetrahedronGeometry(0.8)

        return (
          <mesh
            key={i}
            ref={el => shapesRef.current[i] = el}
            position={shape.position}
            rotation={shape.rotation}
            scale={shape.scale}
          >
            <primitive object={geo} />
            <meshBasicMaterial
              color={shape.color}
              wireframe
              transparent
              opacity={shape.opacity}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.05
    target.current.y += (mouse.current.y - target.current.y) * 0.05
    camera.position.x = target.current.x * 0.5
    camera.position.y = -target.current.y * 0.3
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Stars radius={120} depth={60} count={3000} factor={4} fade speed={0.8} />

      <ambientLight intensity={0.3} />
      <pointLight position={[4, 2, 4]} intensity={2} color="#2E55E0" />
      <pointLight position={[-4, -2, -4]} intensity={1.5} color="#E8155A" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

      <WireGlobe />
      <Particles />
      <FloatingShapes />
      <CameraController />
    </Canvas>
  )
}
