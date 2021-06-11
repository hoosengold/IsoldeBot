//Array with emojis for react(), currently not used, see line 84 for reactions array
//const reactArray = require("../util/reactArray");


//Import all required modules
const Discord = require("discord.js"),
    config = require("../config.json"),
    bot = new Discord.Client(),
    prefix = "!",
    setInterval = require('../util/countdownTimer.js'),
    emojiArray = require("../util/emojiArray.js");


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
    }

});

function poll(message, args){
//format the output/messsage body
    const squigglyRegex = RegExp(/{(.*?)}/),
        squareRegex = RegExp(/\[[^[]+\]/g), 
        timeRegex = RegExp(/{(\h)}/), //time format, should only read hours and not dates
        pollParameters = args.join(' '),
        pollTitle = squigglyRegex.test(pollParameters) ? squigglyRegex.exec(pollParameters)[1] : null;

        console.log(squigglyRegex.exec(pollParameters));

    //checks if the command has title
    if (!pollTitle){
            return message.channel.send('No poll title specified. Type !help for more info.').catch(err => console.log(err));
    }


    //
    pollParameters.replace(`{${pollTitle}}`, '');
    const pollsArray = pollParameters.match(squareRegex);


    //checks if the command has options and if they are more than 20
    if(!pollsArray){
        return message.channel.send('No poll options specified. Type !help for more info.').catch(err => console.log(err));
    } else if (pollsArray.length > 20){
        return message.channel.send('Max. 20 poll options allowed.').catch(err => console.log(err));
    }

    //should take the hours from the args and separate it
    /*const timedPoll = timeRegex.test(args[0]) ? timeRegex.exec(args[0])[0] : null;
    console.log("timedPoll: " + timedPoll);*/
    
    //creates the poll message
    let i = 0;
    const pollMessage = pollsArray.map(poll => `${emojiArray()[i++]} ${poll.replace(/\[|\]/g, '')}`).join('\n\n');
    
    //poll message format and content
    const embed = {
        color: 'PURPLE',
        title: pollTitle,
        description: pollMessage,
    }


    //array with the reactions amojis
    const reactions = ['🇦',
                        '🇦',
                        '🇧',
                        '🇨',
                        '🇩',
                        '🇪',
                        '🇫',
                        '🇬',
                        '🇭',
                        '🇮',
                        '🇯',
                        '🇰',
                        '🇱',
                        '🇲',
                        '🇳',
                        '🇴',
                        '🇵',
                        '🇶',
                        '🇷',
                        '🇸',
                        '🇹'];

    //messages the poll and then reacts to it with the reactions[]
    const msg = message.channel.send({embed: embed}).catch(err => console.log(err))
    .then (function (message){
        for(let j = 0; j < i + 1; j++){
            message.react(reactions[j])
        }
    });


    //checks if the poll is timed, if it is, it starts a countdown timer, see countdownTimer.js, work in progress
    /*if(timedPoll){
        var hoursLeft = timeRegex.exec(args[1])[1];//should only take the hours argument
        console.log("hoursLeft:" + hoursLeft);
        message.channel.send('You have ' + hoursLeft + 'hours left to vote!');
        return setInterval(hoursLeft);
    }*/
}
