const Discord = require('discord.js');
const client = new Discord.Client({ //initialize client for the bot;
    presence: {
        status: 'online',
        activity: {
            name: '*help',
            type: 'PLAYING'
        }
    }
});

const prefix = "*", //prefix for all commands
    automod = require('./moderation/automod.js'),
    fs = require('fs');

const disbut = require("discord-buttons");
disbut(client);

const events = require('./util/quiz/events/event')

//initializeInteractions = require('./slash_commands/initial'),
//slash = require('./slash_commands/testcommand.js');
//webHookHelper = require('discord-interactions'),
//{ DiscordInteractions, ApplicationCommandOptionType } = require('slash-commands'),

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


//Login with the bot
require('dotenv').config();
client.login(process.env.DISCORD_TOKEN);

//initialize interactions
//initializeInteractions()

//Print Ready in the console when the bot is ready
client.once("ready", () => {
    //the bot is ready
    console.log(`Ready!`)
})

//listen for joining users
client.on("guildMemberAdd", (member) => {
    console.log(`New member detected.`)
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general')
    if (!channel) return;
    channel.send(`Welcome to the Stream Fam, ${member}! Don't forget to claim your welcome \`*hug\`! :purple_heart:`)
})

client.on('clickButton', async function (button) {
    console.log(`clickButton event triggered`)
    await button.reply.defer('Answer submitted')

    events.execute(button)
})


const db = require('./connections/database')
let pool = db.pool

//listen for an error from an idle pool client
pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(0)
})

