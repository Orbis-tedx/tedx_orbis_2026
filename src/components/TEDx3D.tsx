import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";


function Plane({ variant = 0 }: { variant?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    mesh.current.rotation.x = Math.sin(t * 0.12) * 0.03;
    mesh.current.position.y = Math.sin(t * 0.5) * 0.06;
  });

  const svg = useMemo(() => {
    const style = variant === 0 ? { fill: '#e62b1e', bg: 'transparent', shadow: true } : { fill: '#e62b1e', bg: '#111', shadow: false };
    const text = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'>
      <rect width='100%' height='100%' fill='${style.bg}' />
      <g font-family='Arial, Helvetica, sans-serif' font-weight='900' font-size='240' text-anchor='middle'>
        ${style.shadow ? `<text x='50%' y='55%' fill='rgba(0,0,0,0.45)' transform='translate(10,10)'>TEDx</text>` : ''}
        <text x='50%' y='55%' fill='${style.fill}'>TEDx</text>
      </g>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(text)}`;
  }, [variant]);

  const texture = useMemo(() => new THREE.TextureLoader().load(svg), [svg]);

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <planeGeometry args={[3.2, 1.1]} />
      <meshStandardMaterial map={texture} transparent />
      {/* slight extrude illusion: a thin box behind */}
      <mesh position={[0, -0.02, -0.02]}> 
        <boxGeometry args={[3.2, 1.1, 0.02]} />
        <meshStandardMaterial color={'#0b0b0b'} metalness={0.1} roughness={0.6} />
      </mesh>
    </mesh>
  );
}

export default function TEDx3D({ variant = 0 }: { variant?: number }) {
  const [v, setV] = useState(variant);
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-4, -2, -2]} intensity={0.25} />
      <Plane variant={v} />
      {/* click to switch variant */}
      <mesh onClick={() => setV((s) => (s === 0 ? 1 : 0))} position={[0, -2.2, 0]}>
        <planeGeometry args={[0.001, 0.001]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </Canvas>
  );
}
