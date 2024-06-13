"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} data-testid="components.ui.toaster.toast" {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle data-testid="components.ui.toaster.title">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription data-testid="components.ui.toaster.description">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
