export function RoastLevel({ level, dotClassName }: { level: number; dotClassName: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Roast level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full ${dotClassName} ${i < level ? 'bg-ink-muted' : 'bg-tint-300'}`}
        />
      ))}
    </span>
  );
}
