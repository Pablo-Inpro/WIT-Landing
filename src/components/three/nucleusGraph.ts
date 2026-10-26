export type NucleusCategory =
  | "communities"
  | "owners"
  | "docs"
  | "tickets"
  | "apps";

export type NucleusNodeDef = {
  id: string;
  category: NucleusCategory;
  /** Base position on unit sphere, scaled later */
  position: [number, number, number];
  size: "primary" | "secondary" | "micro";
  color: "#C0A153" | "#F5F4F0" | "#5C6B6A";
};

export type NucleusLinkDef = {
  from: number; // -1 = core
  to: number;
  strength: number;
};

/** Fibonacci sphere distribution for even spatial coverage */
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return points;
}

const CATEGORIES: NucleusCategory[] = [
  "communities",
  "owners",
  "docs",
  "tickets",
  "apps",
];

const COLORS: Array<NucleusNodeDef["color"]> = ["#C0A153", "#F5F4F0", "#5C6B6A"];

export function buildNucleusGraph(nodeCount: number): {
  nodes: NucleusNodeDef[];
  links: NucleusLinkDef[];
} {
  const positions = fibonacciSphere(nodeCount, 1);
  const nodes: NucleusNodeDef[] = positions.map((pos, i) => {
    const category = CATEGORIES[i % CATEGORIES.length]!;
    const size: NucleusNodeDef["size"] =
      i % 7 === 0 ? "primary" : i % 3 === 0 ? "secondary" : "micro";
    // Slight radius variation for depth
    const jitter = 0.85 + (i % 5) * 0.06;
    return {
      id: `n-${i}`,
      category,
      position: [pos[0] * jitter, pos[1] * jitter, pos[2] * jitter],
      size,
      color: COLORS[i % COLORS.length]!,
    };
  });

  const links: NucleusLinkDef[] = [];
  // Every node connects to core
  for (let i = 0; i < nodes.length; i++) {
    links.push({ from: -1, to: i, strength: 0.45 });
  }
  // Moderate cross-links — richer without clutter
  for (let i = 0; i < nodes.length; i++) {
    const j = (i + 3) % nodes.length;
    if (i < j) links.push({ from: i, to: j, strength: 0.24 });
    if (i % 2 === 0) {
      const k = (i + 6) % nodes.length;
      if (i < k) links.push({ from: i, to: k, strength: 0.18 });
    }
  }

  return { nodes, links };
}

export const CATEGORY_FOCUS: Record<
  NucleusCategory,
  { expand: number; pulseBoost: number; coreGlow: number }
> = {
  communities: { expand: 1.06, pulseBoost: 1.2, coreGlow: 0.45 },
  owners: { expand: 1.04, pulseBoost: 1.4, coreGlow: 0.4 },
  docs: { expand: 1.08, pulseBoost: 1.5, coreGlow: 0.5 },
  tickets: { expand: 1.05, pulseBoost: 1.8, coreGlow: 0.55 },
  apps: { expand: 1.12, pulseBoost: 1.3, coreGlow: 0.6 },
};
