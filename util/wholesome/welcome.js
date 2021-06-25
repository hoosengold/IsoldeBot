module.exports = {
    name: 'hug',
    description: 'Returns a wholesome message with a hug.',
    aliases: ['huggies', 'welcome'],
    cooldown: 2,
    args: true,
    execute(message, args) {
        const Discord = require('discord.js')

        if (args[0] == null) {
            return message.reply(`Brace yourself. A biiiiig hug is coming! :orange_heart:`)
        } else {
            console.log(`tagged: ${args}`)
            message.channel.send(`${args} Someone is sending you biiiig hugs! :yellow_heart:`)
        }
    }
}