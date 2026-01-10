import React, { createContext, useContext, useMemo, useState } from "react";

export type ToastMessage = {
  id: string;
  text: string;
};

type ToastContextValue = {
  showToast: (text: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2500);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 left-1/2 z-50 flex w-full max-w-xs -translate-x-1/2 flex-col gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-xl bg-ink px-4 py-3 text-sm text-white shadow-card"
            role="status"
            aria-live="polite"
          >
            {toast.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
