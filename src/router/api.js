#!/usr/bin/env nodejs
const express = require('express');
const RateLimit = require('express-rate-limit');
const requestify = require('requestify');
const router = express.Router();
const cache = require('../dixionaryweb.js').cache;
const ratelimit = new RateLimit({
    windowMs: 3600000,
    max: 200,
    dalayMs: 0
});
router.use(ratelimit);
router.get('/fetch', (req, res) => {
    cache.route();
    requestify.get('http://api.dixionary.com/api/fetch').then(result => {
        var body = JSON.parse(result.body);
        res.json(body);
     });
});

module.exports = router
