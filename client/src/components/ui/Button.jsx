import { cn } from "../../lib/utils";

const variants = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-card text-foreground hover:bg-muted",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  success:
    "bg-success text-success-foreground hover:bg-success/90",
  ghost: "hover:bg-muted text-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 rounded-md px-3 text-sm",
  lg: "h-11 rounded-lg px-6 text-base",
  icon: "size-10 p-0",
};

const baseStyles =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset disabled:pointer-events-none disabled:opacity-50";

export function buttonClassName({ variant = "default", size = "default", className } = {}) {
  return cn(baseStyles, variants[variant], sizes[size], className);
}

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
