import { Search } from 'lucide-react';

export function MobileSearchBar({ searchQuery, onSearchChange }: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className="lg:hidden sticky top-16 z-40 px-4 sm:px-6 py-3 bg-canvas/90 backdrop-blur-xl border-b border-line motion-safe:animate-toast-in">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          aria-label="Search coffees"
          placeholder="Search origins, flavors…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-full text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-focus"
          autoFocus
        />
      </div>
    </div>
  );
}
