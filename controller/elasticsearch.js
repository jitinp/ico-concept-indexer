var elasticsearch = require('elasticsearch');
var AWS = require('aws-sdk');


// var options = {
//     hosts: 'https://search-streetapp-almukpx3jygyjngjrqhwj5i4ee.us-west-2.es.amazonaws.com/', // array of amazon es hosts (required)
//     connectionClass: require('http-aws-es'), // use this connector (required)
//     awsConfig: new AWS.Config(), // set an aws config e.g. for multiple clients to different regions
//     httpOptions: {} // set httpOptions on aws-sdk's request. default to aws-sdk's config.httpOptions
// };

var options = {
    hosts: 'https://search-streetapp-almukpx3jygyjngjrqhwj5i4ee.us-west-2.es.amazonaws.com/'
};


var elasticClient = new elasticsearch.Client(options);


// var indexName = 'ico';

function indexExists(indexName) {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function createIndex(indexName) {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.createIndex = createIndex;

function deleteIndex(indexName) {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

function createMapping(indexName) {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: 'ico',
        body: {
            properties: {
                symbol: { type: 'string' },
                name: { type: 'string'},
                concept: { type: 'string'},
                html: { type: 'string'},
                whitepaper: { type: 'string'}
            }
        }
    });
}
exports.createMapping = createMapping;

function addDocument(indexName, ico) {
    return elasticClient.index({
        index: indexName,
        type: 'ico',
        id: ico.id,
        body: {
            symbol: ico.id,
            name: ico.name,
            concept: ico.concept,
            html: ico.html,
            whitepaper: ""
        }
    }, function(err,resp,status) {
        console.log("resp\n" + resp);
    });
}
exports.addDocument = addDocument;

function getSuggestions(input) {
    return elasticClient.suggest({
        index: indexName,
        type: 'ico',
        concept: {
            docsuggest: {
                text: input,
                completion: {
                    field: 'suggest',
                    fuzzy: true
                }
            }
        }
    })
}
exports.getSuggestions = getSuggestions;