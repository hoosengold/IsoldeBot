//Import all required modules
const Discord = require('./node_modules/discord.js'),
    bot = new Discord.Client(), //initialize client for the bot
    prefix = "*", //prefix for all commands
    config = require('./config.json'), //Login with test bot
    poll = require('./util/poll/poll.js'), //import the module required for the poll command
    countdown = require('./util/countdown/countdownTimer.js'), //import the module required for the countdown command
    updates = require('./text/changelog.js'), //import the module required for the updates command
    help = require('./util/help/help.js'), //import the module required for the help command
    musicAdd = require('./util/music/musicAdd.js'), //import the module required for the addMusic command
    musicGet = require('./util/music/musicGet.js'), //import the module required for the getMusic command
    lore = require('./text/lore.js'), //import the module required for the story command
    typo = require('./text/help.json'); //import the module required for the default switch case

//Login with deploy bot + 
//change app id
//require('dotenv').config();
//bot.login(process.env.DISCORD_TOKEN);


//Login with test bot
bot.login(config.token);

//Print Ready in the console when the bot is ready
bot.once("ready", () => {
    console.log(`Ready!`)
})

bot.on("message", function (message) {
    if (message.author.bot) return; //checks if the author of the message is a bot, if it is, then it does not respond
    if (!message.content.startsWith(prefix)) return; //checks if the message starts with *, if it does not, then it does not respond


    //takes the message body, removes the prefix !, splits the message body and makes everything lower case
    const commandBody = message.content.slice(prefix.length), //returns everything without the prefix
        args = commandBody.split(/ +/), //returns args[] where [0] is the first word arfter the command
        command = args.shift(); //returns the command
    console.log(`command: ${command}`)
    console.log(`args: ${args}`)
    console.log(`commandBody: ${commandBody}`)

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
        default: message.channel.send(typo.default);
    }
});
