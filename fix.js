const fs = require('fs');
const path = require('path');
function fix(dir) {
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) fix(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      let changed = false;
      if (content.includes('\\`')) { content = content.replace(/\\`/g, '`'); changed = true; }
      if (content.includes('\\$')) { content = content.replace(/\\\$/g, '$'); changed = true; }
      if (changed) {
        fs.writeFileSync(p, content);
        console.log('Fixed', p);
      }
    }
  });
}
fix('src');
