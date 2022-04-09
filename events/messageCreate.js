const index = require('../index'),
    { Collection, Message } = require('discord.js'),
    { Util } = require('../typescript/dist/typescript/src/Util'),
    { UrlHandler } = require('../typescript/dist/typescript/src/UrlHandler')

const client = index.client

client.cooldowns = new Collection() //make new collection for the cooldowns

module.exports = {
    name: 'messageCreate',
    once: false,
    /**
     *
     * @param {Message} message
     */
    async execute(message) {
        let utilObject = new Util(message.member.id, message.guild.id, index.client)
        let prefix
        //prefix for the commands for the specific guild
        if (index.prefixes.has(utilObject.getGuildId())) {
            prefix = index.prefixes.get(utilObject.getGuildId())
        } else {
            prefix = '*'
        }

        utilObject.setPrefix(prefix)

        //checks if the author of the message is a bot, if it is, then it does not respond
        if (message.author.bot) return

        if (await matchUrl(message, utilObject)) {
            return message.delete()
        }

        //checks if the message is a possible command that follows the command syntax
        const messageRegEx = new RegExp(/(\w)+\s*\*\s*(\w)*/gm)
        if (!message.content.startsWith(prefix) || message.content.match(messageRegEx) || message.content == prefix) {
            return
        }
        //takes the message body, removes the prefix *, splits the message body and makes everything lower case
        const args = message.content.slice(prefix.length).split(/ +/), //returns args[] where [0] is the first word after the command
            commandName = args.shift().toLowerCase() //returns the command

        const command = (await client.commands.get(commandName)) || (await client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName)))

        if (!command) return //check is the command exists

        console.log(`command: ${commandName}`)
        console.log(`args: ${args}`)

        //cooldown for the specific command for the specific user
        const { cooldowns } = client

        //check if the cooldown collection already has a cooldown for the command
        if (!cooldowns.has(command.name)) {
            await cooldowns.set(command.name, new Collection())
        }

        const now = Date.now(),
            timestamps = await cooldowns.get(command.name),
            cooldownAmount = (command.cooldown || 5) * 1000

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
        try {
            await command.execute(message, args, utilObject)
        } catch (error) {
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
    },
}

//TODO move to ts object class

/**
 * Checks if the message contains a link. If the link is a discord invite, that is not posted by a moderator, a shortened link or a possibly
 * malicious link, the function returns `true`
 * @async
 * @param {Message} message
 * @param {Util} utilObject
 * @returns {boolean}
 */

async function matchUrl(message, utilObject) {
    const urlHandler = new UrlHandler(message)
    if (urlHandler.checkInvite() && !utilObject.isAdmin()) {
        //TODO add the returned/matched invite link in a blacklist
        console.log(`Discord invite link deleted`)
        message.channel.send(`**Only moderators can post Discord invite links!**`)
        return true
    }

    await urlHandler.checkShortenedUrl().then((res) => {
        if (res) {
            console.log(`Shortened link deleted.`)
            message.channel.send(`**No shortened links allowed!**`)
            return true
        }
    })

    //FIXME too many false positives
    /*await urlHandler.checkUrl().then((matchArray) => {
        matchArray.forEach((innerMatchArray) => {
            if (innerMatchArray) {
                innerMatchArray.forEach((element) => {
                    console.log(element)
                    let urlString = element.toString().replace(/\s+/g, '')
                    urlString = element.toString().replace(/,/g, '')
                    console.log(`Test passed! Possible url: ${urlString}`)
                })
            }
        })
    })*/

    return false
}
