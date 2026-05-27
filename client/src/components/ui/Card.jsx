import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 border-b border-border px-6 py-5", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h2
      className={cn("text-xl font-semibold tracking-tight sm:text-2xl", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3 border-t border-border px-6 py-4", className)}
      {...props}
    />
  );
}
