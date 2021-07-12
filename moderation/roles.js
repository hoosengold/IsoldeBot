const Discord = require('discord.js'),
    config = require('../config.json'),
    index = require('../index.js'),
    automod = require('./automod.js');

function roles(message) {
    var isAdmin = new Boolean();
    if(member.hasPermission('KICK_MEMBERS')){
        return isAdmin = true;
    }else{
        return isAdmin = false;
    }
}