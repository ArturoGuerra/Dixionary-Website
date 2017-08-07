#!/usr/bin/env nodejs
const express = require('express');
const router = new express.Router();
const dixionary = require('../dixionaryweb.js');
const config = dixionary.config;
const oauth = require('./auth.js');

//Router middleware
const scope = ['guilds', 'identify'];
const DebugcallbackURL = 'http://aws.arturonet.com:8080/login/callback';
const callbackURL = 'https://www.dixionary.com/login/callback';

router.use(oauth.initialize());
router.use(oauth.session());
router.use(error_500);
router.use((req, res, next) => {
    req.session.redirect = req.path || '/';
    if (req.isAuthenticated()) {
        console.log(`Authenticated User: ${req.user.username}`);
    }
    if (!req.session.views) {
        req.session.views = {};
    }
    req.session.views[req.path] = (req.session.views[req.path] || 0) + 1;
    console.log(`${req.session.views[req.path]} ${req.path}`);
    next()
});

router.get('/login/callback', oauth.authenticate('discord', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/');
});

router.get('/login', oauth.authenticate('discord', {scope: scope, callbackURL: callbackURL}), (req, res) => {});

router.get('/logout', checkAuth, (req, res) => {
    req.logout();
    res.redirect('/');
});

//Front end routes
router.use((req, res, next) => {
    req.args = defaultArgs(req, res);
    next();
});
router.get('/', (req, res) => {
    res.render('pages/index', req.args);
});

router.get('/dixionary', checkAuth, (req, res) => {
    res.render('pages/dixionary', req.args);
});

router.get('/search', checkAuth, (req, res) => {
    res.render('pages/search', req.args)
});

router.get('/translate', checkAuth, (req, res) => {
    res.render('pages/translate', req.args);
});

router.get('/apinfo', checkAuth, (req, res) => {
    res.render('pages/apinfo', req.args);
});

router.get('/status', (req, res) => {
    res.render('pages/status', req.args);
});

router.get(['/servers', '/servers/:server'], (req, res) => {
    res.render('pages/servers', req.args);
});

router.get('/dashboard/:page', checkAuth, (req, res) => {
    res.send("Authenticated");
});

router.get('/dashboard/:page/push', checkAuth);

//Error Handling
//404
router.use((req, res) => {
    req.args.hero = {title: "404 CHILL NOT FOUND", subtitle: "RIP DADDY DEV", extra: "Shit goes here"}
    res.render('errors/custom_404', req.args);
});

//500
function error_500(err, req, res, next) {
    req.args.error = error.message;
    res.render('errors/custom_500', req.args);
}

//Helper functions
function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Auth successful!!");
        next();
    } else {
        console.log("Auth failed");
        res.redirect('/login');
    }
}
function defaultArgs(req, res) {
    var args = {};
    args.navbar_items = [
    {href: '/', id: "Home", content: "Home"},
    {href: "/dixionary", id: "dixionary", content: "Dixionary"},
    {href: "/search", id: "search", content: "Search"},
    {href: "/translate", id: "translate", content: "Translate"},
    {href: "/apinfo", id: "apinfo", content: "API Info"},
    {href: "/status", id: "status", content: "Status"},
    {href: "/servers", id: "servers", content: "Servers"},
    {href: "/dashboard/main", id: "dashboard", content: "Dashboard"}
    ]
    if (req.isAuthenticated()) {
        args.user = req.user;
    }
    return args
}

module.exports = router;
