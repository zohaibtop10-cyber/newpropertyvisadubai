const fs = require('fs');
let content = fs.readFileSync('src/data/cmsData.js', 'utf8');
content = content.replace(/id:\s*['"]spouse-visa['"]/g, "id: 'family-visa'");
content = content.replace(/id:\s*['"]new-born['"]/g, "id: 'new-born-visa'");
fs.writeFileSync('src/data/cmsData.js', content);
console.log('Fixed routing slugs!');
