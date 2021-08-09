module.exports = {
    name: 'updates',
    description: 'Provide a changelog for the most recent changes.',
    aliases: ['changes', 'changelog', 'update'],
    cooldown: 5,
    args: false,
    execute(message) {
        const Discord = require("discord.js");

        //const image = new Discord.MessageAttachment('./images/');

        const embed = {
            title: 'The Friend Updates',
            color: 'RANDOM',
            description: '\u200b',
            //thumbnail: 'attachment://',
            fields: [
                /*{
                    name: '**1.** *Cleaner chats!* :purple_heart: ',
                    value: 'From now on all messages, that call a command, will be deleted in order to keep the chats clean. :grin: \n This does not affect the following commands: \`*addMusic\`, \`*countdown\` and \`*poll\`.'
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },*/
                {
                    name: '**1.** *Quizzes are here!* :question: ',
                    value: ``
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '**2.** ',
                    value: ``
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
                text: ``,
            },
            timestamp: new Date(),
        }
        message.channel.send({ embeds: [embed] })
        //delete the call message
        message.delete()
            .catch(err => console.error(err))
    }
}