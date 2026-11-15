import { Link } from 'react-router-dom';
import { ArrowRight, Coffee } from 'lucide-react';

export function NotFoundView({ title = 'Page not found', message = "We couldn't find what you were looking for." }: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="max-w-md mx-auto text-center py-16 sm:py-24">
      <span className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-3xl bg-tint-100">
        <Coffee className="w-9 h-9 text-accent" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-medium text-ink mb-3">{title}</h1>
      <p className="text-ink-subtle mb-8">{message}</p>
      <Link to="/" className="btn-primary">
        Back to shop
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
