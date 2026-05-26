import { forwardRef } from "react";
import { cn } from "@/lib/utils";
const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-amber text-white font-semibold hover:bg-amber-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(212,168,83,0.35)] active:translate-y-0",
  secondary:
    "bg-transparent text-text border-[1.5px] border-border hover:border-amber hover:bg-amber/5",
  danger:
    "bg-rust text-white font-semibold hover:opacity-90 hover:-translate-y-px",
  ghost: "bg-transparent text-muted hover:text-amber hover:bg-amber/5",
  icon: "bg-paper border-[1.5px] border-border text-muted hover:text-amber hover:border-amber",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-6 text-[0.9375rem]",
  icon: "h-9 w-9 p-0",
};

export const Button = forwardRef(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
