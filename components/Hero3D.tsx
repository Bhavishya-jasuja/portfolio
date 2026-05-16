"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Shared mouse state updated by Hero.tsx
export const heroMouse = { x: 0, y: 0 };

// ── Wireframe icosahedron with inner glow ──────────────────────────────────
function IcoCore() {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    // Auto-rotation
    outerRef.current.rotation.y += delta * 0.14;
    outerRef.current.rotation.x += delta * 0.07;
    innerRef.current.rotation.y = outerRef.current.rotation.y;
    innerRef.current.rotation.x = outerRef.current.rotation.x;
  });

  return (
    <>
      {/* Translucent inner fill — backface to show interior glow */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshPhongMaterial
          color="#1a1750"
          emissive="#3730a3"
          emissiveIntensity={0.55}
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.48}
        />
      </mesh>
    </>
  );
}

// ── Orbital ring ────────────────────────────────────────────────────────────
function Ring({
  radius,
  tube,
  color,
  opacity,
  rotX,
  rotZ,
  speed,
}: {
  radius: number;
  tube: number;
  color: string;
  opacity: number;
  rotX: number;
  rotZ: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, tube, 2, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// ── Particle cloud ───────────────────────────────────────────────────────────
function Particles({ count = 160 }: { count?: number }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute on a shell between r=2.3 and r=4.2
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.3 + Math.random() * 1.9;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#a5b4fc"
        size={0.03}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// ── Main scene group — handles mouse + scroll reactivity ─────────────────────
function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.14;

    // Smooth mouse tilt (lerp)
    groupRef.current.rotation.x +=
      (-heroMouse.y * 0.28 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z +=
      (-heroMouse.x * 0.15 - groupRef.current.rotation.z) * 0.04;

    // Scroll-driven fade + lift
    const scrollFraction = Math.min(
      window.scrollY / (window.innerHeight * 0.75),
      1
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, 1 - scrollFraction * 0.45, 0.08)
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      -scrollFraction * 1.8,
      0.06
    );
  });

  return (
    <group ref={groupRef}>
      <IcoCore />

      {/* Equatorial ring */}
      <Ring
        radius={2.18} tube={0.008} color="#6366f1" opacity={0.55}
        rotX={Math.PI / 2} rotZ={0} speed={0.28}
      />
      {/* Tilted ring 1 */}
      <Ring
        radius={2.52} tube={0.006} color="#8b5cf6" opacity={0.38}
        rotX={Math.PI * 0.32} rotZ={Math.PI * 0.1} speed={-0.18}
      />
      {/* Tilted ring 2 */}
      <Ring
        radius={2.85} tube={0.005} color="#60a5fa" opacity={0.25}
        rotX={Math.PI * 0.12} rotZ={Math.PI * 0.42} speed={0.12}
      />

      <Particles count={160} />
    </group>
  );
}

// ── Canvas export (rendered inside dynamic import, client-only) ─────────────
export default function Hero3DCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      {/* Lighting for inner sphere depth */}
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={2.2} color="#6366f1" />
      <pointLight position={[-4, -3, -3]} intensity={1.0} color="#8b5cf6" />

      <SceneGroup />
    </Canvas>
  );
}
