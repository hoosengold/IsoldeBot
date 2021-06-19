const Discord = require("../node_modules/discord.js"),
changelogMessage = require("../bot.js");

function updates(message) {
    message.channel.send(`The Friend Updates:
-------------------------------------

**1.** You found a new song and want to share it for others to enjoy as well? Or maybe you want something new and fresh in your YouTube playlist? **The Friend** got your back! 
Use the *new* command \`*addMusic\` to suggest songs for other Stream Fams to enjoy! All you have to do is paste the YouTube link. It can't get any easier! :purple_heart:
If you want to see what others are suggesting, just type \`*getMusic\` and enjoy a Brave New World!
If you are experiencing problems, type \`*help\` in chat.

**2.** The Friend. Such a wonderful name. :smile: But where it's coming from? Why \"The Friend\" and not The Best Discord Bot In Existence? Well, maybe there is a super secret command to reveal the story behind The Friend. :exploding_head:
Or maybe all of this is just a clever ruse. :smiling_imp:`
    );  
}
module.exports = updates;