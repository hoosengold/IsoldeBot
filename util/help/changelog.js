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
                {
                    name: '**1.** *Cleaner chats!* :purple_heart: ',
                    value: 'From now on all messages, that call a command, will be deleted in order to keep the chats clean. :grin: \n This will not affect the following commands: \`*addMusic\`, \`*countdown\` and \`*poll\`.'
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
                text: 'Last Update: 25. June 2021',
            },
            timestamp: new Date(),
        }
        message.channel.send({ embed: embed })
        //delete the call message
        message.delete()
        .catch(err => console.error(err))
    }
}