const Discord = require("discord.js"),
    changelogMessage = require("../../bot.js");
//const image = new Discord.MessageAttachment('./images/');

function updates(message) {
    const embed = {
        title: 'The Friend Updates',
        color: '#D4AB29',
        description: '\u200b',
        //thumbnail: 'attachment://',
        fields: [
            {
                name: '**1.** *Everything is prettier now!* :purple_heart: ',
                value: 'All messages are embeded now and all of them have different colors.'
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: "**2.** *Bugs are no more!* :space_invader:",
                value: "Various bug fixes including the infamous \"NOT NOW BOT\" bug (thanks Ultra :grin:)! "
            },
            {
                name: '\u200b',
                value: '\u200b'
            },
            {
                name: 'BUGS!!! (╯°□°）╯︵ ┻━┻',
                value: 'If you encountered a bug or have an idea how to improve The Friend, just @hoosengold and tell him how terrible The Friend is coded. :purple_heart:'
            },
        ],
        footer: {
            text: 'Last Update:???????',
        },
        timestamp: new Date(),
    }
    message.channel.send({ embed: embed })
}
module.exports = updates;