const index = require('../index');
const console = require('./console');

const requesttify = require('requestify');
const RateLimit = require("express-rate-limit");

exports.init = function (app) {

    app.use('/api/', new RateLimit({
        windowMs: 3600000,	// 150 requests/per hr
        max: 150,
        delayMs: 0
    }));

    app.get('/api/fetch', (req, res) => {
        requesttify.get('http://api.dixionary.com/dixionary/vords').then(body => {
            res.json(body);
        })
    })
};