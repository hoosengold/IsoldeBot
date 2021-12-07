const { Client, Intents, Collection } = require('discord.js')
const utils = require('./utils/utils')

//FIXME tests
//FIXME fix dynamic dynamic requre (__dirname)

/*
Possible Intents:

Intents.FLAGS.GUILD_MEMBERS
Intents.FLAGS.GUILD_PRESENCES 
Intents.FLAGS.GUILDS
Intents.FLAGS.GUILD_BANS 
Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
Intents.FLAGS.GUILD_WEBHOOKS
Intents.FLAGS.GUILD_MESSAGE_REACTIONS

Bitfield (all Intents): 1327
*/

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`)
    process.exit(1)
})

const client = new Client({
    //initialize client for the bot;
    presence: {
        status: 'online',
        activity: {
            name: '*help',
            type: 'PLAYING',
        },
    },
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
})

exports.client = client

const prefix = '*', //prefix for all commands
    automod = require('./moderation/automod.js'),
    fs = require('fs')

const events = require('./commands/quiz/events/event')

client.commands = new Collection() //make new collection for the commands
client.cooldowns = new Collection() //make new collection for the cooldowns

const commandFolders = fs.readdirSync('./commands') //find the command files

//set a new item in the Collection with the key as the command name and the value as the exported module
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js')) //filter the command files
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}

//Login with the bot
require('dotenv').config()
client.login(process.env.DISCORD_TOKEN).catch((err) => console.error(err))

//Print Ready in the console when the bot is ready
client.once('ready', () => {
    //the bot is ready
    console.log(`Ready!`)
})

//listen for joining users
client.on('guildMemberAdd', (member) => {
    console.log(`New member detected.`)
    const channel = member.guild.channels.cache.find((ch) => ch.name === 'welcome' || ch.name === 'welcome-and-rules' || ch.name === 'welcome-and-goodbye')
    if (!channel) {
        channel = member.guild.channels.cache.find((ch) => ch.name === 'general')
        if (!channel) {
            return
        }
    }
    if (channel.isText) {
        channel.send(`Welcome, ${member.toString()}! Don't forget to claim your welcome \`*hug\`! :purple_heart:`)
    }
})

/*client.on('clickButton', async function (button) {
    console.log(`clickButton event triggered`)
    events.execute(button)
})*/

client.on('interactionCreate', (interaction) => {
    if (interaction.isButton()) {
        events.execute(interaction)
    } else if (interaction.isCommand()) {
        return
    } else {
        console.log(`No button/command detected in interaction event, exiting event...`)
        return
    }
})

const db = require('./utils/database/database')
let pool = db.pool

//listen for an error from an idle pool client
pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(0)
})

