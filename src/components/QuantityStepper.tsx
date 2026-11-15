import { Minus, Plus } from 'lucide-react';

const SIZES = {
  sm: { button: 'p-2', icon: 'w-3.5 h-3.5', value: 'px-3 py-2 text-sm' },
  md: { button: 'p-3', icon: 'w-4 h-4', value: 'px-4 py-3 min-w-12' },
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

  return (
    <div className="flex items-center border border-line rounded-lg">
      <button
        onClick={() => onChange(value - 1)}
        disabled={atMin}
        aria-label={`Decrease quantity${labelSuffix}`}
        className={`${s.button} hover:bg-tint-50 transition-colors rounded-l-lg disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Minus className={`${s.icon} text-ink-muted`} aria-hidden="true" />
      </button>
      <span className={`${s.value} font-semibold text-ink text-center`} aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        aria-label={`Increase quantity${labelSuffix}`}
        className={`${s.button} hover:bg-tint-50 transition-colors rounded-r-lg`}
      >
        <Plus className={`${s.icon} text-ink-muted`} aria-hidden="true" />
      </button>
    </div>
  );
}
