const fs = require('fs');
const path = require('path');

const dir = './src';

const replaceMap = [
  { regex: /(?<!dark:)bg-white/g, replacement: 'bg-surface' },
  { regex: /(?<!dark:)bg-slate-50/g, replacement: 'bg-canvas' },
  { regex: /(?<!dark:)bg-slate-100/g, replacement: 'bg-surface-elevated' },
  { regex: /(?<!dark:)bg-slate-200/g, replacement: 'bg-surface-hover' },
  { regex: /(?<!dark:)border-slate-100/g, replacement: 'border-border-subtle' },
  { regex: /(?<!dark:)border-slate-200/g, replacement: 'border-border-subtle' },
  { regex: /(?<!dark:)border-slate-300/g, replacement: 'border-border-strong' },
  { regex: /(?<!dark:)text-slate-900/g, replacement: 'text-content-primary' },
  { regex: /(?<!dark:)text-slate-800/g, replacement: 'text-content-primary' },
  { regex: /(?<!dark:)text-slate-700/g, replacement: 'text-content-secondary' },
  { regex: /(?<!dark:)text-slate-600/g, replacement: 'text-content-muted' },
  { regex: /(?<!dark:)text-slate-500/g, replacement: 'text-content-muted' }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
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
  
  for (const { regex, replacement } of replaceMap) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
