const Discord = require("discord.js");
const helpMessage = require('../../bot.js');
const images = new Discord.MessageAttachment('./images/git_profile-pic.png');

function help(message) {
    const helpEmbed = {
        color: '#AE3FA1',
        title: 'Help Menu',
        author: {
            name: 'hoosengold',
            icon_url: 'attachment://git_profile-pic.png',
            url: 'https://github.com/hoosengold/ai_furnee-discord-bot'
        },
        description: 'A comprehensive list with all commands and how to use them.',
        fields: [
            {
                name: '** \u2217poll** \`{question} [option1] [option2]\`',
                value: 'Example: \n \`*poll {Do you like the polls?} [Yes] [Of course!] [Best polls ever!]\` \n *Note:* Each poll can have **up to 20 options**.',
                
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: '** \u2217countdown** \`hours\`',
                value: 'Example: \`\*countdown 6\` \n Adds 6 hours to the countdown timer. \n *Note:* At least 1 hour has to be added, no upper limit (but be reasonable). Sends a message when 1 hour/30 minutes is left and when no time is left.'
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: '** \u2217addMusic \`youtube_link\`**',
                value: 'Example: \`\*addMusic https://www.youtube.com/...\` \n or \n \u2003  \u2003  \u2003 \`\*addMusic www.youtube.com/...\` \n Adds the song suggestion to a pool with other songs.'
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: '** \u2217getMusic**',
                value: 'Returns a random song from the already suggested songs.',
                inline: true
            },
            {
                name: '** \u2217updates** ',
                value: 'Returns a list with the most recent changes to the bot.',
                inline: true
            },
            {
                name: '** \u2217story**',
                value: 'Returns the lore behind The Friend.',
                inline: true
            },
        ],
        //thumbnail: {
            //url: '',
        //},
        timestamp: new Date(),
        footer: {
            text: 'Last update:????????'
        }
    }

    message.channel.send({ embed: helpEmbed, files: [images] })
}

module.exports = help;