import React from "react";

import { cn } from "@/utils";
import Link from "next/link";
interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export function RainbowButton({
  children,
  className,
  href,
  linkProps,
  ...props
}: RainbowButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "group focus-visible:ring-ring relative inline-flex h-11 animate-[var(--animation-rainbow)] cursor-pointer items-center justify-center rounded-full border-0 bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] px-8 py-2 font-medium text-white transition-colors [border:calc(0.08*1rem)_solid_transparent] focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",

          // before styles
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-[var(--animation-rainbow)] before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

          // light mode colors
          "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

          className,
        )}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(
        "group focus-visible:ring-ring relative inline-flex h-11 animate-[var(--animation-rainbow)] cursor-pointer items-center justify-center rounded-full border-0 bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] px-8 py-2 font-medium text-white transition-colors [border:calc(0.08*1rem)_solid_transparent] focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",

        // before styles
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-[var(--animation-rainbow)] before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // light mode colors
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
