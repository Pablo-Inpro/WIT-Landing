/**
 * Single continuous backdrop for the whole experience.
 * Avoids hard seams between scenes that each had their own atmosphere.
 */
export function PageAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />

      {/* Soft overlapping washes — petroleum + gold from brand palette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 95% 58% at 50% 6%, color-mix(in srgb, var(--wit-gold) 22%, transparent) 0%, transparent 60%),
            radial-gradient(ellipse 75% 52% at 12% 32%, color-mix(in srgb, var(--wit-petroleum) 52%, transparent) 0%, transparent 58%),
            radial-gradient(ellipse 70% 48% at 88% 52%, color-mix(in srgb, var(--wit-gold) 14%, transparent) 0%, transparent 52%),
            radial-gradient(ellipse 85% 55% at 38% 78%, color-mix(in srgb, var(--wit-petroleum) 42%, transparent) 0%, transparent 58%),
            radial-gradient(ellipse 75% 42% at 62% 100%, color-mix(in srgb, var(--wit-gold) 12%, transparent) 0%, transparent 52%),
            radial-gradient(ellipse 50% 35% at 70% 20%, color-mix(in srgb, var(--wit-ivory) 4%, transparent) 0%, transparent 55%)
          `,
        }}
      />

      <div className="scene-grain absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
