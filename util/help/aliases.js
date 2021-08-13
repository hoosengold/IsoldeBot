const Discord = require('discord.js'),
    countdownTimer = require('../countdown/countdownTimer.js'),
    poll = require('../poll/poll.js'),
    welcome = require('../wholesome/welcome.js'),
    help = require('./help.js'),
    lore = require('./lore.js'),
    changelog = require('./changelog.js'),
    reportbug = require('./reportbug'),
    say = require('../funny/say.js'),
    fs = require('fs');


module.exports = {
    name: 'aliases',
    description: 'Returns a lis with all commands  and their aliases.',
    aliases: ['commands', 'cmd', 'allcommands', 'all'],
    cooldown: 5,
    args: false,
    execute(message) {
        const aliases = require('./aliases.js')
        const embed = {
            color: 'RANDOM',
            title: 'Command Aliases',
            description: 'A comprehensive list with all commands and their aliases. Type \`*help\` for more info about the commands. :grin:',
            fields: [
                {
                    name: '\`*countdown\`',
                    value: `Aliases: ${countdownTimer.aliases}`,
                },
                {
                    name: '\`*poll\`',
                    value: `Aliases: ${poll.aliases}`,
                },
                {
                    name: '\`*help\`',
                    value: `Aliases: ${help.aliases}`,
                },
                {
                    name: '\`*story\`',
                    value: `Aliases: ${lore.aliases}`,
                },
                {
                    name: '\`*updates\`',
                    value: `Aliases: ${changelog.aliases}`,
                },
                {
                    name: '\`*aliases\`',
                    value: `Aliases: ${aliases.aliases}`,
                },
                {
                    name: '\`*hug\`',
                    value: `Aliases: ${welcome.aliases}`,
                },
                {
                    name: '\`*bug\`',
                    value: `Aliases: ${reportbug.aliases}`
                },
                {
                    name: '\`*say\`',
                    value: `Aliases: ${say.aliases}`
                }
            ],
            footer: {
                text: `*Note*: \'undefined\' = no aliases \n` + `Last updated: ` + fs.statSync('util/help/help.js').mtime.toUTCString()
            },
            timestamp: new Date()
        }

        message.channel.send({ embeds: [embed] })
        //delete the call message
        message.delete()
            .catch(err => console.error(err))
    }
}