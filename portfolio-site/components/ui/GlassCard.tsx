import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl",
        "shadow-[0_2px_30px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
