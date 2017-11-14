var request = require('request');
var fs = require('fs');
// var es = require('./elasticsearch.js');

module.exports = {

    index: function (es, index, id, url, concept) {

        // Sample data-structure for indexing values
        // data = {
        //     "id": symbol,
        //     "url": url,
        //     "concept": concept,
        //     "contents": [
        //         {
        //             "title": home_page_title,
        //             "data": home_content
        //         },
        //         {
        //             "title": team_page_title,
        //             "data": team_page_content
        //         }
        //     ]
        // };

        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                // console.log(html);

                var data = {};

                data.id = id;
                data.name = id;
                data.concept = concept;

                var contents = {
                    url: url,
                    html: html
                };

                var contentsArr = [];
                contentsArr.push(contents);

                // data.contents = contentsArr;
                data.html = html;

                // console.log(data);
                // fs.appendFileSync('test/results.json', JSON.stringify(data) + ",\n");
                es.addDocument(index, data).then(function (created) {
                    console.log('Entry Created' + created);
                });

            }
        });
        return;
    }
}