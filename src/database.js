const Sequelize = require('sequelize');
const config = require('./config/config.js');
const sequelize = exports.sequelize = new Sequelize(config.database, config.dbuser, config.dbpasswd, {
    host: config.host,
    dialect: 'mysql'
});

const Servers = exports.Servers = false;

const Channels = exports.Channels = false;

const Perms = exports.Perms = false;

const Pluginoverides = exports.Pluginoverides = false;

const Overides = exports.Overides = false;

const Dixionary = exports.Dixionary = false;

const Quotes = exports.Quotes = false;

const Memes = exports.Memes = false;

const Punishments = exports.Punishments = false;

const Playlists = exports.Playlists = false;


