import { useEffect } from "react";
import { Button } from "./Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { cn } from "../../lib/utils";

export function Modal({ open, onClose, title, children, footer, className }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 animate-fade-in"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <Card
        className={cn(
          "relative z-10 w-full max-w-md animate-slide-up shadow-lg",
          className
        )}
      >
        {title && (
          <CardHeader>
            <CardTitle id="modal-title">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export function ModalActions({ onConfirm, onCancel, confirmLabel = "Confirmar", cancelLabel = "Cancelar" }) {
  return (
    <>
      <Button variant="outline" onClick={onCancel} className="flex-1 sm:flex-none">
        {cancelLabel}
      </Button>
      <Button onClick={onConfirm} className="flex-1 sm:flex-none">
        {confirmLabel}
      </Button>
    </>
  );
}
