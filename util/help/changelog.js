module.exports = {
    name: 'updates',
    description: 'Provide a changelog for the most recent changes.',
    aliases: ['changes', 'changelog', 'update'],
    cooldown: 5,
    args: false,
    execute(message) {
        const Discord = require("discord.js");
        const fs = require('fs')

        //const image = new Discord.MessageAttachment('./images/');

        const embed = {
            title: 'The Friend Updates',
            color: 'RANDOM',
            description: '\u200b',
            //thumbnail: 'attachment://',
            fields: [
                {
                    name: '**1.** Quizzes are here! :question: ',
                    value: `dada`
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '**2.** Removed all music related commands.',
                    value: `The Friend does not support the \`*addMusic\` and \`*getMusic\` commands. Instead you can use the neat \*Rythm\* bot! :grin:`
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '**3.** *Various performance and stability fixes.*',
                    value: 'This is just the *boring* part of the changelog where I say that the bot is **2000%** faster and that **ALL** bug are __fixed__. Yeah... Um, it\'s totally true. :clown:'
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: 'BUGS!!! (╯°□°）╯︵ ┻━┻',
                    value: 'If you encountered a bug or have an idea how to improve The Friend, just @hoosengold (or open an [issue](https://github.com/hoosengold/IsoldeBot/issues) on Github) and tell him how terrible The Friend is coded. :purple_heart:'
                },
            ],
            footer: {
                text: `Last updated: ` + fs.statSync('util/help/help.js').mtime.toUTCString(),
            },
            timestamp: new Date(),
        }
        message.channel.send({ embeds: [embed] })
        //delete the call message
        message.delete()
            .catch(err => console.error(err))
    }
}