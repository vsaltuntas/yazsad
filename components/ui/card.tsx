import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shelf overflow-hidden", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5 border-b border-line", className)} {...props} />
);
export const CardBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5", className)} {...props} />
);
export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5 border-t border-line bg-elevated/40", className)} {...props} />
);
export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold text-ink", className)} {...props} />
);
export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted", className)} {...props} />
);
