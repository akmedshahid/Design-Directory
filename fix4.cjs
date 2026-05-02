const fs = require('fs');
let c = fs.readFileSync('src/data/generateGroupBuysMocks.cjs', 'utf8');
c = c.replace(/\\`/g, "`");
c = c.replace(/\\\$/g, "$");
fs.writeFileSync('src/data/generateGroupBuysMocks.cjs', c);
