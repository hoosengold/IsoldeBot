const Discord = require("../node_modules/discord.js");
var help = require('../bot.js');

function help(message) {
    message.channel.send("Help Menu " +
        "\n -------------------------------------------------------- \n" +
        " Available Commands: \n\n **!poll** `{question} [option1]" +
        " [option2]` \n\n Example: \n `!poll {Do you like the polls?}" +
        " [Yes] [Of course!] [Best polls ever!]` \n\n *Note:* Each poll can have" +
        " **up to 20 options**.",
    );
}

module.exports = help;