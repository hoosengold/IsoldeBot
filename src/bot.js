//Array with emojis for react(), currently not used, see line 84 for reactions array
//const reactArray = require("../util/reactArray");


//Import all required modules
const Discord = require("discord.js"),
    config = require("../config.json"),
    bot = new Discord.Client(),
    prefix = "!",
    poll = require("../util/poll.js");
    //setInterval = require('../util/countdownTimer.js'),
    //emojiArray = require("../util/emojiArray.js");




//Login with the bot, prints Ready in the console when the bot is ready
bot.login(config.DISCORD_TOKEN);
bot.once("ready", () => { 
	console.log("Ready!");
})

bot.on("message", function(message){
    if (message.author.bot) return; //checks if the author of the message is a bot, if it is, then it does not respond
    if (!message.content.startsWith(prefix)) return; //checks if the message starts with !, if it does not, then it does not respond


//takes the message body, removes the prefix !, splits the message body and makes everything lower case
    const commandBody = message.content.slice(prefix.length),
        args = commandBody.split(' '),
        command = args.shift().toLowerCase();

//check for the different commands
    if(command === "help"){
        return message.channel.send('How to use the `!poll` command: \n\n `!poll {question} [option1] [option2]` \n\n Example: \n `!poll {Do you like the polls?} [Yes] [Of course!] [Best polls ever!]` \n\n *Note:* Each poll can have **up to 20 options**.');
    }else if (command === "poll"){
            poll(message, args);
    }else if(command === "timedPoll"){

    }

});