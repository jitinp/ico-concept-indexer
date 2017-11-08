var fs = require('fs');

var content = fs.readFileSync('test.json', 'utf8');

console.log(content);