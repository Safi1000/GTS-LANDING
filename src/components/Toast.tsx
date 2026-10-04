"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

const ToastCtx = createContext<(msg: string) => void>(() => {});

export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("Copied");
  const [show, setShow] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toast = useCallback((m: string) => {
    setMsg(m);
    setShow(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setShow(false), 3200);
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
        {msg}
      </div>
    </ToastCtx.Provider>
  );
}
