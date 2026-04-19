import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border",
  {
    variants: {
      variant: {
        default: "border-line bg-elevated text-muted",
        accent: "border-accent/40 bg-accent/15 text-ink",
        ok: "border-ok/40 bg-ok/15 text-ok",
        warn: "border-warn/40 bg-warn/15 text-warn",
        err: "border-err/40 bg-err/15 text-err",
        outline: "border-line bg-transparent text-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
