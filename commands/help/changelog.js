const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'updates',
    description: 'Returns an embed message with the most recent changes to the bot.',
    aliases: ['changes', 'changelog', 'update'],
    cooldown: 5,
    permissions: 'everyone',
    syntax: 'updates',
    args: false,
    execute(message, args, utilObject) {
        const fs = require('fs')
        const embed = new MessageEmbed()
            .setTitle('IsoldeBot Updates')
            .setColor('RANDOM')
            .setDescription('\u200b')
            //thumbnail: 'attachment://',
            .addFields([
                {
                    name: '1. The Countdown command now supports minutes input and output for 4 different timezones! :clock1:',
                    value: `Example:\nInput:\`${utilObject.getPrefix()}countdown 1 27 I also support custom messages!\`\nOutput: \`\`\`The Countdown will end after 1 hour and 27 minutes on:\n  Tue Dec 28 2021 21:30:00 GMT\n  Tue Dec 28 2021 4:30:00 PM EST\n  Tue Dec 28 2021 22:30:00 CET\n  Tue Dec 28 2021 6:30:00 JST\`\`\``,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: '**2. Guild settings customization is finally here! :partying_face:** ',
                    value: `Now every server owner can choose a custom prefix for IsoldeBot! They can also choose to have a notification channel for IsoldeBot. This feature gets activated as soon as IsoldeBot joins a guild! The \`${utilObject.getPrefix()}setup\` command is there "just in case" :grin:\n*More customization options are on the way! :purple_heart:*`,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: '*3. New commands*',
                    value: `\`${utilObject.getPrefix()}setup\`\n\`${utilObject.getPrefix()}invite\`\n\`${utilObject.getPrefix()}permissions\`\n\nUse \`${utilObject.getPrefix()}help\` for more info! :grin:`,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: '*4. Various performance and stability fixes.*',
                    value: "This is just the *boring* part of the changelog where I say that the bot is **2000%** faster and that **ALL** bug are __fixed__. Yeah... Um, it's totally true. :clown:",
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: 'BUGS!!! (╯°□°）╯︵ ┻━┻',
                    value: 'If you encountered a bug or have an idea how to improve IsoldeBot, just open an [issue](https://github.com/hoosengold/IsoldeBot/issues) on Github and help us improve. :purple_heart:',
                },
            ])
            .setFooter(`Last updated: ` + fs.statSync(__filename).mtime.toUTCString())
            .setTimestamp(new Date())

        const embedNY = new MessageEmbed()
            .setTitle('**IsoldeBot wishes you Happy New Year!**')
            .setDescription(
                '*May this year bring new happiness, new goals, new achievements, and a lot of new inspirations on your life! Wishing you a year fully loaded with happiness!*  :heart:'
            )
            .setColor(embed.color)
        message.channel.send({ embeds: [embedNY, embed] })
        //delete the call message
        message.delete().catch((err) => console.error(err))
    },
}
