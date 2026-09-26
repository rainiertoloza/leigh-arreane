import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/25 bg-accent-soft/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
