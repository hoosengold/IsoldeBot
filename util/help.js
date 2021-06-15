const Discord = require("../node_modules/discord.js");
const helpMessage = require('../bot.js');

function help(message) {
    message.channel.send("Help Menu " +
        "\n -------------------------------------------------------- \n" +
        " Available Commands:"+
        " \n\n ** *poll** `{question} [option1] [option2]`"+
        " \n\n Example:"+
        " \n `*poll {Do you like the polls?} [Yes] [Of course!] [Best polls ever!]`"+
        " \n\n *Note:* Each poll can have **up to 20 options**. \n\n" +
        "** *countdown** `hours` \n\n" +
        "Example: `*countdown 6` \n" +
        "Adds 6 hours to the countdown timer. \n\n"+
        "*Note:* At least 1 hour has to be added, no upper limit (but be reasonable). Sends a message when 1 hour/30 minutes is left and when no time is left. \n\n" +
        "** *updates** \n" +
        "Returns a list with the most recent changes to the bot."
    );
}

module.exports = help;