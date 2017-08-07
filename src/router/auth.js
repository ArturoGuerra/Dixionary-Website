const passport = require('passport');
const DiscordS = require('passport-discord').Strategy;
const scopes = ['guilds', 'email', 'identify'];
const dixionary = require('../dixionaryweb.js');
const config = dixionary.config;
const redirectUri = "http://aws.arturonet.com:8080/login/callback"

passport.serializeUser(function(user, callback) {
    callback(null, user);
});
passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
});

discords = new DiscordS({
    clientID: config.clientid,
    clientSecret: config.clientsecret,
    callbackURL: redirectUri,
    scopes: scopes
}, (accessToken, refreshToken, profile, callback) => {
    process.nextTick(() => {
        return callback(null, profile);
    })
})

passport.use(discords);

module.exports = passport;
