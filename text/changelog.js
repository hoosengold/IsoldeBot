const Discord = require("../node_modules/discord.js"),
changelogMessage = require("../bot.js");

function updates(message) {
    message.channel.send(`The Friend Updates:
-------------------------------------

**1.** Added \`*addMusic\` command. It takes an youtube link and adds it to a pool of youtube links.
**2.** Added \`*getMusic\` command. It takes a random youtube link from the \`*addMusic\` pool.`
    );  
}
module.exports = updates;