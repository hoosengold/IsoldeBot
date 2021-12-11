const index = require('../index'),
    utils = require('../utils/utils'),
    automod = require('../moderation/automod'),
    { Collection } = require('discord.js')

const client = index.client

const prefix = '*' //prefix for all commands
client.cooldowns = new Collection() //make new collection for the cooldowns

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        /**
         *
         * @module ID ID's of the current guild and the current member
         * @property {String} guild ID of the guild, where the message was sent
         * @property {String} member ID of the member, that sent the message
         *
         */
        const ID = {
            guild: message.guild.id,
            member: message.member.id,
        }

        exports.ID = ID

        try {
            //checks if the author of the message is a bot, if it is, then it does not respond
            if (message.author.bot) return

            //TODO put in another file
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

            //check for discord invite links
            //TODO reimplement url checking (remove some returns, think of exploits)
            if (message.content.match(inviteRegex)) {
                if (utils.isAdmin(ID.member)) {
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
                message.content.includes(
                    'bit.ly' || 'goo.gl' || 'buff.ly' || 'j.mp' || 'mz.cm' || 'fb.me' || 'tinyurl.' || 't.co' || 'rebrand.ly' || 'b.link'
                )
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
    },
}
