var fs = require('fs');
var aws = require('aws-sdk');
var es = require('./controller/elasticsearch.js');

var webIndex = require('./controller/webIndexer');

var icoList = JSON.parse(fs.readFileSync('test.json', 'utf8'));

var index = 'ico';

// Testing Elastic Search -- using public URL
// only for testing purpose only
// es.deleteIndex(index).then(function () {
//     console.log('Index deleted');
// });

// Create Index and Mapping
es.indexExists(index).then(function (exists) {
    if(!exists)
       return es.createIndex(index);
}).then(function () {
    return es.createMapping(index);
}).then(function () {
    console.log('Index and Mapping Created');
});

icoList.forEach(function (item) {
   var url = String(item.links.website);
   var id = item.symbol;
   var concept = item.concept;
   // console.log(url);
   // webIndex.index(es, index, id, url, concept);
});
