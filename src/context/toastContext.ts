import { createContext } from 'react';

export interface ToastOptions {
  message: string;
  /** Optional thumbnail shown at the start of the toast. */
  imageSrc?: string;
  /** Optional link, e.g. { label: 'View cart', to: '/cart' }. */
  action?: { label: string; to: string };
}

export interface ToastContextValue {
  /** Shows a toast, replacing any toast already on screen. */
  showToast: (options: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Height in px of the toast currently on screen (0 when none), so other floating
 * UI in the same corner can move out of its way. Kept separate from ToastContext
 * so components that only call showToast don't re-render as toasts come and go.
 */
export const ToastHeightContext = createContext(0);
