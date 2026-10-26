import type { ReactNode } from "react";

type SceneShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** @deprecated Atmosphere is global via PageAtmosphere — kept for API compat */
  atmosphere?: boolean;
  "aria-labelledby"?: string;
};

export function SceneShell({
  id,
  children,
  className = "",
  "aria-labelledby": labelledBy,
}: SceneShellProps) {
  return (
    <section
      id={id}
      data-scene={id}
      className={`relative z-10 flex min-h-0 flex-col justify-center bg-transparent py-16 md:min-h-[100svh] md:py-28 ${className}`}
      aria-labelledby={labelledBy}
    >
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
