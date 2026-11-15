import { useContext } from 'react';
import { ToastContext, ToastHeightContext } from '../context/toastContext';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return context;
}

/** Height in px of the toast on screen, or 0 when there is none. */
export function useToastHeight() {
  return useContext(ToastHeightContext);
}
