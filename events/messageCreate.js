const index = require('../index'),
    matchUrl = require('../utils/matchURL'),
    { Collection, Message } = require('discord.js')

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

            if (matchUrl(message)) {
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
