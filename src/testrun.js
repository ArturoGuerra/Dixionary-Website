#!/usr/bin/env nodejs
const dixionaryweb = require('./dixionaryweb');
const app = dixionaryweb.app;

function onListening() {
    console.log("Running test server on port 8080");
}

app.listen("8080", onListening);
