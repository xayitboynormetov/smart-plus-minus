import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CalcButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "operation" | "equals" | "secondary";
}

export const CalcButton = ({
  children,
  variant = "default",
  className,
  ...props
}: CalcButtonProps) => {
  const baseStyles =
    "rounded-2xl text-2xl font-semibold transition-all duration-200 active:scale-95 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background h-16 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-secondary text-secondary-foreground hover:bg-[hsl(var(--button-hover))]",
    operation: "bg-accent text-accent-foreground hover:brightness-110",
    equals: "bg-primary text-primary-foreground hover:brightness-110",
    secondary: "bg-muted text-muted-foreground hover:bg-[hsl(var(--button-hover))]",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
