const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');
fs.writeFileSync(path.resolve(__dirname, '../src/version.ts'), `// This file is autogenerated by script/version.js
export const version = "${pkg.version}"
`, 'utf8');
