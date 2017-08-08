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
//router.use(ratelimit);
router.get('/fetch', (req, res, next) => {
    cache.route();
    requestify.get('http://api.dixionary.com/api/fetch').then(result => {
        var body = JSON.parse(result.body);
        res.json(body);
     });
});

router.use('/translate', (req, res, next) => {
    cache.route();
    var indexs = 0;
    try {
        var original = req.body.message.split(' ');
        console.log(original);
    } catch (e) {
        res.status(400).send("400 Bad Request");
    }
    requestify.post('http://api.dixionary.com/api/get', {message: req.body.message}).then((result, indexs, array) => {
        var corrected = JSON.parse(result.body);
        var string = [];
        for (let x=0; x < original.length; x++) {
            for(let y=0; y < corrected.length; y++) {
                if (original[x] == corrected[y].english) {
                    string.push(corrected[y].scammer);
                    indexs++
                }
            }
        }
        console.log(string);
        res.json(string);
    })
    .catch(console.log);
});

router.get('/search', (req, res, next) => {});

module.exports = router
