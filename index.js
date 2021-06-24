const Discord = require('discord.js'),
    client = new Discord.Client(), //initialize client for the bot;
    prefix = "*", //prefix for all commands
    config = require('./config.json'), //Login with test bot
    fs = require('fs'),
    //webHookHelper = require('discord-interactions'),
    //{ DiscordInteractions, ApplicationCommandOptionType } = require('slash-commands'),
    //slash = require('./slash_commands/testcommand.js'),
    bot = require('./bot.js');

client.commands = new Discord.Collection(); //make new collection for the commands
const commandFolders = fs.readdirSync('./util') //find and filter the command files

//set a new item in the Collection with the key as the command name and the value as the exported module
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./util/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./util/${folder}/${file}`);
        client.commands.set(command.name, command)
    }
}


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
    const args = message.content.slice(prefix.length).split(/ +/), //returns args[] where [0] is the first word arfter the command
        commandName = args.shift().toLowerCase(); //returns the command

    console.log(`command: ${commandName}`)
    console.log(`args: ${args}`)

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return; //check is the command exists

    try {
        command.execute(message, args)
    } catch (error) {
        console.log(error)
        message.reply(`Something went wrong while trying to execute the command!`)
    }

    //slash(interaction, client)

});
