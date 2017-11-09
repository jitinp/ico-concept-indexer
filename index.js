var fs = require('fs');
var webIndex = require('./controller/webIndexer');

var icoList = JSON.parse(fs.readFileSync('test.json', 'utf8'));

icoList.forEach(function (item) {
   var url = String(item.links.website);
   var id = item.symbol;
   var concept = item.concept;
   console.log(url);
   webIndex.index(id, url, concept);
});

// console.log(content);