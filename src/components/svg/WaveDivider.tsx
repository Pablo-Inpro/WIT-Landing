type WaveDividerProps = {
  className?: string;
};

/** Optional decorative divider retained for reuse. */
export function WaveDivider({ className = "" }: WaveDividerProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z"
        opacity="0.35"
      />
    </svg>
  );
}
