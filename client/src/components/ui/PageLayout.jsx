import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export function PageLayout({ title, description, children, className, showHome = true }) {
  return (
    <div className={cn("min-h-screen", className)}>
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div>
            {showHome && (
              <Link
                to="/"
                className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                ← Inicio
              </Link>
            )}
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}

export function DataTable({ children, className }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function Table({ className, ...props }) {
  return (
    <table
      className={cn("w-full min-w-[32rem] text-left text-sm", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }) {
  return (
    <thead
      className={cn("bg-primary text-primary-foreground", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn("border-t border-border transition-colors hover:bg-muted/50", className)}
      {...props}
    />
  );
}

export function Th({ className, ...props }) {
  return (
    <th
      className={cn("px-3 py-3 font-semibold sm:px-4", className)}
      {...props}
    />
  );
}

export function Td({ className, ...props }) {
  return (
    <td className={cn("px-3 py-3 sm:px-4", className)} {...props} />
  );
}
