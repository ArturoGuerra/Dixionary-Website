const requestify = require('requestify');

exports.statusapi = function(callback) {
    var apis = ['http://lundmar.arturonet.com:8080/status', 'http://anodevps.arturonet.com:8080/status', 'http://api.dixionary.com/api/status'];
    var indexs = 0;
    var results = [];
    apis.forEach((api, index, array) => {
        requestify.request(api, {
            method: "GET",
            timeout: 1000
        }).then(result => {
            results.push(result.getBody());
            console.log(result.getBody());
            indexs++;
        }).catch(err => {
            console.log(err);
            indexs++;
            r = {};
            r.status = 'down';
            r.description = 'error';
            results.push(r);
        });
    });
    setTimeout(function() {
        console.log("Sending payload...");
        callback(results);
    }, 3001);
}


