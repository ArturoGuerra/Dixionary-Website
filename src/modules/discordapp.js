const discord = require('discord.js');
const dixionary = require('../dixionaryweb.js');

const dclient = new discord.Client();
const config = dixionary.config;
const app = dixionary.app;
const rclient = dixionary.rclient;
dclient.login(config.token)
 
exports.guilds = function(callback) {
    var guilds = [];
    var cache = 1;
    var guild_count = 0;
    dclient.guilds.array().forEach((guild, index, array) => {
        var o = guild.owner.user.username;
        guilds.push({id: guild.id, name: guild.name, owner: o, members: guild.memberCount, region: guild.region });
        guild_count++;
        if (guild_count == array.length) {
            callback(guilds);
        }
    });
}

exports.selectguild = function(guildid, callback) {
    dclient.guilds.array().forEach(guild => {
        if (guild.id == guildid) {
            callback(guild);
        }
    });
}
