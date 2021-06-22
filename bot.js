//Import all required modules
const Discord = require('discord.js'),
    //bot = new Discord.Client(), //initialize client for the bot
    //prefix = "*", //prefix for all commands
    //config = require('./config.json'), //Login with test bot
    botReq = require('./index.js'),
    poll = require('./util/poll/poll.js'), //import the module required for the poll command
    countdown = require('./util/countdown/countdownTimer.js'), //import the module required for the countdown command
    updates = require('./text/changelog.js'), //import the module required for the updates command
    help = require('./util/help/help.js'), //import the module required for the help command
    musicAdd = require('./util/music/musicAdd.js'), //import the module required for the addMusic command
    musicGet = require('./util/music/musicGet.js'), //import the module required for the getMusic command
    lore = require('./text/lore.js'), //import the module required for the story command
    typo = require('./text/help.json'); //import the module required for the default switch case


function bot(message, args, command) {

    //check for the different commands
    switch (command) {
        case "help": //command help
            help(message);
            break;
        case "poll": //command poll
            poll(message, args);
            break;
        case "countdown": //command countdown
            countdown(message, args);
            break;
        case "updates": //command updates
            updates(message);
            break;
        case "addMusic": //command addMusic
            musicAdd(message, args);
            break;
        case "getMusic": //command getMusic
            musicGet(message);
            break;
        case "story": //command story
            lore(message);
            break;
        //default: message.channel.send(typo.default); removed until *word* bug is fixed
    }

}

module.exports = bot;
