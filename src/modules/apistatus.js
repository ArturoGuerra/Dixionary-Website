const requestify = require("requestify");
var endpoints = [
{url: "http://lundmar.arturonet.com:8090/status", type: "bot", sharded: true, shard: 1},
{url: "http://kamino.arturonet.com:8090/status", type: "bot", sharded: true, shard: 0},
{url: "https://api.dixionary.com/api/status", type: "api"}
];
exports.statusapi = (callback) => {
    var responses =[];
    var indexs = 0;
    endpoints.forEach(async (endpoint, index, array) => {
        var response = {};
        var options = {method: "GET", timeout: 1000};
        try {
            var raw_request = await requestify.request(endpoint.url, options);
            var request = JSON.parse(raw_request.body);
        } catch (err) {
            var request = {};
        }
        response.type = endpoint.type;
        if (request.status === "operational") {
            response.status = request.status;
        } else {
            response.status = "down";
        }
        if (endpoint.type === "bot") {
            if (endpoint.sharded == true) {
                response.sharded = true;
                response.shard = endpoint.shard;
            } else {
                response.sharded = false
            }
        }
        responses.push(response);
        indexs++;
        statusapiCallback(indexs, array, responses, callback);
    });
}

function statusapiCallback(index, array, response, callback) {
    if (index === array.length) {
        console.log("Sending playload...");
        callback(response);
    }
}

function TestCallback(result) {
    console.log(result)
}
