const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// 1. Fix the nav container
content = content.replace(
  '<nav className="hidden xl:flex flex-wrap flex-1 items-center justify-center gap-1 2xl:gap-4 min-w-0 z-0 text-[10px] 2xl:text-[13px] font-medium">',
  '<nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 z-0">'
);

// 2. Generic replace for the link class logic
const regexes = [
  // Home
  {
    search: /className=\{\`max-w-full transition-all cursor-pointer font-semibold text-center leading-tight \$\{activeView === 'home' && !activeDropdown\s*\?\s*'text-\[#E01E37\]'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeView === 'home' && !activeDropdown ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // All Services
  {
    search: /className=\{\`whitespace-nowrap max-w-full transition-all cursor-pointer flex items-center gap-1\.5 font-bold relative \$\{activeDropdown === 'allServices'\s*\?\s*'text-\[#E01E37\]'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`whitespace-nowrap flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeDropdown === 'allServices' ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // Visas
  {
    search: /className=\{\`max-w-full transition-all cursor-pointer flex items-center justify-center gap-1\.5 font-medium text-center leading-tight \$\{activeDropdown === 'visas'\s*\?\s*'text-\[#E01E37\] font-semibold'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeDropdown === 'visas' ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // Emirates ID
  {
    search: /className=\{\`whitespace-nowrap max-w-full transition-all cursor-pointer flex items-center gap-1\.5 font-medium \$\{activeDropdown === 'emiratesId'\s*\?\s*'text-\[#E01E37\] font-semibold'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`whitespace-nowrap flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeDropdown === 'emiratesId' ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // Corporate
  {
    search: /className=\{\`max-w-full transition-all cursor-pointer flex items-center justify-center gap-1\.5 font-medium text-center leading-tight \$\{activeDropdown === 'corporate'\s*\?\s*'text-\[#E01E37\] font-semibold'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeDropdown === 'corporate' ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // Guides
  {
    search: /className=\{\`max-w-full transition-all cursor-pointer font-semibold text-center leading-tight \$\{activeView === 'guides' && !activeDropdown\s*\?\s*'text-\[#E01E37\]'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeView === 'guides' && !activeDropdown ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // About
  {
    search: /className=\{\`max-w-full transition-all cursor-pointer font-semibold text-center leading-tight \$\{activeView === 'about' && !activeDropdown\s*\?\s*'text-\[#E01E37\]'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeView === 'about' && !activeDropdown ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  },
  // Contact
  {
    search: /className=\{\`max-w-full transition-all cursor-pointer font-semibold text-center leading-tight \$\{activeView === 'contact' && !activeDropdown\s*\?\s*'text-\[#E01E37\]'\s*:\s*'text-slate-700 dark:text-slate-300 hover:text-\[#E01E37\]'\s*\}\`\}/g,
    replace: "className={`flex items-center gap-1 rounded-lg px-2 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-sm font-medium transition-colors cursor-pointer ${activeView === 'contact' && !activeDropdown ? 'bg-[#E01E37] text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}"
  }
];

regexes.forEach(r => {
  content = content.replace(r.search, r.replace);
});

// Remove pulse badge
content = content.replace(/<span className="text-\[10px\] w-5 h-5 flex items-center justify-center rounded-full bg-\[#E01E37\] text-white font-mono font-extrabold shadow-sm animate-pulse shrink-0">\s*20\s*<\/span>/g, '');

fs.writeFileSync('src/components/Navbar.jsx', content);
console.log('Update successful');
