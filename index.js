const Discord = require('discord.js'),
    client = new Discord.Client(), //initialize client for the bot;
    prefix = "*", //prefix for all commands
    config = require('./config.json'), //Login with test bot
    //webHookHelper = require('discord-interactions'),
    //{ DiscordInteractions, ApplicationCommandOptionType } = require('slash-commands'),
    //slash = require('./slash_commands/testcommand.js'),
    bot = require('./bot.js');

//Login with deploy bot + 
//change app id
//require('dotenv').config();
//client.login(process.env.DISCORD_TOKEN);

//initialize interactions
/*const interaction = new DiscordInteractions({
    //applicationId: process.env.app_id,  //deploy
    //authToken: process.env.DISCORD_TOKEN, 
    //publicKey: process.env.public_key,

    applicationId: config.app_id, //test
    authToken: config.token,
    publicKey: config.public_key,
})

if (interaction) {
    console.log(`Interaction initialization: Done`)
} else {
    console.error
}*/

//Login with test bot
client.login(config.token);

//Print Ready in the console when the bot is ready
client.once("ready", () => {
    //the bot is ready
    console.log(`Ready!`)
})

client.on("message", async function (message) {
    if (message.author.bot) return; //checks if the author of the message is a bot, if it is, then it does not respond
    if (!message.content.startsWith(prefix) || message.content.endsWith(prefix)) return; //checks if the message starts or ends with *


    //takes the message body, removes the prefix !, splits the message body and makes everything lower case
    const commandBody = message.content.slice(prefix.length), //returns everything without the prefix
        args = commandBody.split(/ +/), //returns args[] where [0] is the first word arfter the command
        command = args.shift(); //returns the command
    console.log(`command: ${command}`)
    console.log(`args: ${args}`)
    console.log(`commandBody: ${commandBody}`)

    if (message.content.startsWith(prefix)) {
        bot(message, args, command)
    }

    //slash(interaction, client)

});
