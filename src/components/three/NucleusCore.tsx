"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  Color,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  Vector3,
} from "three";

import {
  buildNucleusGraph,
  type NucleusCategory,
} from "./nucleusGraph";

type NucleusCoreProps = {
  activeCategory: NucleusCategory | null;
  reducedMotion?: boolean;
  simplified?: boolean;
  pointerInfluence?: { x: number; y: number };
};

type Pulse = {
  linkIndex: number;
  t: number;
  speed: number;
  alive: boolean;
};

const GOLD = new Color("#C0A153");
const IVORY = new Color("#F5F4F0");
const PETROLEUM = new Color("#003F3E");

const SIZE_MAP = { primary: 0.1, secondary: 0.07, micro: 0.045 } as const;

export function NucleusCore({
  reducedMotion = false,
  simplified = false,
  pointerInfluence = { x: 0, y: 0 },
}: NucleusCoreProps) {
  const root = useRef<Group>(null);
  const innerCore = useRef<Mesh>(null);
  const outerShell = useRef<Mesh>(null);
  const ringA = useRef<Group>(null);
  const ringB = useRef<Group>(null);
  const nodesGroup = useRef<Group>(null);
  const coreMat = useRef<MeshStandardMaterial>(null);

  const nodeCount = simplified ? 12 : 18;
  const { nodes, links } = useMemo(
    () => buildNucleusGraph(nodeCount),
    [nodeCount],
  );

  const baseRadius = simplified ? 2.05 : 2.45;

  const linkPoints = useMemo(() => {
    return links.map((link) => {
      const a =
        link.from === -1
          ? new Vector3(0, 0, 0)
          : new Vector3(...nodes[link.from]!.position).multiplyScalar(
              baseRadius,
            );
      const b = new Vector3(...nodes[link.to]!.position).multiplyScalar(
        baseRadius,
      );
      return { a, b, fromCore: link.from === -1, strength: link.strength };
    });
  }, [links, nodes, baseRadius]);

  const sim = useRef({
    pulses: [] as Pulse[],
    expandCurrent: 1,
    time: 0,
    pointer: { x: 0, y: 0 },
    pulseCount: -1,
  });
  const pulseMeshes = useRef<(Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (reducedMotion) {
      if (root.current) root.current.rotation.y += delta * 0.02;
      return;
    }

    const state = sim.current;
    const targetPulses = simplified ? 2 : 4;
    if (state.pulseCount !== targetPulses) {
      state.pulseCount = targetPulses;
      state.pulses = Array.from({ length: targetPulses }, (_, i) => ({
        linkIndex: i * 2,
        t: i * 0.3,
        speed: 0.2 + i * 0.05,
        alive: true,
      }));
    }

    const dt = Math.min(delta, 0.05);
    state.time += dt;
    const t = state.time;

    state.pointer.x += (pointerInfluence.x - state.pointer.x) * 0.04;
    state.pointer.y += (pointerInfluence.y - state.pointer.y) * 0.04;

    // Soft breath
    const breath = 1 + Math.sin(t * 1.05) * 0.03;
    state.expandCurrent += (breath - state.expandCurrent) * 0.06;

    if (root.current) {
      root.current.rotation.y += dt * 0.1;
      root.current.rotation.x =
        Math.sin(t * 0.14) * 0.05 + state.pointer.y * 0.15;
      root.current.rotation.z = state.pointer.x * 0.1;
      root.current.scale.setScalar(state.expandCurrent);
    }

    if (innerCore.current) {
      innerCore.current.rotation.y -= dt * 0.2;
      innerCore.current.rotation.x += dt * 0.04;
    }

    if (outerShell.current) {
      outerShell.current.rotation.y += dt * 0.12;
    }

    if (ringA.current) {
      ringA.current.rotation.x += dt * 0.12;
      ringA.current.rotation.y += dt * 0.05;
    }
    if (ringB.current) {
      ringB.current.rotation.z -= dt * 0.1;
      ringB.current.rotation.y += dt * 0.07;
    }

    if (coreMat.current) {
      coreMat.current.emissiveIntensity = 0.32 + Math.sin(t * 1.05) * 0.08;
    }

    if (nodesGroup.current) {
      nodesGroup.current.children.forEach((child, i) => {
        const base = nodes[i];
        if (!base) return;
        const angle = t * (0.1 + (i % 4) * 0.015) + i;
        const orbit = 0.03 * Math.sin(angle);
        child.position.set(
          base.position[0] * baseRadius + Math.cos(angle) * orbit,
          base.position[1] * baseRadius + Math.sin(angle * 0.7) * orbit,
          base.position[2] * baseRadius,
        );
      });
    }

    for (const pulse of state.pulses) {
      pulse.t += dt * pulse.speed;
      if (pulse.t >= 1) {
        pulse.t = 0;
        pulse.linkIndex = Math.floor(Math.random() * linkPoints.length);
        pulse.speed = 0.18 + Math.random() * 0.2;
      }
    }

    state.pulses.forEach((pulse, i) => {
      const mesh = pulseMeshes.current[i];
      const link = linkPoints[pulse.linkIndex];
      if (!mesh || !link) return;
      mesh.position.lerpVectors(link.a, link.b, pulse.t);
      const fade =
        pulse.t < 0.1
          ? pulse.t * 10
          : pulse.t > 0.85
            ? (1 - pulse.t) * 6.5
            : 1;
      mesh.scale.setScalar(0.55 + fade * 0.7);
      mesh.visible = fade > 0.05;
    });
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 2.5, 4]} intensity={1.05} color={GOLD} />
      <pointLight position={[-3, -1.5, -2]} intensity={0.5} color={PETROLEUM} />

      <mesh scale={1.15}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshBasicMaterial
          color="#C0A153"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerCore}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          ref={coreMat}
          color="#C0A153"
          emissive="#C0A153"
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.28}
        />
      </mesh>

      <mesh ref={outerShell} scale={1.2}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial
          color="#C0A153"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Single subtle outer cage — structure without clutter */}
      <mesh>
        <icosahedronGeometry args={[baseRadius * 0.95, 1]} />
        <meshBasicMaterial
          color="#C0A153"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      <group ref={ringA} rotation={[0.55, 0.15, 0.1]}>
        <mesh>
          <torusGeometry args={[baseRadius * 0.68, 0.008, 8, 64]} />
          <meshBasicMaterial color="#C0A153" transparent opacity={0.34} />
        </mesh>
      </group>
      <group ref={ringB} rotation={[-0.35, 0.7, 0.4]}>
        <mesh>
          <torusGeometry args={[baseRadius * 0.84, 0.006, 8, 72]} />
          <meshBasicMaterial color="#5C6B6A" transparent opacity={0.24} />
        </mesh>
        {!simplified ? (
          <mesh rotation={[1.1, 0.2, 0.3]}>
            <torusGeometry args={[baseRadius * 0.96, 0.005, 8, 72]} />
            <meshBasicMaterial color="#C0A153" transparent opacity={0.16} />
          </mesh>
        ) : null}
      </group>

      {linkPoints.map((link, index) => (
        <Line
          key={`link-${index}`}
          points={[
            [link.a.x, link.a.y, link.a.z],
            [link.b.x, link.b.y, link.b.z],
          ]}
          color="#C0A153"
          lineWidth={link.fromCore ? 1.35 : 1}
          transparent
          opacity={link.fromCore ? 0.52 : Math.max(0.18, link.strength)}
        />
      ))}

      <group ref={nodesGroup}>
        {nodes.map((node) => (
          <mesh
            key={node.id}
            position={[
              node.position[0] * baseRadius,
              node.position[1] * baseRadius,
              node.position[2] * baseRadius,
            ]}
          >
            <sphereGeometry args={[SIZE_MAP[node.size], 12, 12]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.2}
              metalness={0.4}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>

      {(simplified ? [0, 1] : [0, 1, 2, 3]).map((i) => (
        <mesh
          key={`pulse-${i}`}
          ref={(el) => {
            pulseMeshes.current[i] = el;
          }}
          visible={!reducedMotion}
        >
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color={IVORY} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}
