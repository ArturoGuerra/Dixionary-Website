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
    requestify.get('https://api.dixionary.com/api/fetch').then(result => {
        var body = JSON.parse(result.body);
        res.json(body);
     });
});

router.post('/translate', (req, res, next) => {
    cache.route();
    var indexs = 0;
    try {
        var original = req.body.message.split(' ');
        var message = req.body.message;
        console.log(original);
    } catch (e) {
        var original = [];
        var message = '';
        res.status(400).send("400 Bad Request");
    }
    requestify.post('https://api.dixionary.com/api/get', {message: message}).then((result) => {
        var corrected = JSON.parse(result.body);
        var string = [];
        for (let x=0; x < original.length; x++) {
            for(let y=0; y < corrected.length; y++) {
                if (original[x] == corrected[y].english) {
                    string.push(corrected[y].scammer);
                    indexs++
                    break;
                }
            }
        }
        console.log(string);
        res.json(string);
    })
    .catch(console.log);
});

router.use('/search', (req, res, next) => {
    cache.route();
    var indexs = 0;
    try {
        var original = req.body.message.split(' ')[0];
        console.log(original);
    } catch (err) {
        res.status(400).send(err.message);
    }
    requestify.request("https://mashape-community-urban-dictionary.p.mashape.com/define?term=" + original, {
        method: 'GET',
        headers: {
            "X-Mashape-Key": "ag4I5ZUGstmshdijUSKIyrfQ9rG8p1GlEYnjsng2XYtDfJGDFw",
            "Accept": "text/plain"
        }
    }).then(responce => {
        let definition = responce.getBody().list[0].definition;
        console.log(`Definition: ${definition}`);
        requestify.post('https://www.dixionary.com/api/translate', {message: definition}).then(result => {
            let body = JSON.parse(result.body);
            let message = body.join(' ').replace(/'/g, "");
            console.log(message);
            res.send(message);
        }).catch(err => {
            res.status(400).send(err.message)
        });
    }).catch(err => {res.status(400).send(err.message)});
});




module.exports = router