//listen for messages, main function of the bot
client.on('messageCreate', async function (message) {
    /**
     * @param guildId ID of the guild where the message was sent
     */
    const guildId = message.guild.id
    exports.guildId = guildId

    try {
        //checks if the author of the message is a bot, if it is, then it does not respond
        if (message.author.bot) return

        //initialize regex to detect url's
        const urlRegexMain = new RegExp(
            /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:(?:(\ )*)\.(?:(\ )*)(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:(?:(\ )*)\.(?:(\ )*)(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?/gim
        ) //Subst: /^(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/gmi
        const urlRegexAlphanumeric = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?([\w\d\-]+\.)+\w{2,}(\/.+)?/gim)
        const urlRegexIPv4 = new RegExp(
            /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2}))\.){3}(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2})))/gim
        )
        const urlRegexIPv6 = new RegExp(/(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(([\da-fA-F]{4}:){1,7}[\da-fA-F]{4})/gim) //Subst: /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?(([\da-fA-F]{0,4}:){1,7}[\da-fA-F]{0,4})/

        //regex for discord invite links
        const inviteRegex = new RegExp(
            /(?:(?:(?:https|ftp|http|mailto|file|data|irc?):)?\/\/)?((?:discord(?:(\ )*(\/)*(\ )*)*?(\.)*(\ )*gg(\ )*)(\/)*(\ )*)|(discordapp(?:(\ )*(\/)*(\ )*)*?(\.)*(\ )*com)/gim
        )

        //get the ID of the member, that sent the message
        //TODO can be global variable = enforce the same variable/style in every style + optimisation?
        const memberId = message.member.id

        //check for discord invite links
        if (message.content.match(inviteRegex)) {
            if (utils.isAdmin(memberId)) {
                console.log(`Invite link not deleted: posted by admin`)
                return
            } else {
                await message.delete().catch(console.error())
                console.log(`Discord invite link deleted`)
                await message.channel.send(`**No Discord Invite links allowed!**`)
                return
            }
        }
        //check for shortened links
        else if (
            message.content.includes('bit.ly' || 'goo.gl' || 'buff.ly' || 'j.mp' || 'mz.cm' || 'fb.me' || 'tinyurl.' || 't.co' || 'rebrand.ly' || 'b.link')
        ) {
            await message.delete().catch(console.error())
            console.log(`Shortened link deleted.`)
            await message.channel.send({
                content: `${message.author}**No shortened links allowed!**`,
            })
        }
        //check for non discord invite links and not shortened links
        else if (
            message.content.match(urlRegexMain) ||
            message.content.match(urlRegexAlphanumeric) ||
            message.content.match(urlRegexIPv4) ||
            message.content.match(urlRegexIPv6)
        ) {
            //url = message.content.match()
            /*console.log(
				message.content.match(urlRegexMain) ||
					message.content.match(urlRegexAlphanumeric) ||
					message.content.match(urlRegexIPv4) ||
					message.content.match(urlRegexIPv6)
			)*/

            //initialize a variable to store the possible url and remove all blank spaces
            const url = (
                message.content.match(urlRegexMain) ||
                message.content.match(urlRegexAlphanumeric) ||
                message.content.match(urlRegexIPv4) ||
                message.content.match(urlRegexIPv6)
            )
                .toString()
                .replace(/\s/g, '')
            console.log(`url: ${url}. Redirecting for automod...`)
            await automod(url)
        }

        //checks if the message is a possible command that follows the command syntax
        const messageRegEx = new RegExp(/(\w)+\s*\*\s*(\w)*/gm)
        if (!message.content.startsWith(prefix) || message.content.match(messageRegEx) || message.content == '*') {
            return
        }

        try {
            //takes the message body, removes the prefix *, splits the message body and makes everything lower case
            const args = message.content.slice(prefix.length).split(/ +/), //returns args[] where [0] is the first word after the command
                commandName = args.shift().toLowerCase() //returns the command

            console.log(`command: ${commandName}`)
            console.log(`args: ${args}`)

            const command =
                (await client.commands.get(commandName)) || (await client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)))

            if (!command) return //check is the command exists

            //cooldown for the specific command for the specific user
            const { cooldowns } = client

            //check if the cooldown collection already has a cooldown for the command
            if (!cooldowns.has(command.name)) {
                await cooldowns.set(command.name, new Collection())
            }

            const now = Date.now(),
                timestamps = await cooldowns.get(command.name),
                cooldownAmount = (command.cooldown || 5) * 1000

            //execute the command
            try {
                //get the timestamp and calculate the remaining time if the user already used the command in this session
                if (timestamps.has(message.author.id)) {
                    const expirationDate = (await timestamps.get(message.author.id)) + cooldownAmount
                    if (now < expirationDate) {
                        //checks if there is still cooldown
                        const timeLeft = (expirationDate - now) / 1000
                        setTimeout(() => {
                            message.delete().catch(console.error())
                        }, 1000)
                        return await message
                            .reply({
                                content: `Please wait ${timeLeft.toFixed(1)} seconds before using the ${command.name} command again.`,
                                allowedMentions: { repliedUser: true },
                            })
                            .catch(console.error())
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
                setTimeout(() => {
                    message.delete().catch(console.error())
                }, 1000)
                await message
                    .reply({
                        content: `Something went wrong while trying to execute the command!`,
                        allowedMentions: { repliedUser: true },
                    })
                    .catch(console.error())
            }
        } catch (error) {
            console.log(`PROBLEM WHILE SETTING UP THE COOLDOWN`)
            console.error(error)
        }
    } catch (error) {
        console.log(`PROBLEM WHILE CHECKING URL`)
        console.error(error)
    }
})
