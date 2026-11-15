import { Minus, Plus } from 'lucide-react';

const SIZES = {
  sm: { wrapper: 'h-9', button: 'w-9', icon: 'w-3.5 h-3.5', value: 'min-w-8 text-sm' },
  md: { wrapper: 'h-[3.25rem]', button: 'w-12', icon: 'w-4 h-4', value: 'min-w-10' },
};

/**
 * A −/value/+ control. Without `min`, decreasing is never blocked (the cart uses
 * that to remove an item at 0); with `min`, the minus button disables at that value.
 */
export function QuantityStepper({ value, onChange, min, size = 'md', itemName }: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  size?: keyof typeof SIZES;
  /** Included in the button labels, e.g. "Decrease quantity of Kenyan AA". */
  itemName?: string;
}) {
  const s = SIZES[size];
  const atMin = min !== undefined && value <= min;
  const labelSuffix = itemName ? ` of ${itemName}` : '';
  const buttonClass = `${s.button} h-full flex items-center justify-center rounded-full text-ink-muted hover:bg-tint-100 hover:text-ink transition-colors disabled:opacity-35 disabled:hover:bg-transparent`;

  return (
    <div className={`${s.wrapper} inline-flex items-center rounded-full border border-line bg-surface p-0.5`}>
      <button
        onClick={() => onChange(value - 1)}
        disabled={atMin}
        aria-label={`Decrease quantity${labelSuffix}`}
        className={buttonClass}
      >
        <Minus className={s.icon} aria-hidden="true" />
      </button>
      <span className={`${s.value} font-semibold text-ink text-center tabular-nums`} aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity${labelSuffix}`}
        className={buttonClass}
      >
        <Plus className={s.icon} aria-hidden="true" />
      </button>
    </div>
  );
}
