const Discord = require("discord.js");
const helpMessage = require('../../bot.js');

function help(message) {
    message.channel.send(
`Help Menu
--------------------------------------------------------
Available Commands:

** *poll** \`{question} [option1] [option2]\`
Example: 
\`*poll {Do you like the polls?} [Yes] [Of course!] [Best polls ever!]\`
*Note:* Each poll can have **up to 20 options**.

** *countdown** \`hours\`
Example: \`*countdown 6\`
Adds 6 hours to the countdown timer. 
    
*Note:* At least 1 hour has to be added, no upper limit (but be reasonable). Sends a message when 1 hour/30 minutes is left and when no time is left.

** *addMusic \`youtube_link\`**
Example: \`*addMusic https://www.youtube.com/...\`
or
                \`*addMusic www.youtube.com/...\`
Adds the song suggestion to a pool with other songs.

*Note:* If you are pasting YouTube link and the command still returns, that it accepts only YouTube links, remove all but one empty spaces between the command \`*addMusic\` and the link.

** *getMusic**
Returns a random song from the already suggested songs.

** *updates** 
Returns a list with the most recent changes to the bot.`
    );
}

module.exports = help;