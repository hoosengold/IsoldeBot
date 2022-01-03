const { Message, MessageEmbed } = require('discord.js'),
    path = require('path'),
    { Util } = require(path.join(__dirname, '../../typescript/dist/typescript/src/Util'))

module.exports = {
    name: 'invite', //name of the command
    description: 'Invite IsoldeBot in your server', //short description of the command
    aliases: ['inviteme'], //aliases for the command
    cooldown: 2, //cooldown for the command in seconds, the default cooldown is 5 seconds
    permissions: 'everyone', //permissions needed to use the command
    syntax: 'invite', //syntax of the command
    args: false, //does the command have arguments, type false if it doesn't and remove args in execute
    /**
     *
     * @param {Message} message
     * @param {string[]} args
     * @param {Util} utilObject
     */
    execute(message, args, utilObject) {
        let embed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle('Invite IsoldeBot in your server')
            .setTimestamp(new Date())
            .addField('Thank you!', `You can invite me in your server by clicking on "Add to Server" in my profile! :purple_heart:`)

        message.channel.send({
            embeds: [embed],
        })
        message.delete()
    },
}
