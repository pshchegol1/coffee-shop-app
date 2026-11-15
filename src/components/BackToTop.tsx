import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** How far the page must be scrolled before the button appears. */
const SHOW_AFTER_PX = 600;

const SIZE = 48;
const STROKE = 2;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating "back to top" button. Fades in once the page is scrolled past
 * SHOW_AFTER_PX, and its ring fills as you read further down the page.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > SHOW_AFTER_PX);
      // Rounded so tiny scroll steps don't re-render.
      setProgress(max > 0 ? Math.round(Math.min(y / max, 1) * 200) / 200 : 0);
    };

    // At most one update per animation frame.
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Smooth unless the user prefers reduced motion (handled by `scroll-behavior` in index.css).
  const scrollToTop = () => window.scrollTo({ top: 0 });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      // Hidden (not just transparent) when off, so it also leaves the tab order.
      className={`group fixed z-40 bottom-5 right-5 sm:bottom-6 sm:right-6 flex items-center justify-center rounded-full
        bg-surface/90 backdrop-blur-xl text-ink shadow-lg shadow-espresso-900/15 hover:bg-surface hover:shadow-xl
        transition-all duration-300 active:scale-95 ${
          visible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-3 invisible pointer-events-none'
        }`}
      style={{ width: SIZE, height: SIZE }}
    >
      {/* Scroll-progress ring, starting at 12 o'clock. */}
      <svg
        aria-hidden="true"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 -rotate-90"
      >
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-line" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="stroke-accent transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <ArrowUp className="relative w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
