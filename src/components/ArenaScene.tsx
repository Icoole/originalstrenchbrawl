import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import pepeAsset from "@/assets/fighter-pepe.png.asset.json";
import dogeAsset from "@/assets/fighter-doge.png.asset.json";
import shibaAsset from "@/assets/fighter-shiba.png.asset.json";
import flokiAsset from "@/assets/fighter-floki.png.asset.json";
import bonkAsset from "@/assets/fighter-bonk.png.asset.json";
import wifAsset from "@/assets/fighter-wif.png.asset.json";
import mogAsset from "@/assets/fighter-mog.png.asset.json";
import penguAsset from "@/assets/fighter-pengu.png.asset.json";
import turboAsset from "@/assets/fighter-turbo.png.asset.json";
import superinuAsset from "@/assets/fighter-superinu.png.asset.json";
import cashcatAsset from "@/assets/fighter-cashcat.png.asset.json";
import zcatAsset from "@/assets/fighter-zcat.png.asset.json";
import pnutAsset from "@/assets/fighter-pnut.png.asset.json";
import purrAsset from "@/assets/fighter-purr.png.asset.json";

/** Fighter portrait URLs in roster order. */
const FIGHTER_URLS = [
  pepeAsset.url,
  dogeAsset.url,
  shibaAsset.url,
  flokiAsset.url,
  bonkAsset.url,
  wifAsset.url,
  mogAsset.url,
  penguAsset.url,
  turboAsset.url,
  superinuAsset.url,
  cashcatAsset.url,
  zcatAsset.url,
  pnutAsset.url,
  purrAsset.url,
];

const RING_RADIUS = 4.5;
const CARD_Y = 2.55;

/**
 * A ring of fighter portrait cards slowly orbiting above the arena,
 * each backed by a cyan glow panel. Cards bob gently and face outward.
 */
function FighterCarousel() {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(FIGHTER_URLS);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.14;
  });

  const viewport = useThree((s) => s.viewport);
  const scale = Math.min(0.95, Math.max(0.55, viewport.width / 12));

  return (
    <group ref={group} position={[0, CARD_Y, 0]} scale={scale}>
      {textures.map((tex, i) => {
        const angle = (i / textures.length) * Math.PI * 2;
        const aspect = tex.image ? tex.image.width / tex.image.height : 0.75;
        const h = 1.15;
        const w = Math.min(h * aspect, 1.35);
        const glowW = w + 0.35;
        const glowH = h + 0.35;
        return (
          <group key={i} position={[Math.cos(angle) * RING_RADIUS, 0, Math.sin(angle) * RING_RADIUS]}>
            {/* cyan glow panel behind the portrait */}
            <mesh rotation-y={Math.PI / 2 - angle} position={[Math.sin(angle) * -0.06, 0, Math.cos(angle) * -0.06]}>
              <planeGeometry args={[glowW, glowH]} />
              <meshBasicMaterial
                color="#1e7fc4"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
            <mesh rotation-y={Math.PI / 2 - angle}>
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial map={tex} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/** Keeps the whole carousel floating on a soft sine wave. */
function CarouselFloat({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.08;
  });
  return <group ref={group}>{children}</group>;
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

/** Gentle camera parallax driven by the pointer. */
function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const targetY = -0.14; // slight lean so the ring reads from a low angle
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
            <CarouselFloat>
              <FighterCarousel />
            </CarouselFloat>
          </Suspense>
          <Arena />
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
