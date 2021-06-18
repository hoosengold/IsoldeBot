//Import all required modules
const Discord = require("../node_modules/discord.js"),
    fsLib = require('fs');
var musicSuggestion = require('../bot.js');

//Initialize hash map to store the data
let musicMap = new Map();

//The function of the command
function music(message, args) {
    
}

//Export the module so that it can be used by bot.js
module.exports = music;