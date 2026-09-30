const fs = require('fs');
const path = require('path');

const dir = './src';
const colorMap = {
  'bg-blue-500/15': 'bg-brand-gold/15',
  'text-blue-500': 'text-brand-gold',
  'text-blue-400': 'text-brand-goldLight',
  'bg-indigo-500/15': 'bg-brand-gold/15',
  'text-indigo-500': 'text-brand-gold',
  'text-indigo-400': 'text-brand-goldLight',
  'bg-emerald-500/15': 'bg-brand-gold/15',
  'text-emerald-500': 'text-brand-gold',
  'text-emerald-400': 'text-brand-goldLight',
  'bg-purple-500/15': 'bg-brand-gold/15',
  'text-purple-500': 'text-brand-gold',
  'text-purple-400': 'text-brand-goldLight',
  'bg-cyan-500/15': 'bg-brand-gold/15',
  'text-cyan-500': 'text-brand-gold',
  'text-cyan-400': 'text-brand-goldLight',
  'bg-amber-500/15': 'bg-brand-gold/15',
  'text-amber-500': 'text-brand-gold',
  'text-amber-400': 'text-brand-goldLight',
  'bg-rose-500/15': 'bg-brand-gold/15',
  'text-rose-500': 'text-brand-gold',
  'text-rose-400': 'text-brand-goldLight',
  'border-blue-500/30': 'border-brand-gold/30',
  'border-indigo-500/30': 'border-brand-gold/30',
  'border-emerald-500/30': 'border-brand-gold/30',
  'border-purple-500/30': 'border-brand-gold/30',
  'border-cyan-500/30': 'border-brand-gold/30',
  'border-amber-500/30': 'border-brand-gold/30',
  'border-rose-500/30': 'border-brand-gold/30',
  'bg-blue-500/10': 'bg-brand-gold/10',
  'border-blue-500/20': 'border-brand-gold/20',
  'bg-blue-600': 'bg-brand-goldDark',
  'bg-blue-500': 'bg-brand-gold',
  'text-blue-600': 'text-brand-goldDark',
  'bg-blue-500/5': 'bg-brand-gold/5',
  'bg-blue-500/[0.02]': 'bg-brand-gold/[0.02]'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [key, value] of Object.entries(colorMap)) {
    if (content.includes(key)) {
      content = content.split(key).join(value);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
