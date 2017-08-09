#!/usr/bin/env nodejs
const express = require('express');
const router = new express.Router();
const dixionary = require('../dixionaryweb.js');
const config = dixionary.config;
const oauth = require('./auth.js');
const dmodules = require('../modules/discordapp.js');

//Router middleware
const scope = [
    'identify',
    'guilds'
];

router.use(oauth.initialize());
router.use(oauth.session());
router.use((req, res, next) => {
    req.args = defaultArgs(req, res);
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

router.get('/login', oauth.authenticate('discord', {scope: scope}), (req, res) => {});

router.get('/logout', checkAuth, (req, res) => {
    req.logout();
    res.redirect('/');
});

//Front end routes
router.get('/', (req, res, next) => {
    res.render('pages/index', req.args);
});

router.get('/dixionary', (req, res, next) => {
    res.render('pages/dixionary', req.args);
});

router.get('/search', checkAuth, (req, res, next) => {
    res.render('pages/search', req.args)
});

router.get('/translate', (req, res, next) => {
    res.render('pages/translate', req.args);
});

router.get('/apinfo', checkAuth, (req, res, next) => {
    res.render('pages/apinfo', req.args);
});

router.get('/status', (req, res, next) => {
    res.render('pages/status', req.args);
});

router.get(['/servers', '/servers/:server'], (req, res, next) => {
    dmodules.guilds(req, res, next);
});

router.get('/dashboard/:page', checkAuth, (req, res, next) => {
    res.send("Authenticated");
});

router.get('/dashboard/:page/push', checkAuth);

//Error Handling
router.use((req, res, next) => {
    res.render('errors/404', req.args);
});

router.use((err, req, res, next) => {
    console.error(err);
    if (!err.status) {
        err.status = 500;
    }
    console.error(`${err.status} ${err.message} ${err.stack}`)
    req.args.err = err;
    if (err.status == 500) {
        res.status(500).render("errors/500", req.args);
    } else {
        res.status(err.status).render('errors/error', req.args);
    }
});

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
