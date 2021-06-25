module.exports = {
    name: 'aliases',
    description: 'Returns a lis with all commands  and their aliases.',
    aliases: ['commands', 'cmd', 'allcommands', 'all'],
    cooldown: 5,
    args: false,
    execute(message) {
        const Discord = require('discord.js')

        const embed = {
            color: '#AD0000',
            title: 'Command Aliases',
            description: 'A comprehensive list with all commands and their aliases.',
            fields: [
                {
                    name: '\`*countdown\`',
                    value: 'Aliases: \'timer\', \'countdowntimer\', \'timercountdown\'',
                    inline: true
                },
                {
                    name: '\`*poll\`',
                    value: 'Aliases: None',
                    inline: true
                },
                {
                    name: '\`*getMusic\`',
                    value: 'Aliases: \'getmusic\', \'listen\', \'getsuggestion\', \'whattolisten\'',
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '\`*addMusic\`',
                    value: 'Aliases: \'suggestmusic\', \'addmusicsuggestion\', \'addsuggestion\', \'suggest\'',
                    inline: true
                },
                {
                    name: '\`*help\`',
                    value: 'Aliases: \'helpmenu\', \'menu\'',
                    inline: true
                },
                {
                    name: '\`*story\`',
                    value: 'Aliases: \'story\', \'friend\', \'thefriend\', \'origin\', \'originstory\', \'trivia\'',
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '\`*updates\`',
                    value: 'Aliases: \'changes\', \'changelog\', \'update\'',
                    inline: true
                },
                {
                    name: '\`*aliases\`',
                    value: 'Aliases: \'commands\', \'cmd\', \'allcommands\', \'all\'',
                    inline: true
                },
            ],
            footer: {
                text: 'Last Update: ?????????'
            },
            timestamp: new Date()
        }

        message.channel.send({ embed: embed })
    }
}