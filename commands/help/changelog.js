module.exports = {
    name: 'updates',
    description: 'Returns an embed message with the most recent changes to the bot.',
    aliases: ['changes', 'changelog', 'update'],
    cooldown: 5,
    permissions: 'everyone',
    syntax: '*updates',
    args: false,
    execute(message) {
        const Discord = require('discord.js')
        const fs = require('fs')

        //const image = new Discord.MessageAttachment('./images/');

        const embed = {
            title: 'The Friend Updates',
            color: 'RANDOM',
            description: '\u200b',
            //thumbnail: 'attachment://',
            fields: [
                {
                    name: '**countdown command now supports 4 different time zones and minute inout support** ',
                    value: 'test',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: '**4.** *Various performance and stability fixes.*',
                    value: "This is just the *boring* part of the changelog where I say that the bot is **2000%** faster and that **ALL** bug are __fixed__. Yeah... Um, it's totally true. :clown:",
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: 'BUGS!!! (╯°□°）╯︵ ┻━┻',
                    value: 'If you encountered a bug or have an idea how to improve The Friend, just open an [issue](https://github.com/hoosengold/IsoldeBot/issues) on Github and help us improve. :purple_heart:',
                },
            ],
            footer: {
                text: `Last updated: ` + fs.statSync('commands/help/help.js').mtime.toUTCString(),
            },
            timestamp: new Date(),
        }
        message.channel.send({ embeds: [embed] })
        //delete the call message
        message.delete().catch((err) => console.error(err))
    },
}
