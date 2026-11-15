import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

// Keep in sync with the inline bootstrap script in index.html.
const STORAGE_KEY = 'theme';

const isInIframe = window.self !== window.top;

function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.setAttribute('data-theme', theme);
}

/**
 * The theme lives on <html> (class + data-theme), set before React mounts by
 * index.html. This hook mirrors it into React state, so it also picks up
 * changes made outside React (e.g. a parent frame posting a theme message).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Follow OS theme changes until the user picks one explicitly.
  // Inside an iframe the parent frame drives the theme instead.
  useEffect(() => {
    if (isInIframe) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) applyTheme(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode, blocked) — theme still applies for this visit.
    }
  }, []);

  return { theme, toggleTheme };
}
