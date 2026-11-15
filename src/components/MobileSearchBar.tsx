import { Search } from 'lucide-react';

export function MobileSearchBar({ searchQuery, onSearchChange }: {
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className="lg:hidden px-4 py-3 bg-tint-50 border-b border-line">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" aria-hidden="true" />
        <input
          type="search"
          aria-label="Search coffees"
          placeholder="Search coffees..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-line rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-focus"
          autoFocus
        />
      </div>
    </div>
  );
}