//listen for messages, main function of the bot
client.on('message', async function (message) {
    try {
        //checks if the author of the message is a bot, if it is, then it does not respond
        if (message.author.bot) return;

        //initialize regex to detect url's
        const urlRegexMain = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:(?:(\ )*)\.(?:(\ )*)(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:(?:(\ )*)\.(?:(\ )*)(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?/gmi); //Subst: /^(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/gmi
        const urlRegexAlphanumeric = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?/gmi);
        const urlRegexIPv4 = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2}))\.){3}(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2})))/img);
        const urlRegexIPv6 = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(([\da-fA-F]{0,4}:){1,7}[\da-fA-F]{0,4})/);

        //ban discord invite links
        const inviteRegex = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?((?:discord(?:(\ )*(\/)*(\ )*)*?(\.)*(\ )*gg(\ )*)(\/)*(\ )*)|(discordapp(?:(\ )*(\/)*(\ )*)*?(\.)*(\ )*com)/gmi)

        //check for discord invite links
        if (message.content.match(inviteRegex)) {
            if (roles.isAdmin()) {
                console.log(`Invite link not deleted: posted by admin`)
                return;
            } else {
                await message.delete()
                console.log(`Discord invite link deleted`)
                await message.reply(`**No Discord Invite links allowed!**`)
                return;
            }
        }
        //check for shortened links
        else if (message.content.includes('bit.ly' || 'goo.gl' || 'buff.ly' || 'j.mp' || 'mz.cm' || 'fb.me' || 'tinyurl.' || 't.co' || 'rebrand.ly' || 'b.link')) {
            await message.delete()
            console.log(`Shortened link deleted.`)
            await message.reply(`**No shortened links allowed!**`)
        }
        //check for non discord invite links and not hidden links
        else if (message.content.match(urlRegexMain) || message.content.match(urlRegexAlphanumeric) || message.content.match(urlRegexIPv4) || message.content.match(urlRegexIPv6)) {
            //url = message.content.match()
            console.log(message.content.match(urlRegexMain) || message.content.match(urlRegexAlphanumeric) || message.content.match(urlRegexIPv4) || message.content.match(urlRegexIPv6))
            //initialize a variable to store the possible url and remove all blank spaces
            const url = (message.content.match(urlRegexMain) || message.content.match(urlRegexAlphanumeric) || message.content.match(urlRegexIPv4) || message.content.match(urlRegexIPv6)).toString().replace(/\s/g, '')
            console.log(`url: ${url}`)
            await automod(url)
            console.log(`URL detected! Redirecting for automod...`)
        }

        //check for youtube links
        if (message.content.includes('youtube.com/' || 'youtu.be/') && !message.content.startsWith(prefix)) {
            await message.reply(`You can also use \`*addMusic\` to suggest music to others. The link is kept secure and it won't be lost among the other messages. And a lucky Stream Fam can get a chance to listen to your suggestion when they type \`*getMusic\` :purple_heart:`)
        }

        if (!message.content.startsWith(prefix) || message.content.endsWith(prefix)) return; //checks if the message starts or ends with *

        try {
            //takes the message body, removes the prefix *, splits the message body and makes everything lower case
            const args = message.content.slice(prefix.length).split(/ +/), //returns args[] where [0] is the first word after the command
                commandName = args.shift().toLowerCase(); //returns the command

            console.log(`command: ${commandName}`)
            console.log(`args: ${args}`)

            const command = await client.commands.get(commandName)
                || await client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return; //check is the command exists

            //cooldown for the specific command for the specific user
            const { cooldowns } = client

            //check if the cooldown collection already has a cooldown for the command
            if (!cooldowns.has(command.name)) {
                await cooldowns.set(command.name, new Discord.Collection())
            }

            const now = Date.now(),
                timestamps = await cooldowns.get(command.name),
                cooldownAmount = (command.cooldown || 5) * 1000;

            //execute the command
            try {
                //get the timestamp and calculate the remaining time if the user already used the command in this session
                if (timestamps.has(message.author.id)) {
                    const expirationDate = await timestamps.get(message.author.id) + cooldownAmount;
                    if (now < expirationDate) { //checks if there is still cooldown
                        const timeLeft = (expirationDate - now) / 1000
                        return await message.reply(`Please wait ${timeLeft.toFixed(1)} second(s) before using the ${command.name} command again.`)
                    }
                }
                //clear the entry on the collection after the cooldown
                await timestamps.set(message.author.id, now)
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
                //execute the command
                await command.execute(message, args)
            } catch (error) {
                console.log(`PROBLEM WHILE EXECUTING THE COMMAND`)
                console.error(error)
                await message.reply(`Something went wrong while trying to execute the command!`)
            }
        } catch (error) {
            console.log(`PROBLEM WHILE SETTING UP THE COOLDOWN`)
            console.error(error)
        }
    } catch (error) {
        console.log(`PROBLEM WHILE CHECKING URL`)
        console.error(error)
    }
});

/**
 * 
 * Additional methods that need the discord client.
 * 
 * @module index
 * @property {function} isAdmin Checks if a member is an admin.
 * @property {function} guild Fetches the ID's of all members in a guild.
 * 
 */

const index = {
    /**
     * 
     * Checks if a member is an admin. 
     * 
     * @function isAdmin()
     * @returns {boolean} `true` if the member is an admin.
     * 
     */
    isAdmin() {
        //initialize guild
        const guild = client.guilds.cache.get(process.env.guild_id)

        //initialize member
        const member = guild.member(client.user) //convert User to GuildMember

        if (member.hasPermission('KICK_MEMBERS')) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 
     * Fetches the ID's of all members in a guild.
     * 
     * @function guild()
     * @property {string[]} listOfUsers String array with the user ID's.
     * @returns {string[]} listOfUsers
     * 
     */
    guild() {

        //initialize guild
        const guild = client.guilds.cache.get(process.env.guild_id) // deploy

        //initialize member
        const member = guild.member(client.user) //convert User to GuildMember

        let totalUsers = 0;
        let listOfUsers = [];
        guild.members.cache.forEach(member => {
            totalUsers++;
            listOfUsers.push(member.id.toString())
        });

        console.log(`Total fetched users: ${totalUsers}`);
        return listOfUsers;
    }
}

module.exports = index