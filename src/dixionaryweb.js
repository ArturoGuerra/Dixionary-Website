#!/usr/bin/env nodejs
const express = require('express');
const path = require('path');
const compression = require('compression');
const http = require('http');
const fs = require('fs');
const config = exports.config = require('./config/config.js');
const cache = exports.cache = require('express-redis-cache')({expire: 1000});
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const minify = require('express-minify');
const redis = require('redis');
const app = express();
const dixionaryapi = require('./router/api.js');
const dixionaryweb = require('./router/web.js');
const cookiesession = cookieSession({name: "websession", keys: [config.secret1, config.secret2], maxAge: 24 * 60 * 60 * 1000});
const rclient = redis.createClient();


app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(compression());
app.use(minify());
app.use('/static', express.static(path.join(__dirname, "static")));
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(cookiesession);
app.use('/api', dixionaryapi);
app.use('/', dixionaryweb);

function startServer() {
    // Creates unix socket
    var socketFile = path.join(__dirname, "dixionaryweb.sock");
    fs.unlink(socketFile, (err) => {
        if (err) {
            console.log("Socket file doesn't exist");
        } else {
            console.log("Deleted socket file");
        }
    });
    var server = http.createServer(app);
    server.listen(socketFile);
    server.on('listening', onListening);
    function onListening() {
        fs.chmodSync(socketFile, '775');
        console.log("Started unix socked");
    };
    // Deletes socket file
    function servershutdown () {
        server.close();
    }
    process.on('SIGINT', servershutdown);
}

if (require.main === module) {
    startServer();
}
exports.rclient = rclient;
exports.app = app;
