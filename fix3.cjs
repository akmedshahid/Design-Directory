const fs = require('fs');
let c = fs.readFileSync('src/data/generateMocks.cjs', 'utf8');
c = c.replace(/Elena's/g, "Elena\\'s");
fs.writeFileSync('src/data/generateMocks.cjs', c);
