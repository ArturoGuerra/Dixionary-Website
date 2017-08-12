#!/usr/bin/env nodejs
const express = require('express');
const router = new express.Router();
const dixionary = require('../dixionaryweb.js');
const config = dixionary.config;
const oauth = require('./auth.js');
const dmodules = require('../modules/discordapp.js');
const apimodules = require('../modules/apistatus.js');

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
        console.log(`Authenticated User: ${req.user.username}:${req.user.id}`);
        for (let i = 0; i < config.admin.length; i++) {
            if (req.user.id == config.admin[i]) {
                console.log("Admin user detected");
                req.args.admin = true;
                break;
            }
        }
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

router.get('/status', checkAuth, (req, res, next) => {
    apimodules.statusapi(results => {
        req.args.bot = [];
        req.args.api = [];
        req.args.errors = [];
        results.forEach((result, index, array) => {
            if (result.description === "bot") {
                req.args.bot.push(result);
            } else if (result.description === "api") {
                req.args.api.push(result);
            } else if (result.description === "error") {
                req.args.errors.push(result);
            }
            if (index === (array.length - 1)) {
                console.log("Got status results");
                res.render('pages/status', req.args);
            }
        });
    });
});

router.get(['/servers/:server', '/servers'], (req, res, next) => {
    if (!req.params.server) {
        console.log("No guild selected");
        dmodules.guilds((guilds) => {
            req.args.guilds = guilds;
            res.render('pages/servers/servers-list', req.args);
        });
    } else {
        console.log("Selected guild:" + req.params.server);
        dmodules.selectguild(req.params.server, (guild) => {
            function after() {
                req.args.shard = Math.abs((guild.id >> 22) % 2);
                req.args.guild = guild;
                res.render('pages/servers/servers-selected', req.args);
            }
            console.log(guild.name);
            guild.defaultChannel.createInvite().then((invite) => {
                console.log(invite.url);
                req.args.inwite = invite.url;
                after();
            }).catch(err => {
                console.log(err.message);
                after();
            });
        });
    }
});

router.get(['/dashboard/:page', '/dashboard'], checkAuth, (req, res, next) => {
    if (!req.params.page) {
        res.redirect("/dashboard/page");
    } else {
    res.redirect("/");
    }
});

router.put('/dashboard/:page/push', checkAuth, (req, res, next) => {
    res.redirect("/");
});

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
