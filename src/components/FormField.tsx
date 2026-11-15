import type { InputHTMLAttributes } from 'react';

export function FormField({ id, label, ...inputProps }: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-muted mb-1">{label}</label>
      <input
        id={id}
        name={id}
        {...inputProps}
        className="w-full px-4 py-3 border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-focus"
      />
    </div>
  );
}
