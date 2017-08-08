const discord = require('discord.js');
const dixionary = require('../dixionaryweb.js');

const dclient = new discord.Client();
const config = dixionary.config;
const app = dixionary.app;
const rclient = dixionary.rclient;
dclient.login("MjY3MzQwMzY1MzQ4OTk1MDcy.DGrNfg.Ujl6fMnDkOF_uLdVsETUCrmKSP0")
exports.guilds = function(req, res, next) {
    var guilds = [];
    var cache = 1;
    var guild_count = 0;
    dclient.guilds.array().forEach((guild, index, array) => {
        var o = guild.owner.user.username;
        guilds.push({id: guild.id, name: guild.name, owner: o, members: guild.memberCount, region: guild.region });
        guild_count++;
        if (guild_count == array.length) {
            req.args.guilds = guilds;
            res.render('pages/servers', req.args);
        }
    });
}

