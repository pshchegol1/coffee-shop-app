import type { InputHTMLAttributes } from 'react';

export function FormField({ id, label, ...inputProps }: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink-soft mb-1.5">{label}</label>
      <input
        id={id}
        name={id}
        {...inputProps}
        className="w-full px-4 py-3 bg-surface border border-line rounded-xl text-sm text-ink placeholder:text-ink-subtle/70 hover:border-tint-300 focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent transition-colors"
      />
    </div>
  );
}
