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
