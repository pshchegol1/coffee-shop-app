import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export function NotFoundView({ title = 'Page not found', message = "We couldn't find what you were looking for." }: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="text-center py-16">
      <Coffee className="w-20 h-20 text-tint-300 mx-auto mb-6" aria-hidden="true" />
      <h1 className="text-2xl font-bold text-ink mb-3">{title}</h1>
      <p className="text-ink-subtle mb-8">{message}</p>
      <Link to="/" className="btn-primary inline-block">
        Back to shop
      </Link>
    </div>
  );
}
