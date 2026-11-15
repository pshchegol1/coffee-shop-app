const SIZES = {
  sm: 'w-3 h-1',
  md: 'w-5 h-1.5',
};

/** Five-segment roast meter, filled from light to dark. */
export function RoastLevel({ level, size = 'sm' }: { level: number; size?: keyof typeof SIZES }) {
  return (
    <span className="flex gap-1" role="img" aria-label={`Roast level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full ${SIZES[size]} ${i < level ? 'bg-accent' : 'bg-tint-200'}`}
        />
      ))}
    </span>
  );
}
