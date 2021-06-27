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
                    name: '**1.** *Everything is prettier now!* :purple_heart: ',
                    value: 'All messages are embeded now and all of them have random colors!'
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: "**2.** *Bugs are no more!* :space_invader:",
                    value: "Various bug fixes including the infamous \"NOT NOW BOT\" bug (thanks Ultra :grin:)! \n The Friend is a lot faster now thanks to performance improvements (60 FPS! Only on FriendStation! :scream_cat:). Added spam protection. Now a command can be sent only once every 5 seconds (But who will stop The Friend from spamming?! :grimacing:)."
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '**3.** Tired of the bad command names? Aliases to the rescue! :superhero:',
                    value: 'Now you can see all commands and their aliases! Just type \`*commands\`! The names will continue to be bad but at least now there are (less) bad alternatives. :yum:'
                },
                {
                    name: '\u200b',
                    value: '\u200b'
                },
                {
                    name: '**4.**Do you need a hug? Anyway, have one! Or two! Or all the hugs! :hugging:',
                    value: 'New Members will be greeted with a message. They can receive a \`*hug\` or maybe two. :smile: *"But I\'m not a new member, how do I get a hug? :pleading_face:".* Hugs are for everyone! You can also @someone and send them a hug! Hugs know no borders! :purple_heart:'
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
    }
}