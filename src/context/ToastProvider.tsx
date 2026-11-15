import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ToastContext, ToastHeightContext } from './toastContext';
import type { ToastContextValue, ToastOptions } from './toastContext';
import { Toast } from '../components/Toast';

const TOAST_DURATION_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<(ToastOptions & { id: number }) | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const nextId = useRef(0);
  // The auto-dismiss pauses while the toast is hovered or has keyboard focus, so people
  // (including screen-reader and keyboard users) have time to reach the action link.
  const hovered = useRef(false);
  const focused = useRef(false);

  const startTimer = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  const pause = () => window.clearTimeout(timer.current);
  const resume = () => {
    if (!hovered.current && !focused.current) startTimer();
  };

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    hovered.current = false;
    focused.current = false;
    setToast(null);
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    // A new id remounts the toast, replaying its entrance animation.
    setToast({ ...options, id: nextId.current++ });
    startTimer();
  }, [startTimer]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // The region below shrinks to 0 when empty, so its height is the toast's height
  // (which varies: the message can wrap, especially on narrow screens).
  const region = useRef<HTMLDivElement>(null);
  const [toastHeight, setToastHeight] = useState(0);
  useEffect(() => {
    const el = region.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setToastHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      <ToastHeightContext.Provider value={toastHeight}>
        {children}
      </ToastHeightContext.Provider>
      {/* Always mounted: screen readers only announce live-region changes reliably if the region already exists. */}
      <div
        ref={region}
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed z-60 inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96"
        onMouseEnter={() => { hovered.current = true; pause(); }}
        onMouseLeave={() => { hovered.current = false; resume(); }}
        onFocus={() => { focused.current = true; pause(); }}
        onBlur={(e) => {
          // Ignore focus moving between elements inside the toast.
          if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
          focused.current = false;
          resume();
        }}
      >
        {toast && <Toast key={toast.id} {...toast} onDismiss={dismiss} />}
      </div>
    </ToastContext.Provider>
  );
}
