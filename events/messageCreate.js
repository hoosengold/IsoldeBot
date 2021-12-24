const index = require('../index'),
    url = require('../utils/regexURL'),
    { Collection, Message } = require('discord.js'),
    { Util } = require('../typescript/dist/Util')

const client = index.client

const prefix = '*' //prefix for all commands
client.cooldowns = new Collection() //make new collection for the cooldowns

module.exports = {
    name: 'messageCreate',
    once: false,
    /**
     *
     * @param {Message} message
     * @returns
     */
    async execute(message) {
        let utilObject = new Util(message.member.id, message.guild.id, index.client)

        try {
            //checks if the author of the message is a bot, if it is, then it does not respond
            if (message.author.bot) return

            if (await matchUrl(message, utilObject)) {
                return message.delete()
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
                    await command.execute(message, args, utilObject)
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

/**
 * Checks if the message contains a link. If the link is a discord invite, that is not posted by a moderator, a shortened link or a possibly
 * malicious link, the function returns `true`
 * @async
 * @param {Message} message
 * @param {Util} utilObject
 * @returns {boolean}
 */

async function matchUrl(message, utilObject) {
    if (checkInvite(message, utilObject)) {
        console.log(`Discord invite link deleted`)
        message.channel.send(`**Only moderators can post Discord invite links!**`)
        return true
    }

    if (checkShort(message)) {
        console.log(`Shortened link deleted.`)
        message.channel.send(`**No shortened links allowed!**`)
        return true
    }

    if (await checkUrl(message)) {
        console.log(`Possibly malicious link detected and deleted.`)
        return true
    }

    return false
}

/**
 *
 * @description Checks if the message with the invite link has to be deleted
 * @param {Message} message Message object
 * @returns `true` when the message has to be deleted
 */
function checkInvite(message, utilObject) {
    if (message.content.match(url.invite)) {
        if (utilObject.isAdmin()) {
            console.log('Invite link posted by an admin')
            return false
        } else {
            return true
        }
    } else {
        return false
    }
}

/**
 *
 * @param {Message} message Message object
 */
function checkShort(message) {
    if (message.content.includes('bit.ly' || 'goo.gl' || 'buff.ly' || 'j.mp' || 'mz.cm' || 'fb.me' || 'tinyurl.' || 't.co' || 'rebrand.ly' || 'b.link')) {
        return true
    } else {
        return false
    }
}

/**
 *
 * @param {Message} message Message object
 */
//TODO implement url checking
async function checkUrl(message) {
    let urlString =
        message.content.match(url.main) || message.content.match(url.alphanumeric) || message.content.match(url.iPv4) || message.content.match(url.iPv6)

    if (urlString) {
        //remove all blank spaces
        urlString = urlString.toString().replace(/ /g, '')
        urlString = urlString.toString().replace(/,/g, '')
        console.log(`Test passed! url: ${urlString}`)
        return false
    }
}
