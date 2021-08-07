module.exports = {
    name: 'hug',
    description: 'Returns a wholesome message with a hug.',
    aliases: ['huggies', 'welcome'],
    cooldown: 2,
    args: true,
    execute(message, args) {
        const Discord = require('discord.js')

        if (args[0] == null) {
            message.reply(`Brace yourself. A biiiiig hug is coming! :orange_heart:`)
            message.delete()
                .catch(err => console.error(err))
        } else {
            message.channel.send(`${args} Someone is sending you biiiig hugs! :yellow_heart:`)
            //delete the call message
            message.delete()
                .catch(err => console.error(err))
        }
    }
}