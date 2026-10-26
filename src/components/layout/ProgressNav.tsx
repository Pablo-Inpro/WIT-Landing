"use client";

import { useEffect, useState } from "react";

import { scenes } from "@/config/products";

export function ProgressNav() {
  const [active, setActive] = useState<string>(scenes[0]?.id ?? "");

  useEffect(() => {
    const elements = scenes
      .map((scene) => document.getElementById(scene.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.65] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-8"
      aria-label="Progreso narrativo"
    >
      <ol className="pointer-events-auto flex flex-col gap-3">
        {scenes.map((scene) => {
          const isActive = active === scene.id;
          return (
            <li key={scene.id}>
              <a
                href={`#${scene.id}`}
                className="group flex items-center gap-3"
                aria-current={isActive ? "true" : undefined}
                title={scene.title}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-gold"
                      : "w-4 bg-stone/50 group-hover:w-6 group-hover:bg-ivory/60"
                  }`}
                  aria-hidden
                />
                <span
                  className={`font-mono text-[10px] tracking-widest ${
                    isActive ? "text-gold" : "text-stone/70"
                  }`}
                >
                  {scene.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
