module.exports = {
    name: 'help',
    description: 'Provide help menu with all available commands',
    aliases: ['helpmenu', 'menu'],
    cooldown: 5,
    args: false,
    execute(message) {
        const Discord = require("discord.js");
        const profilePic = new Discord.MessageAttachment('./images/git_profile-pic.png');

        const helpEmbed = {
            color: '#007F7E',
            title: 'Help Menu',
            author: {
                name: 'hoosengold',
                icon_url: 'attachment://git_profile-pic.png',
                //url: 'https://github.com/hoosengold/ai_furnee-discord-bot'
            },
            description: 'A comprehensive list with all commands and how to use them.',
            fields: [
                {
                    name: '** \*poll** \`{question} [option1] [option2]\`',
                    value: 'Example: \n \`*poll {Do you like the polls?} [Yes] [Of course!] [Best polls ever!]\` \n *Note:* Each poll can have **up to 20 options**.',

                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '** \*countdown** \`hours\`',
                    value: 'Example: \`\*countdown 6\` \n Adds 6 hours to the countdown timer. \n *Note:* At least 1 hour has to be added, no upper limit (but be reasonable). Sends a message when 1 hour/30 minutes is left and when no time is left.'
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '** \*addMusic \`youtube_link\`**',
                    value: 'Example: \`\*addMusic https://www.youtube.com/...\` \n Also: \u2003 \`\*addMusic www.youtube.com/...\` \n Adds the song suggestion to a pool with other songs. \n *Note:* Only YouTube links are allowed.'
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '** \*getMusic**',
                    value: 'Returns a random song from the already suggested songs.',
                    inline: true
                },
                {
                    name: '** \*updates** ',
                    value: 'Returns a list with the most recent changes to the bot.',
                    inline: true
                },
                {
                    name: '** \*story**',
                    value: 'Returns the lore behind The Friend.',
                    inline: true
                },
                {
                    name: '** \*commands**',
                    value: 'Returns a list with commands and their aliases.',
                    inline: true
                },
                {
                    name: '** \*hug**',
                    value: 'Returns a hug.',
                    inline:true
                },
            ],
            //thumbnail: {
            //url: '',
            //},
            timestamp: new Date(),
            footer: {
                text: 'Last Update:????????'
            }
        }

        message.channel.send({ embed: helpEmbed, files: [profilePic] })
    }
}