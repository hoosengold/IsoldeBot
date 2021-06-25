const Discord = require('discord.js'),
    client = new Discord.Client(), //initialize client for the bot;
    prefix = "*", //prefix for all commands
    config = require('./config.json'), //Login with test bot
    fs = require('fs');
//webHookHelper = require('discord-interactions'),
//{ DiscordInteractions, ApplicationCommandOptionType } = require('slash-commands'),
//slash = require('./slash_commands/testcommand.js');


client.commands = new Discord.Collection(); //make new collection for the commands
client.cooldowns = new Discord.Collection(); //make new collection for the cooldowns

const commandFolders = fs.readdirSync('./util') //find the command files

//set a new item in the Collection with the key as the command name and the value as the exported module
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./util/${folder}`).filter(file => file.endsWith('.js')) //filter the command files
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

    //cooldown for the specific command for the specific user
    const { cooldowns } = client

    //check if the cooldown collection already has a cooldown for the command
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now(),
        timestamps = cooldowns.get(command.name),
        cooldownAmount = (command.cooldown || 5) * 1000;

    //execute the command
    try {
        //get the timestamp and calculate the remaining time if the user already used the command in this session
        if (timestamps.has(message.author.id)) {
            const expirationDate = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationDate) { //checks if there is still cooldown
                const timeLeft = (expirationDate - now) / 1000
                return message.reply(`Please wait ${timeLeft.toFixed(1)} second(s) before using the ${command.name} command again.`)
            }
        }

        //clear the entry on the collection after the cooldown
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

        command.execute(message, args)
    } catch (error) {
        console.log(error)
        message.reply(`Something went wrong while trying to execute the command!`)
    }


    //slash(interaction, client)

});
