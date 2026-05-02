const fs = require('fs');
const file = 'src/data/generateMocks.cjs';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$').replace(/\\'/g, "'");
fs.writeFileSync(file, content);
console.log('Fixed file.');
