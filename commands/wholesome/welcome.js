module.exports = {
    name: 'hug',
    description: `If no parameters are passed, it returns a "hug" to the user that sent the message\;
  If 1 or more tagged members are passed, it returns a "hug" to the tagged members.`,
    aliases: ['huggies', 'welcome'],
    cooldown: 2,
    permissions: 'everyone',
    syntax: '*hug <guild_member?>',
    args: true,
    execute(message, args, utilObject) {
        const Discord = require('discord.js')

        if (args[0] == null) {
            message
                .reply({
                    content: `Brace yourself. A biiiiig hug is coming! :orange_heart:`,
                    allowedMentions: { repliedUser: true },
                })
                .catch(console.error())
            setTimeout(() => {
                message.delete().catch((err) => console.error(err))
            }, 1500)
        } else {
            message.channel.send(`${args} Biiiiig hugs from ${message.author} incoming! :yellow_heart:`)
            //delete the call message
            message.delete().catch((err) => console.error(err))
        }
    },
}
