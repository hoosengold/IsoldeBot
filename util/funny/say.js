module.exports = {
    name: 'say', //name of the command
    description: 'Make the bot say something.', //short description of the command
    aliases: ['repeat'], //aliases for the command
    cooldown: 2, //cooldown for the command in seconds, the default cooldown is 5 seconds
    args: true, //does the command have arguments, type false if it doesn't and remove args in execute
    execute(message, args) {
        const Discord = require('discord.js');

        if (args[0] == null) {
            return message.channel.send(`There is nothing to repeat. :stuck_out_tongue:`)
        }

        var messageContent = '';
        for (let i = 0; i < args.length; i++) {
            var tmp = args[i]
            if (i == 0) {
                messageContent = tmp;
            } else {
                messageContent = messageContent + ' ' + tmp;
            }
        }
        const embed = {
            color: 'RANDOM',
            fields: [
                {
                    name: `${message.author.username} made me say:`,
                    value: `*${messageContent}*`
                }
            ]
        }
        message.channel.send({ embed: embed })
    }
}