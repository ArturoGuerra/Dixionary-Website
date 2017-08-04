const console = require('./modules/console');

const cluser = require('cluster');
const os = require('os');
const fs = require('fs');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const express = require('express');
const session = require('express-session');
const cookieSession = require('cookie-session');
const minify = require('express-minify');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan = require('morgan');

const config = exports.config = require('../config.json');

const app = exports.app = express();

try {
    let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {flags: 'a'});

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static('Web'));
    app.set('views', `${__dirname}/views`);
    app.set('view engine', 'ejs');
    app.use(minify());
    app.use(morgan('combined', {stream: accessLogStream}));
    app.use('/', express.static(`${__dirname}/static`));
    app.use(cookieSession({
        name: 'loginSession',
        keys: ['gawawghtdhgwawgaw', 'awdwdjkkjhawdka'],
        maxAge: 12 * 60 * 60 * 1000 // 12 hours
    }));
} catch (err) {
    console.error(`An error occurred during Web initialisation, Error: ${err.stack}`);
}

// Set up modules
try {
    require('./modules/api').init(app);
    require('./modules/webserver') (app, config, express);

} catch (err) {
    console.error(`An error occurred during module initialisation, Error: ${err.stack}`);
}

// Set up final server
try {
    const httpServer = http.createServer(app);
    httpServer.listen(config.server_port || 80, (err) => {
        if (err) {
            console.error(`FAILED TO OPEN WEB SERVER, ERROR: ${err.stack}`);
            return;
        }
        console.info(`Successfully started server..listening on port ${config.server_port || 80}`);
    })
} catch (err) {
    console.error(`Error starting up server, Error: ${err.stack}`)
}