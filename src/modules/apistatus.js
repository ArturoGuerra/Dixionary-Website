const requestify = require('requestify');

exports.statusapi = function(callback) {
    var apis = ['http://lundmar.arturonet.com:8080/status', 'http://anodevps.arturonet.com:8080/status', 'https://api.dixionary.com/api/status'];
    var indexs = 0;
    var results = [];
    apis.forEach((api, index, array) => {
        requestify.request(api, {
            method: "GET",
            timeout: 1000
        }).then(result => {
            results.push(result.getBody());
            indexs++;
            statusapiCallback(indexs, array, results, callback);
        }).catch(err => {
            console.log(err);
            result = {};
            result.status = 'down';
            result.description = 'error';
            results.push(result);
            indexs++;
            statusapiCallback(indexs, array, result, callback);
        });
    });
}

function statusapiCallback(index, array, result, callback) {
    console.log(index);
    if (index == array.length) {
        console.log("Sending payload...");
        callback(result);
    }
}
