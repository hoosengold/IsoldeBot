//Import all required modules
const Discord = require("discord.js"),
    bot = new Discord.Client(),
    prefix = "*",
    config = require("./config.json"), //Login with test bot
    poll = require("./util/poll.js"),
    countdown = require("./util/countdownTimer.js"),
    updates = require('./text/changelog.json'),
    help = require('./util/help.js'),
    music = require('./util/music.js'),
    typo = require('./text/help.json');

//Login with deploy bot
//require('dotenv').config();
//bot.login(process.env.DISCORD_TOKEN);


//Login with test bot
bot.login(config.token);

//Print Ready in the console when the bot is ready
bot.once("ready", () => {
    console.log("Ready!");
})

bot.on("message", function (message) {
    if (message.author.bot) return; //checks if the author of the message is a bot, if it is, then it does not respond
    if (!message.content.startsWith(prefix)) return; //checks if the message starts with !, if it does not, then it does not respond


    //takes the message body, removes the prefix !, splits the message body and makes everything lower case
    const commandBody = message.content.slice(prefix.length),
        args = commandBody.split(' '),
        command = args.shift();
    console.log("command: " + command);
    console.log("args: " + args);
    console.log("commandBody: " + commandBody);

    //check for the different commands
    switch (command) {
        case "help":
            help(message);
            break;
        case "poll":
            poll(message, args);
            break;
        case "countdown":
            countdown(message, args);
            break;
        case "updates":
            message.channel.send(updates.changelog);
            break;
        case "addMusic":
            music(message, args);
            console.log('command taken');
            break;
        default: message.channel.send(typo.default);
    }
});
