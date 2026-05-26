import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('bms-dark') : null;
    const initial =
    saved !== null ?
    saved === 'true' :
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(initial);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', dark);
    try {localStorage.setItem('bms-dark', String(dark));} catch {/* ignore */}
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}