import { cn } from "@/lib/utils";

interface DisplayProps {
  value: string;
  error?: boolean;
}

export const Display = ({ value, error }: DisplayProps) => {
  return (
    <div className="bg-[hsl(var(--display-bg))] rounded-2xl p-6 min-h-[100px] flex items-end justify-end">
      <div
        className={cn(
          "text-5xl font-bold text-foreground font-mono tracking-tight transition-colors",
          error && "text-destructive text-2xl"
        )}
      >
        {value}
      </div>
    </div>
  );
};
