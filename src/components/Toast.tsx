import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import type { ToastOptions } from '../context/toastContext';

/** Presentational toast card. Timing and placement are handled by ToastProvider. */
export function Toast({ message, imageSrc, action, onDismiss }: ToastOptions & { onDismiss: () => void }) {
  return (
    <div className="pointer-events-auto flex items-center gap-3 bg-surface border border-line rounded-xl shadow-xl p-3 motion-safe:animate-toast-in">
      {imageSrc ? (
        <img src={imageSrc} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
      ) : (
        <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
        </span>
      )}

      <p className="flex-1 min-w-0 text-sm text-ink">
        {imageSrc && <Check className="inline w-4 h-4 mr-1 -mt-0.5 text-green-600 dark:text-green-400" aria-hidden="true" />}
        {message}
      </p>

      {action && (
        <Link
          to={action.to}
          onClick={onDismiss}
          className="shrink-0 text-sm font-semibold text-accent hover:underline underline-offset-2"
        >
          {action.label}
        </Link>
      )}

      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 p-1 rounded-full text-ink-subtle hover:text-ink hover:bg-tint-100 transition-colors"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
