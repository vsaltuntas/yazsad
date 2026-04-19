import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 shelf",
        className,
      )}
    >
      <div className="w-12 h-12 rounded-full bg-elevated mb-4" aria-hidden />
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="text-sm text-muted mt-1 max-w-md">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
