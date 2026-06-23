import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild: _asChild, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50";
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-accent text-background hover:bg-accent/90 cyber-glow-hover",
      outline: "border border-primary/20 bg-transparent text-text-primary hover:bg-primary/10",
      secondary: "bg-background-secondary text-text-primary hover:bg-background-tertiary",
      ghost: "hover:bg-primary/10 hover:text-white",
    };
    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      xl: "h-14 px-10 text-lg font-semibold rounded-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
