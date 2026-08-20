import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Filament: coiled wire ────────────────────────────────────── */
function Filament({ lit }: { lit: boolean }) {
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const coils = 7, steps = 160;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * coils;
      pts.push(new THREE.Vector3(Math.cos(angle) * 0.15, -0.28 + t * 0.56, Math.sin(angle) * 0.15));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const geom = useMemo(() => new THREE.TubeGeometry(curve, 180, 0.011, 6, false), [curve]);
  const light = useRef<THREE.PointLight>(null);
  const mat = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light.current) {
      // stronger glow when lit, subtle breathing
      light.current.intensity = (lit ? 3.2 : 0.2) + Math.sin(t * 1.7) * (lit ? 0.45 : 0.05);
    }
    if (mat.current) {
      // animate emissive intensity
      mat.current.emissiveIntensity = lit ? 2.6 + Math.sin(t * 2.1) * 0.25 : 0.05;
    }
  });

  return (
    <group>
      <mesh geometry={geom}>
        <meshStandardMaterial ref={mat} color={"#ffd8a0"} emissive={new THREE.Color("#ffb86b")} metalness={0.1} roughness={0.4} />
      </mesh>
      {[-0.15, 0.15].map((x) => (
        <mesh key={x} position={[x, -0.6, 0]}>
          <cylinderGeometry args={[0.007, 0.007, 0.68, 6]} />
          <meshStandardMaterial color={"#3a3530"} metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
      <pointLight ref={light} color={"#ffbe7a"} intensity={2.8} distance={8} decay={2} />
    </group>
  );
}

/* ─── Bulb assembly ─────────────────────────────────────────────── */
function Bulb({ reduced, lit }: { reduced: boolean; lit: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = reduced ? 0.5 : t * 0.2;
    group.current.rotation.z = Math.sin(t * 0.3) * 0.04 + (pointer?.x ?? 0) * 0.07;
    group.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Glass envelope */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshPhysicalMaterial
          color={"#f6f1e8"} transmission={0.92} thickness={0.4}
          roughness={0.1} ior={1.42} transparent opacity={0.5} metalness={0}
        />
      </mesh>
      {/* Inner glow */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.46, 32, 32]} />
        <meshBasicMaterial color={"#ffd8a0"} transparent opacity={0.45} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.86, 0]}>
        <cylinderGeometry args={[0.3, 0.36, 0.42, 32, 1, true]} />
        <meshStandardMaterial color={"#e0d9ce"} metalness={0.1} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Screw base */}
      <mesh position={[0, -1.24, 0]}>
        <cylinderGeometry args={[0.32, 0.3, 0.42, 32]} />
        <meshStandardMaterial color={"#b5a990"} metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.14, 24]} />
        <meshStandardMaterial color={"#252220"} metalness={0.5} roughness={0.6} />
      </mesh>
      <Filament lit={lit} />
    </group>
  );
}

/* ─── Dust particles ────────────────────────────────────────────── */
function Dust({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 280;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (points.current && !reduced) {
      points.current.rotation.y = clock.getElapsedTime() * 0.025;
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.06;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color={"#e0d0b0"} size={0.018} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

/* ─── Canvas export ────────────────────────────────────────────── */
export default function BulbCanvas({ reduced = false }: { reduced?: boolean }) {
  const [lit, setLit] = useState(true);
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
      onPointerDown={() => setLit((s) => !s)}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 2]} intensity={0.65} color={"#fff3e0"} />
      <directionalLight position={[-4, -1, -2]} intensity={0.2} color={"#ffffff"} />
      {/* main warm light from the filament; pulses when lit */}
      <pointLight position={[0, 0.6, 0]} color={"#ffd6a0"} intensity={lit ? 2.2 : 0.08} distance={7} decay={2} />
      <Bulb reduced={reduced} lit={lit} />
      <Dust reduced={reduced} />
    </Canvas>
  );
}
