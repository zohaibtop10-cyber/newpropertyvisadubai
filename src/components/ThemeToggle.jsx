import React from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme: propTheme, setTheme: propSetTheme, className = '' }) {
  const [localTheme, setLocalTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  const activeTheme = propTheme || localTheme;

  const toggleTheme = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    if (propSetTheme) {
      propSetTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
    }
    localStorage.setItem('theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${activeTheme === 'dark' ? 'Light' : 'Dark'} mode`}
      className={`relative p-2.5 rounded-[10px] bg-[#FAF6ED] dark:bg-[#1E1A12] border border-[#E8DFC8] dark:border-[#EFC45C]/35 hover:border-[#EFC45C] text-slate-800 dark:text-[#EFC45C] transition-all duration-300 shadow-sm flex items-center justify-center cursor-pointer group ${className}`}
    >
      <div className="relative w-4 h-4">
        {/* Sun Icon (Visible in Light Mode) */}
        <Sun
          className={`w-4 h-4 text-amber-500 absolute inset-0 transition-all duration-300 transform ${
            activeTheme === 'dark'
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />

        {/* Moon Icon (Visible in Dark Mode) */}
        <Moon
          className={`w-4 h-4 text-[#D4AF37] absolute inset-0 transition-all duration-300 transform ${
            activeTheme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export default ThemeToggle;
