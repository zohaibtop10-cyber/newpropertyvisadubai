import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Light/Dark Theme"
      className="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-all duration-300 hover:scale-105 hover:border-[#E01E37] active:scale-95 shadow-sm backdrop-blur-md cursor-pointer overflow-hidden group"
    >
      {/* Sun Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
          isDark
            ? 'opacity-0 scale-50 rotate-90 pointer-events-none'
            : 'opacity-100 scale-100 rotate-0 text-amber-500'
        }`}
      >
        <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
      </div>

      {/* Moon Icon */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
          isDark
            ? 'opacity-100 scale-100 rotate-0 text-amber-400'
            : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
        }`}
      >
        <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
      </div>
    </button>
  );
}
