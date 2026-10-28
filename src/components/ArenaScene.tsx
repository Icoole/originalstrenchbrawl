import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import logoAsset from "@/assets/trench-brawl-logo.jpg.asset.json";

const LOGO_URL = logoAsset.url;

/** Soft radial alpha map so the square logo floats as a glowing round emblem. */
function useRadialAlpha() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.28, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.72, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function LogoEmblem() {
  const tex = useTexture(LOGO_URL);
  const alpha = useRadialAlpha();
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = 2.1 + Math.sin(clock.elapsedTime * 0.8) * 0.14;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={group} position={[0, 2.1, 0]}>
      <mesh>
        <planeGeometry args={[4.6, 4.6]} />
        <meshBasicMaterial
          map={tex}
          alphaMap={alpha}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Arena() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.6) * 0.2;
    }
  });

  return (
    <group>
      {/* dais */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[5.6, 6.2, 0.6, 64]} />
        <meshStandardMaterial color="#122a52" metalness={0.65} roughness={0.35} />
      </mesh>
      {/* arena floor */}
      <mesh position={[0, 0.01, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[5.6, 64]} />
        <meshStandardMaterial color="#0c1f42" metalness={0.5} roughness={0.55} />
      </mesh>
      {/* glowing boundary ring */}
      <mesh ref={ring} position={[0, 0.03, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[5.5, 5.9, 96]} />
        <meshBasicMaterial color="#3ec9f5" transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      {/* inner ember ring */}
      <mesh position={[0, 0.02, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[4.6, 4.68, 96]} />
        <meshBasicMaterial color="#ff9a2e" transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

function OrbitingOrbs() {
  const group = useRef<THREE.Group>(null);
  const orbs = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        angle: (i / 7) * Math.PI * 2,
        radius: 4.6 + (i % 2) * 0.9,
        y: 0.4 + (i % 3) * 0.5,
        size: 0.09 + (i % 3) * 0.04,
        color: i % 2 === 0 ? "#3ec9f5" : "#ff9a2e",
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.18;
  });

  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <mesh key={i} position={[Math.cos(o.angle) * o.radius, o.y, Math.sin(o.angle) * o.radius]}>
          <sphereGeometry args={[o.size, 16, 16]} />
          <meshBasicMaterial color={o.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Gentle camera parallax driven by the pointer. */
function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = -0.14; // slight lean so the emblem reads from a low angle
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, Math.min(delta * 2, 1));
  });
  return <group ref={group}>{children}</group>;
}

export default function ArenaScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapRef}
      data-arena
      className={className}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 2.4, 9.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => {
          wrapRef.current?.setAttribute("data-scene-ready", "");
        }}
      >
        <fog attach="fog" args={["#0a1c3a", 13, 28]} />
        <ambientLight intensity={0.55} />
        <pointLight position={[-6, 5, 5]} intensity={140} color="#3ec9f5" />
        <pointLight position={[6, 3.5, 2]} intensity={90} color="#ff9a2e" />
        <pointLight position={[0, 4, 6]} intensity={60} color="#8fd8ff" />
        <CameraRig>
          <Suspense fallback={null}>
            <LogoEmblem />
          </Suspense>
          <Arena />
          <OrbitingOrbs />
          <Sparkles count={90} scale={[16, 8, 16]} size={3} speed={0.35} color="#7ad9ff" position={[0, 3, 0]} />
          <Environment resolution={128}>
            <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} color="#bcdcff" />
            <Lightformer intensity={1.4} color="#3ec9f5" position={[-6, 1, -1]} rotation-y={Math.PI / 2} scale={[14, 2, 1]} />
            <Lightformer intensity={1.1} color="#ff9a2e" position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
          </Environment>
        </CameraRig>
      </Canvas>
    </div>
  );
}
