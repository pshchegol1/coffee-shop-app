import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Modal confirmation built on the native <dialog> element, which handles focus
 * trapping, Esc to cancel and the backdrop. Clicking the backdrop also cancels.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm button as a dangerous action. */
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const confirmClass = destructive
    ? 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm tracking-wide shadow-sm bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 dark:text-espresso-950 transition-colors active:scale-[0.98]'
    : 'btn-primary';

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-dialog-title"
      aria-describedby={description ? 'confirm-dialog-description' : undefined}
      // Esc: let the parent own the open state instead of the browser closing it.
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      // The panel fills the dialog, so a click whose target is the dialog itself hit the backdrop.
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      className="m-auto p-0 w-[calc(100%-2rem)] max-w-sm bg-transparent backdrop:bg-espresso-950/50 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="bg-surface border border-line rounded-3xl shadow-2xl shadow-espresso-900/20 p-6 motion-safe:animate-toast-in">
          <h2 id="confirm-dialog-title" className="text-xl font-semibold text-ink">
            {title}
          </h2>
          {description && (
            <div id="confirm-dialog-description" className="mt-2 text-sm text-ink-muted">
              {description}
            </div>
          )}
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            {/* Focus the safe option first. */}
            <button type="button" autoFocus onClick={onCancel} className="btn-secondary">
              {cancelLabel}
            </button>
            <button type="button" onClick={onConfirm} className={confirmClass}>
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
