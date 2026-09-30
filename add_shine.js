const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('bg-gold-gradient')) {
    // Only replace if it doesn't already have btn-shine-effect
    const newContent = content.replace(/bg-gold-gradient(?!.*btn-shine-effect)/g, 'bg-gold-gradient btn-shine-effect');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
