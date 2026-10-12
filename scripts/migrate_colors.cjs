const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx') || dirFile.endsWith('.tsx') || dirFile.endsWith('.js') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const dirs = [
  path.join(__dirname, '../app'),
  path.join(__dirname, '../src')
];

let files = [];
dirs.forEach(d => {
  files = files.concat(walkSync(d));
});

const replacements = [
  // Backgrounds
  { regex: /\bbg-white\b/g, replacement: 'bg-surface' },
  { regex: /\bdark:bg-slate-[0-9]{2,3}\b/g, replacement: '' },
  { regex: /\bbg-slate-[0-9]{2,3}\b/g, replacement: 'bg-surface' },
  { regex: /\bdark:bg-brand-darkBg\b/g, replacement: '' },
  { regex: /\bbg-brand-darkBg\b/g, replacement: 'bg-surface' },
  { regex: /\bbg-canvas\b/g, replacement: 'bg-bg' },
  { regex: /\bbg-card\b/g, replacement: 'bg-surface' },
  { regex: /\bdark:bg-surface\b/g, replacement: '' },
  { regex: /\bdark:bg-card\b/g, replacement: '' },
  { regex: /\bbg-brand-gold\b/g, replacement: 'bg-gold' },
  { regex: /\bbg-gold-light\b/g, replacement: 'bg-gold-soft' },
  { regex: /\bhover:bg-gold-light\b/g, replacement: 'hover:bg-gold-soft' },
  { regex: /\bhover:bg-brand-gold\b/g, replacement: 'hover:bg-gold' },
  { regex: /\bbg-brand-blue\b/g, replacement: 'bg-gold' },
  { regex: /\bbg-brand-green\b/g, replacement: 'bg-gold' },
  { regex: /\bbg-\[#[A-Fa-f0-9]{3,6}\]\b/g, replacement: 'bg-surface' },
  
  // Text
  { regex: /\btext-slate-[789]00\b/g, replacement: 'text-text' },
  { regex: /\btext-content-primary\b/g, replacement: 'text-text' },
  { regex: /\bdark:text-white\b/g, replacement: '' },
  { regex: /\bdark:text-slate-[51]00\b/g, replacement: '' },
  { regex: /\btext-slate-[456]00\b/g, replacement: 'text-text-muted' },
  { regex: /\btext-content-secondary\b/g, replacement: 'text-text-muted' },
  { regex: /\bdark:text-slate-400\b/g, replacement: '' },
  { regex: /\bdark:text-brand-textMain\b/g, replacement: '' },
  { regex: /\btext-brand-gold\b/g, replacement: 'text-gold' },
  { regex: /\btext-\[#[A-Fa-f0-9]{3,6}\]\b/g, replacement: 'text-text' },

  // Borders
  { regex: /\bborder-slate-[23]00\b/g, replacement: 'border-border-hairline' },
  { regex: /\bdark:border-slate-[78]00\b/g, replacement: '' },
  { regex: /\bborder-gold\/20\b/g, replacement: 'border-border-hairline' },
  { regex: /\bborder-brand-gold\b/g, replacement: 'border-gold' }
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replacement);
  });
  
  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log(`Updated colors in ${f}`);
  }
});
