"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-[#0f181a] hover:brightness-110 shadow-[0_0_24px_color-mix(in_srgb,var(--wit-gold)_25%,transparent)]",
  secondary:
    "border border-gold/60 bg-[color-mix(in_srgb,var(--wit-ivory)_9%,var(--wit-bg-elevated))] text-ivory shadow-[inset_0_1px_0_color-mix(in_srgb,var(--wit-ivory)_14%,transparent),0_10px_28px_rgb(0_0_0_/_0.28)] hover:border-gold hover:bg-[color-mix(in_srgb,var(--wit-gold)_14%,var(--wit-bg-elevated))] hover:text-ivory",
  ghost: "text-muted hover:text-ivory",
};

function cx(variant: Variant, className: string) {
  return `transition-micro inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium tracking-wide ${variants[variant]} ${className}`;
}

export function Button(props: ButtonProps) {
  if (props.as === "a") {
    const { children, variant = "primary", className = "", as: _as, ...rest } =
      props;
    void _as;
    return (
      <a className={cx(variant, className)} {...rest}>
        {children}
      </a>
    );
  }

  const { children, variant = "primary", className = "", as: _as, type, ...rest } =
    props;
  void _as;
  return (
    <button className={cx(variant, className)} type={type ?? "button"} {...rest}>
      {children}
    </button>
  );
}
