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

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(minify());
app.use('/static', express.static(`${__dirname}/static`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(cookiesession);
app.use('/api', dixionaryapi);
app.use('/', dixionaryweb);

function startServer() {
    // Creates unix socket
    var server = http.createServer(app);
    server.listen("./dixionaryweb.sock");
    server.on('listening', onListening);
    function onListening() {
        fs.chmodSync('./dixionaryweb.sock', '775');
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

exports.app = app;
