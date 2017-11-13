var elasticsearch = require('elasticsearch');
var AWS = require('aws-sdk');

let options = {
    hosts: 'https://search-streetapp-almukpx3jygyjngjrqhwj5i4ee.us-west-2.es.amazonaws.com', // array of amazon es hosts (required)
    connectionClass: require('http-aws-es'), // use this connector (required)
    awsConfig: new AWS.Config(), // set an aws config e.g. for multiple clients to different regions
    httpOptions: {} // set httpOptions on aws-sdk's request. default to aws-sdk's config.httpOptions
};

var elasticClient = new elasticsearch.Client(options);


var indexName = 'ico';

function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: 'ico',
        body: {
            properties: {
                symbol: { type: 'string' },
                suggest: {
                    type: 'completion',
                    analyzer: 'simple',
                    search_analyzer: 'simple',
                    payloads: true
                }
            }
        }
    });
}
exports.initMapping = initMapping;

function addIco(ico) {
    return elasticClient.index({
        index: 'ico',
        id: '1',
        type: 'upcoming',
        body: {
            "ConstituencyName": "Ipswich",
            "ConstituencyID": "E14000761",
            "ConstituencyType": "Borough",
            "Electorate": 74499,
            "ValidVotes": 48694
        }
    });
}
exports.addico = addIco;

function getSuggestions(input) {
    return elasticClient.suggest({
        index: indexName,
        type: 'ico',
        body: {
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