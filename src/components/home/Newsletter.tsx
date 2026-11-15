import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmail('');
    showToast({ message: "You're on the list! Look out for our next roast drop (simulated)." });
  };

  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden rounded-[2rem] bg-espresso-900 text-cream-50 ring-1 ring-white/5 px-6 py-12 sm:px-12 lg:px-16 lg:py-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cream-500/20 blur-3xl" />

      <div className="relative grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-400">The Roast Club</p>
          <h2 id="newsletter-title" className="mt-3 text-3xl sm:text-4xl font-medium">
            First dibs on every new release
          </h2>
          <p className="mt-3 text-cream-100/70 leading-relaxed max-w-md">
            Limited lots, brew guides and roaster notes — once a month, never spam.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 lg:justify-end">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="relative flex-1 lg:max-w-sm">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-200/50 pointer-events-none" aria-hidden="true" />
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full bg-white/10 border border-white/15 pl-11 pr-4 py-3.5 text-sm text-cream-50 placeholder:text-cream-200/40 focus:outline-none focus:ring-2 focus:ring-cream-400"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-cream-400 px-7 py-3.5 text-sm font-semibold text-espresso-900 hover:bg-cream-300 transition-colors active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
